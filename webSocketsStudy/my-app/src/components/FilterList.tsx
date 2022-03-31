import styled from "styled-components"
import { Filters } from "../types/todos"
import FilterItem from "./FilterItem"


const FilterList: React.FC = () => {
    return (
        <FilterContainer>
            <FilterItem 
                filterName={Filters.all}
            />
            <FilterItem
                filterName={Filters.active}
            />
            <FilterItem
                filterName={Filters.completed}
            />
        </FilterContainer>
    )
}


const FilterContainer = styled.div`
    display: flex;
`

export default FilterList