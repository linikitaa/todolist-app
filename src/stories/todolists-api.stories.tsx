import React, { useEffect, useState } from 'react'
import {todolistsAPI} from "../api/todolistss-api";
export default {
    title: 'API',
}
const config = {
    withCredentials: true
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    console.log('state',state)
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title='2222222'
        todolistsAPI.createTodolists(title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a123ebd1-b28f-4038-a10e-1b122edbc181'
    useEffect(() => {
        todolistsAPI.deleteTodolists(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'zazazaza'
        const todolistId = '127c5ec3-eb88-4dcf-a21b-d20cf1d6b012'
        todolistsAPI.updateTodolists(todolistId, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


///////////////////////


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '733eb129-6186-484b-9f1a-8552619e4c7c'
        todolistsAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '733eb129-6186-484b-9f1a-8552619e4c7c'
        const title='ololololo'
        todolistsAPI.createTask(todolistId,title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b161fa2d-82e6-401f-a1fb-162dbc14abfb'
        const taskId = '2ec522b1-936e-4e66-826f-c6792f84ab95'
        todolistsAPI.deleteTask(todolistId,taskId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = 'b161fa2d-82e6-401f-a1fb-162dbc14abfb'
//         const taskId = '702d8f67-db23-4741-9de2-7498ee9de035'
//         const title='kwakwakwa'
//         // todolistsAPI.updateTask(todolistId,taskId,model)
//             .then(res => setState(res.data))
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }