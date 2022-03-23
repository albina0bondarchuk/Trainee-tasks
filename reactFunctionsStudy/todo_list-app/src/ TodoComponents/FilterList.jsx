import styled from "styled-components"
import FilterItem from "./FilterItem"


export default function FilterList() {
    return (
        <FilterContainer>
            <FilterItem 
                filterName='all'
            />
            <FilterItem
                filterName='active'
            />
            <FilterItem
                filterName='completed'
            />
        </FilterContainer>
    )
}


const FilterContainer = styled.div`
    display: flex;
`