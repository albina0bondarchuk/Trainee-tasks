import styled from "styled-components"
import FilterItem from "./FilterItem"


const FilterContainer = styled.div`
    display: flex;
`

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

