import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from 'redux'
import { ThunkDispatch, thunk } from 'redux-thunk'
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer,undefined, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector  :TypedUseSelectorHook<AppRootStateType>= useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

// {
//     state: {
//         tasks: {}
//         todolists:{}
//     }
//
//     getState()
//     dispatch()
//     subscribe()
// }