import { observeElementInViewport } from 'observe-element-in-viewport';
import { useEffect, useState } from 'react';
export default function useIntersectionObserver(options) {
    const [isInViewport, setIsInViewport] = useState(null);
    let { target, viewport, ...restOpts } = options; // tslint:disable-line:prefer-const
    if (!target || typeof target !== 'object' || !('current' in target)) {
        throw new Error(`Expected target to be a ref but received ${target}`);
    }
    if (!viewport) {
        viewport = { current: null };
    }
    useEffect(() => {
        return observeElementInViewport(target.current, () => setIsInViewport(true), () => setIsInViewport(false), {
            ...restOpts,
            viewport: viewport.current
        });
    });
    return isInViewport;
}
//# sourceMappingURL=index.js.map