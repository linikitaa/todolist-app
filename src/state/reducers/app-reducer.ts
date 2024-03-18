export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}


export const appReducer = ( state:InitialStateType = initialState, action: ActionsType ): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return {...state, error:action.error}
        default:
            return {...state}
    }
}



export const setAppStatusAC = (status:RequestStatusType)=> ({type:'APP/SET-STATUS', status}as const)
export const setErrorAC = (error:null | string)=> ({type:'APP/SET-ERROR', error}as const)



//types
export type InitialStateType = {
    status: RequestStatusType
    error: null | string
}

type ActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setErrorAC>