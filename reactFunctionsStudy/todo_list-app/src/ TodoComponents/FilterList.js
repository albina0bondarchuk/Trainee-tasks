import FilterItem from "./FilterItem"


export default function FilterList() {
    return (
        <div className="filter_container">
            <FilterItem 
                filter='all'
            />
            <FilterItem
                filter='active'
            />
            <FilterItem
                filter='completed'
            />
        </div>
    )
}

