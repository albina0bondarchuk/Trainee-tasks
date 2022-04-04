export enum PaginationTypes {
    CHANGE_PAGE = 'PAGINATION/CHANGE_PAGE'
}

export interface PaginationState {
    currentPage: number,
    todosPerPage: number
}

interface ChangePageAction {
    type: PaginationTypes.CHANGE_PAGE,
    payload: {
        page: number
    }
}

export type PaginationAction = ChangePageAction