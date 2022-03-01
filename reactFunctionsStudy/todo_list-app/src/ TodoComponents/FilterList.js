import {FilterItem} from "./FilterItem"


export function FilterList({filter}) {
    return (
        <div className="filter_container">
            <FilterItem 
                filter='all'
                active={filter}
            />
            <FilterItem
                filter='active'
                active={filter}
            />
            <FilterItem
                filter='completed'
                active={filter}
            />
        </div>
    )
}