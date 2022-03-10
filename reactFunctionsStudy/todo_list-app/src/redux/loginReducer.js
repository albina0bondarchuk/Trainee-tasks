import { EMPTY_INPUT, FAILED_AUTHORIZATION, SAVE_INPUT, SUCCESS_AUTHORIZATION } from "./types";

const initialState = {
    authorizationData: {
        login: '',
        password: '',
    },
    isSuccess: false,
    validationError: ''
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_INPUT:
            return {
                ...state,
                authorizationData: {
                    ...state.authorizationData,
                    [action.payload.name] : action.payload.value
                },
                validationError: ''
            }
        
        case EMPTY_INPUT: 
            return {
                ...state,
                validationError: 'all fields must be filled'
            }

        case SUCCESS_AUTHORIZATION:
            return {
                ...state,
                isSuccess: true
            }

        case FAILED_AUTHORIZATION:
            return {
                ...state,
                authorizationData: {
                    login: '',
                    password: ''
                },
                validationError: 'incorrect login or password'
            }

        default:
            return state
    }
}