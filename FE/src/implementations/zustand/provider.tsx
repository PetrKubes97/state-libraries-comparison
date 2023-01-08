import {Consumer} from './consumer'
import {Logo} from '../../common/Logo'
import create from 'zustand'
import {PaginatedList, Todo} from '../../common/types'

export const useTodoStore = create<{
    loading: boolean,
    currentPage: number,
    maxPages: number,
    todos: { [page: number]: Todo[] },
    changePage: (page: number) => void,
    toggleTodo: (todoId: number) => void
}>((set, getState) => ({
    maxPages: 0,
    currentPage: 0,
    loading: false,
    todos: {},
    changePage: async (newPage: number) => {
        const currentState = getState()
        // Caching
        if (currentState.todos[newPage]) {
            set({...currentState, currentPage: newPage})
            return
        }

        set({...currentState, loading: true, currentPage: newPage})
        const response: PaginatedList<Todo> = await (await fetch(`http://localhost:3000?page=${newPage}`)).json()
        set({
            ...currentState,
            todos: {...currentState.todos, [newPage]: response.list},
            maxPages: response.maxPages,
            currentPage: newPage,
            loading: false
        })
    },
    toggleTodo: async (todoId: number) => {
        const currentState = getState()
        set({...currentState, loading: true})
        const updatedTodo = await (await (await fetch(`http://localhost:3000/${todoId}`, {method: 'PUT'})).json())
        set({
            ...currentState,
            todos: {
                ...currentState.todos,
                [currentState.currentPage]: currentState.todos[currentState.currentPage].map((oldTodo) => {
                    if (oldTodo.id == todoId) return updatedTodo
                    return oldTodo
                })
            },
            loading: false
        })
    }
}))

export const Provider = () => {
    return <>
        <Logo/>
        <Consumer/>
    </>
}