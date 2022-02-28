import { Component } from "react"
import {FilterItem} from "./FilterItem"


export class FilterList extends Component {
    render() {
        return (
            <div className="filter_container">
                <FilterItem 
                    filter='all'
                    active={this.props.filter}
                    filterTodos = {this.props.filterTodos}
                />
                <FilterItem
                    filter='active'
                    active={this.props.filter}
                    filterTodos = {this.props.filterTodos}
                />
                <FilterItem
                    filter='completed'
                    active={this.props.filter}
                    filterTodos = {this.props.filterTodos}
                />
            </div>
        )
    }
}