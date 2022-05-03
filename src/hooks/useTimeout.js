import React from 'react'
function useTimeout(callback, delay) {
    const timeoutRef = React.useRef();
    const callbackRef = React.useRef(callback);
    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    React.useEffect(() => {
        if (typeof delay === 'number') {
            timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
            return () => window.clearTimeout(timeoutRef.current);
        }
    }, [delay]);
    return timeoutRef;
}

export default useTimeout;