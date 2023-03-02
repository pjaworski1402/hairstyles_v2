import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Search from '../../../elements/Search/Search';
import filtersIco from "../../../static/icons/filters.svg"

const SearchMobile = ({ isMenuOpen }) => {
    const [showSearch, setShowSearch] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const searchRef = useRef(null)
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY) {
                    setShowSearch(false);
                    searchRef.current.blur()
                } else {
                    setShowSearch(true);
                }

                setLastScrollY(window.scrollY);
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);
    useEffect(() => {
        if (isMenuOpen) {
            setShowSearch(true);
        }
    }, [isMenuOpen])
    return (
        <div className={`searchMobile ${showSearch ? 'show' : "hidden"}`}>
            <Search searchRef={searchRef} showSearch={showSearch} />
            <button onClick={() => setIsFiltersOpen(true)} className="filtersButton">
                <Image src={filtersIco} width={16} height={16} alt="filters" />
            </button>
        </div>
    );
}

export default SearchMobile;