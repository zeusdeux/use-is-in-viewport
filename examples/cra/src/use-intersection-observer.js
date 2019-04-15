import { observeElementInViewport } from 'observe-element-in-viewport';
import { useEffect, useRef, useState } from 'react';
export default function useIntersectionObserver(options = {}) {
    const target = useRef(null);
    const [isInViewport, setIsInViewport] = useState(null);
    let { viewport, ...restOpts } = options; // tslint:disable-line:prefer-const
    if (!viewport) {
        viewport = { current: null };
    }
    useEffect(() => {
        return observeElementInViewport(target.current, () => setIsInViewport(true), () => setIsInViewport(false), {
            ...restOpts,
            viewport: viewport.current
        });
    });
    return [isInViewport, target];
}
//# sourceMappingURL=index.js.map