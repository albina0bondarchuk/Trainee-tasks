export enum LoginTypes {
    AUTHORIZATION = 'LOGIN/AUTHORIZATION',
    SUCCESS_AUTHORIZATION = 'LOGIN/SUCCESS_AUTHORIZATION',
    FAILED_AUTHORIZATION = 'LOGIN/FAILED_AUTHORIZATION'
}

export interface LoginState {
    isSuccess: boolean,
    authorizationError: string
}

export type LoginAction = {
    type: LoginTypes.AUTHORIZATION | LoginTypes.SUCCESS_AUTHORIZATION | LoginTypes.FAILED_AUTHORIZATION,
    payload?: any 
}