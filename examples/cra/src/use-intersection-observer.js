import { observeElementInViewport } from 'observe-element-in-viewport';
import { useCallback, useEffect, useRef, useState } from 'react';
export default function useIntersectionObserver(options) {
    const [isInViewport, setIsInViewport] = useState(null);
    const { target, viewport, ...restOpts } = options;
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const parentCbRef = useCallback(node => {
        parentRef.current = node;
        if (viewport) {
            if (isCallbackRef(viewport)) {
                viewport(node);
            }
            else if (isRefObject(viewport)) {
                viewport.current = node;
            }
        }
    }, [parentRef, viewport]);
    const childCbRef = useCallback(node => {
        childRef.current = node;
        if (isCallbackRef(target)) {
            target(node);
        }
        else if (isRefObject(target)) {
            target.current = node;
        }
    }, [childRef, target]);
    useEffect(() => {
        return observeElementInViewport(childRef.current, () => setIsInViewport(true), () => setIsInViewport(false), {
            ...restOpts,
            viewport: parentRef.current
        });
    }, [childRef, restOpts, parentRef]);
    return [isInViewport, childCbRef, parentCbRef];
}
function isRefObject(x) {
    return typeof x === 'object' && 'current' in x;
}
function isCallbackRef(f) {
    return typeof f === 'function' && typeof f.call === 'function';
}
//# sourceMappingURL=index.js.map
