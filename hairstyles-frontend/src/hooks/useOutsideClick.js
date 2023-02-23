import { useEffect } from "react";

export default function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (Array.isArray(ref)) {
                let i = 0;
                ref.forEach((refElement) => {
                    if (
                        refElement.current &&
                        !refElement.current.contains(event.target)
                    ) {
                        i++;
                    }
                });
                if (i === ref.length) {
                    callback();
                }
            } else {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}