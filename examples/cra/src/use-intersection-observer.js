import { observeElementInViewport } from 'observe-element-in-viewport';
import { useCallback, useRef, useState } from 'react';
export default function useIntersectionObserver(options) {
    const [isInViewport, setIsInViewport] = useState(null);
    const unobserveFnRef = useRef(() => { }); // tslint:disable-line:no-empty
    if (!options) {
        options = {};
    }
    if (!options.viewport) {
        options.viewport = { current: null };
    }
    const childCallbackRef = useCallback((node) => {
        unobserveFnRef.current();
        if (node) {
            unobserveFnRef.current = observeElementInViewport(node, () => setIsInViewport(true), () => setIsInViewport(false), {
                ...options,
                viewport: options.viewport.current
            });
        }
    }, [options]);
    return [isInViewport, childCallbackRef];
}
//# sourceMappingURL=index.js.map