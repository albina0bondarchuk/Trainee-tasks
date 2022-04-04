import { PaginationTypes } from "../types/pagination";

export function changePage(page: number) {
    return {
        type: PaginationTypes.CHANGE_PAGE,
        payload: {
            page
        }
    }
}