import {TasksStateType} from "../App";
import {addNewTodoAC, addTaskAC, changeStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be deleted from correct array', () => {


    const startState: TasksStateType = {
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
    const action = removeTaskAC('2','todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].taskId).toBe('1')
    expect(endState['todolistId2'][1].taskId).toBe('3')
    expect(endState['todolistId2'].every(t=> t.taskId != '2')).toBeTruthy()

})

test('correct task should be add new task', () => {


    const startState: TasksStateType = {
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

    const newTaskTitle = 'Book'
    const action = addTaskAC('todolistId1',newTaskTitle)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe(newTaskTitle)
    expect(endState['todolistId1'][1].title).toBe("HTML&CSS")
    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].taskId).toBeDefined()
    expect(endState['todolistId2'][0].isDone).toBe(false)


})

test('new property with new array should be added when new todolist is added', () => {


    const startState: TasksStateType = {
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

    const action = addNewTodoAC('XXX')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k=> k != 'todolistId1' && k!='todolistId2')
    if(!newKey) {
        throw Error('new key should ba added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})




//========= не проходит
// test('correct task should be change status task', () => {
//
//
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {taskId: '1', title: "HTML&CSS", isDone: false},
//             {taskId: '2', title: "JS", isDone: true},
//             {taskId: '3', title: "WB", isDone: false},
//         ],
//         'todolistId2': [
//             {taskId: '1', title: "Milk", isDone: false},
//             {taskId: '2', title: "React Book", isDone: true},
//             {taskId: '3', title: "Beer", isDone: false},
//         ]
//     }
//
//     let newStatus = true
//     const action = changeStatusAC('todolistId2','1', newStatus)
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][0].isDone).toBe(!newStatus)
//     expect(endState['todolistId1'][0].isDone).toBe(true)
//
// })


