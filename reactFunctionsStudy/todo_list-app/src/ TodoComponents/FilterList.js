import FilterItem from "./FilterItem"


export default function FilterList() {
    return (
        <div className="filter_container">
            <FilterItem 
                filterName='all'
            />
            <FilterItem
                filterName='active'
            />
            <FilterItem
                filterName='completed'
            />
        </div>
    )
}

