import React, { useContext, useEffect, useState } from 'react';
import { Container } from './Filters.styled';
import closeIco from "../../static/icons/close.svg"
import Image from 'next/image';
import Checkbox from '../../elements/Inputs/Checkbox';
import { GlobalContext } from '../../pages/_app';
import MultiRangeSlider from '../../elements/Inputs/MultiRangeSlider';
import filtersIco from "../../static/icons/filters.svg"
import { getStrapiMedia } from '../../lib/media';
import { useRouter } from 'next/router';

const Filters = (props) => {
    const [filters, setFilters] = useState([]);
    const { categories, genders } = useContext(GlobalContext);
    const [priceMin, setPriceMin] = useState(1);
    const [priceMax, setPriceMax] = useState(200);
    const router = useRouter();
    const generateLink = () => {
        let link = "/results?";
        const filtersObject = filters.reduce((acc, filter) => {
            const [key, value] = filter.split("=");
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(value);
            return acc;
        }, {});
        Object.entries(filtersObject).forEach(([key, value], index) => {
            link += `${key}=${JSON.stringify(value)}`;
            if (index !== Object.entries(filtersObject).length - 1) {
                link += "&";
            }
        });
        link += `&price=[${priceMin},${priceMax}]`
        if (router.query.search) {
            link += `&search=${router.query.search}`;
        }
        // link = link.replace(/\"/g, "");
        props.setIsFiltersOpen && props.setIsFiltersOpen(false)
        router.push(link);
    };

    const handleCheckboxChange = name => {
        if (filters.includes(name)) {
            setFilters(filters.filter(e => e !== name))
        } else {
            setFilters([...filters, name])
        }
    }
    const handleClear = () => {
        setFilters([]);
    }

    useEffect(() => {
        // Load Defaults
        const { query } = router;
        // .replace(/\[\"|\"\]/g, '')
        const defaultFilter = []
        Object.entries(query).map(([key, value]) => {
            if (key !== "price" && key !== "search" && key !== "page") {
                value = JSON.parse(value)
                value.forEach((element) => {
                    defaultFilter.push(`${key}=${element}`)
                })
            } else {
                // const defaultPrice = JSON.parse(value);
            }
        });
        setFilters(defaultFilter)
    }, [router]);
    return (<Container>
        <div className='header'>
            <div className='title'>Filters</div>
            <button className='closeButton' onClick={() => props.setIsFiltersOpen(false)}>
                <Image src={closeIco} width={24} height={24} />
            </button>
        </div>
        <button className='clearAll' onClick={handleClear}>Clear all</button>
        <div className='filtersWrapper'>
            <div className='filters'>
                <div className='filterTitle'>Category</div>
                {categories.map((category, i) => (
                    <React.Fragment key={category.attributes.name + i}>
                        <div className='filterSubtitle'>
                            <Image loader={() => getStrapiMedia(category.attributes.icon)} src={getStrapiMedia(category.attributes.icon)} width={24} height={24} />
                            {category.attributes.name}
                        </div>
                        <div className='subFilters'>
                            {category.attributes.types.data.map((type, j) => (
                                type.attributes.name !== "ped" && (
                                    <div className='filter' key={type.attributes.name + j} style={{ marginLeft: "12px" }}>
                                        <Checkbox
                                            checked={filters.includes(`type=${type.attributes.name}`)}
                                            onClick={() => handleCheckboxChange(`type=${type.attributes.name}`)}
                                        >
                                            {type.attributes.name}
                                        </Checkbox>
                                    </div>
                                )
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className='filters'>
                <div className='filterTitle'>Genders</div>
                <div className='subFilters'>
                    {genders.map((gender, i) => (
                        <div className='filter' key={gender.attributes.name + i}>
                            <Checkbox
                                checked={filters.includes(`gender=${gender.attributes.name}`)}
                                onClick={() => handleCheckboxChange(`gender=${gender.attributes.name}`)}
                            >
                                {gender.attributes.name}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </div>
            <div className='filters'>
                <div className='filterTitle'>Color variants</div>
                <div className='subFilters'>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture=1-1")}
                            onClick={() => handleCheckboxChange("texture=1-1")}
                        >
                            1 texture
                        </Checkbox>
                    </div>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture=2-3")}
                            onClick={() => handleCheckboxChange("texture=2-3")}
                        >
                            2-3 textures
                        </Checkbox>
                    </div>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture=4-10")}
                            onClick={() => handleCheckboxChange("texture=4-10")}
                        >
                            4-10 textures
                        </Checkbox>
                    </div>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture=11-99")}
                            onClick={() => handleCheckboxChange("texture=11-99")}
                        >
                            11+ textures
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div className='filters'>
                <div className='filterTitle'>Price range</div>
                <div className='filterPrice'>
                    {/* TODO Initial value for price */}
                    <MultiRangeSlider
                        min={1}
                        max={200}
                        onChange={({ min, max }) => {
                            setPriceMin(min);
                            setPriceMax(max);
                        }}
                    />
                </div>
            </div>
            <button className='submitButton' onClick={generateLink}>
                Submit
                <Image src={filtersIco} width={20} height={20} />
            </button>
        </div>
    </Container>);
}

export default Filters;