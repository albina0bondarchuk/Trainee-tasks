import { LoginAction, LoginState, LoginTypes } from "../types/login";

const initialState: LoginState = {
    isSuccess: false,
    authorizationError: ''
}

export const loginReducer = (state = initialState, action : LoginAction) => {
    switch (action.type) {
        case LoginTypes.SUCCESS_AUTHORIZATION:
            return {
                ...state,
                isSuccess: true
            }

        case LoginTypes.FAILED_AUTHORIZATION:
            return {
                ...state,
                authorizationError: 'incorrect login or password'
            }
        default:
            return state
    }
}