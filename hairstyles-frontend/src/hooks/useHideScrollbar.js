// components/hooks/useCustomScrollbar.js
import { useEffect } from 'react';

const useCustomScrollbar = (showScrollbar = true) => {
    useEffect(() => {
        const setScrollbarVisibility = () => {
            // Ustaw styl do ukrywania lub pokazywania paska przewijania
            document.body.style.overflow = showScrollbar ? 'auto' : 'hidden';

            // Pamiętaj o przywróceniu paska przewijania po odmontowaniu komponentu
            return () => {
                document.body.style.overflow = 'auto';
            };
        };

        // Wywołaj funkcję ustawiającą widoczność paska przewijania
        const cleanup = setScrollbarVisibility();

        // Pamiętaj o przywróceniu paska przewijania po zamknięciu komponentu
        return () => {
            cleanup();
        };
    }, [showScrollbar]); // Teraz hook będzie uruchamiany przy każdej zmianie showScrollbar

    // Hook nie zwraca żadnych wartości, ale możesz dostosować go według potrzeb
};

export default useCustomScrollbar;
