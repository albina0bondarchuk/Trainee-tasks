import { FAILED_AUTHORIZATION, SUCCESS_AUTHORIZATION } from "./action_types";

const initialState = {
    isSuccess: false
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_AUTHORIZATION:
            return {
                ...state,
                isSuccess: true
            }

        case FAILED_AUTHORIZATION:
            return state
        default:
            return state
    }
}