import React, { useContext, useState } from 'react';
import { Container } from './Filters.styled';
import closeIco from "../../static/icons/close.svg"
import Image from 'next/image';
import Checkbox from '../../elements/Inputs/Checkbox';
import { GlobalContext } from '../../pages/_app';
import MultiRangeSlider from '../../elements/Inputs/MultiRangeSlider';
import filtersIco from "../../static/icons/filters.svg"
import { getStrapiMedia } from '../../lib/media';

const Filters = () => {
    const [filters, setFilters] = useState([]);
    const { categories, genders } = useContext(GlobalContext);
    const [priceMin, setPriceMin] = useState(1);
    const [priceMax, setPriceMax] = useState(200);
    console.log(categories)
    const handleCheckboxChange = name => {
        if (filters.includes(name)) {
            setFilters(filters.filter(e => e !== name))
        } else {
            setFilters([...filters, name])
        }
    }

    return (<Container>
        <div className='header'>
            <div className='title'>Filters</div>
            <button className='closeButton'>
                <Image src={closeIco} width={24} height={24} />
            </button>
        </div>
        <button className='clearAll'>Clear all</button>
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
                                <div className='filter' key={type.attributes.name + j} style={{ marginLeft: "12px" }}>
                                    <Checkbox
                                        checked={filters.includes(type.attributes.name)}
                                        onClick={() => handleCheckboxChange(type.attributes.name)}
                                    >
                                        {type.attributes.name}
                                    </Checkbox>
                                </div>
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
                                checked={filters.includes(gender.attributes.name)}
                                onClick={() => handleCheckboxChange(gender.attributes.name)}
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
                            checked={filters.includes("texture-1")}
                            onClick={() => handleCheckboxChange("texture-1")}
                        >
                            1 texture
                        </Checkbox>
                    </div>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture-2-3")}
                            onClick={() => handleCheckboxChange("texture-2-3")}
                        >
                            2-3 texture
                        </Checkbox>
                    </div>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture-4-10")}
                            onClick={() => handleCheckboxChange("texture-4-10")}
                        >
                            4-10 texture
                        </Checkbox>
                    </div>
                    <div className='filter'>
                        <Checkbox
                            checked={filters.includes("texture-11")}
                            onClick={() => handleCheckboxChange("texture-11")}
                        >
                            11+ texture
                        </Checkbox>
                    </div>
                </div>
            </div>
            <div className='filters'>
                <div className='filterTitle'>Price range</div>
                <div className='filterPrice'>
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
            <button className='submitButton'>
                Submit
                <Image src={filtersIco} width={20} height={20} />
            </button>
        </div>
    </Container>);
}

export default Filters;