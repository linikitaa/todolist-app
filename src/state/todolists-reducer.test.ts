import {v1} from "uuid";
import {
    addTodoAC,
    changeFilterAC,
    changeTodoTitleAC, FilterValuesType,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1 = v1();
let todolistId2 = v1();


const startState: TodolistDomainType[] = [
    {id: todolistId1, title: "What to learn", filter: "all",order:0,addedDate:''},
    {id: todolistId2, title: "What to buy", filter: "all",order:0,addedDate:''}
]

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, {
        type: 'REMOVE-TODOLIST',
        payload: {todoId: todolistId1}
    })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

// test('correct todolist should be Add Todolist', () => {
//
//     let newTodolistTitle = 'XXX'
//     let newTodoId = v1()
//     const action =addTodoAC(newTodolistTitle,newTodoId)
//     const endState = todolistsReducer(startState, action)
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe(newTodolistTitle)
//
// })

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = changeTodoTitleAC(todolistId2,newTodolistTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe('New Todolist')

})

test('correct todolist should change filter', () => {

    let newFilter:FilterValuesType = 'completed'

    const action = changeFilterAC(newFilter,todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)

})