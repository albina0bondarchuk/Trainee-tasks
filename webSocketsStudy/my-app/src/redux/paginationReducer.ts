import { PaginationAction, PaginationState, PaginationTypes } from "../types/pagination";

const initialState: PaginationState = {
    currentPage: 1,
    todosPerPage: 3
}

export const paginationReducer = (state = initialState, action : PaginationAction) => {
    switch (action.type) {
        case PaginationTypes.CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload.page
            }

        default:
            return state
    }
}