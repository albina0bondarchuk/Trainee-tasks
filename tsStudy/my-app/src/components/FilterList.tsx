import styled from "styled-components"
import FilterItem from "./FilterItem"


const FilterList: React.FC = () => {
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

export default FilterList