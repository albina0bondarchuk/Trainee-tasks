import { LoginTypes } from "../types/login"


function authorization(login: string, password: string) {
    return {
        type: LoginTypes.AUTHORIZATION,
        payload: {
            login,
            password
        }
    }
}

function successAuthorization() {
    return{
        type: LoginTypes.SUCCESS_AUTHORIZATION
    }
}

function failedAuthorization() {
    return {
        type: LoginTypes.FAILED_AUTHORIZATION
    }
}

export { authorization, successAuthorization, failedAuthorization }