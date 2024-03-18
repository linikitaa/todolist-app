import {setAppStatusAC, setErrorAC} from "../state/reducers/app-reducer";
import {ResponseType} from '../api/todolistss-api'
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch:Dispatch)=> {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error:any,dispatch:Dispatch)=> {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}