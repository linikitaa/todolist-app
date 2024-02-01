import {TasksStateType} from "../App";
import { addTaskAC, changeStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addNewTodoAC, removeTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";

let startState:TasksStateType = {
        'todolistId1': [
            {taskId: '1', title: "HTML&CSS", isDone: true},
            {taskId: '2', title: "JS", isDone: false},
            {taskId: '3', title: "WB", isDone: true},
        ],
        'todolistId2': [
            {taskId: '1', title: "Milk", isDone: false},
            {taskId: '2', title: "React Book", isDone: true},
            {taskId: '3', title: "Beer", isDone: false},
        ]
    }

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2','todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].taskId).toBe('1')
    expect(endState['todolistId2'][1].taskId).toBe('3')
    expect(endState['todolistId2'].every(t=> t.taskId != '2')).toBeTruthy()

})
test('correct task should be add new task', () => {

    const newTaskTitle = 'Book'
    const endState = tasksReducer(startState, addTaskAC('todolistId1',newTaskTitle))

    expect(endState['todolistId1'][0].title).toBe(newTaskTitle)
    expect(endState['todolistId1'][1].title).toBe("HTML&CSS")
    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].taskId).toBeDefined()
    expect(endState['todolistId2'][0].isDone).toBe(false)


})
test('new property with new array should be added when new todolist is added', () => {
    let newTodoId = v1()
    const action = addNewTodoAC('new todolist', newTodoId)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k=> k != 'todolistId1' && k!='todolistId2')
    if(!newKey) {
        throw Error('new key should ba added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test('correct task should be change status task', () => {

    let newStatus = true
    const action = changeStatusAC('todolistId1','1',newStatus)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].isDone).toBe(newStatus)
    expect(endState['todolistId2'][0].isDone).toBe(false)

})
test('property with todolistId should be deleted', () => {

    // const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})



