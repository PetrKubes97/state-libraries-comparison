import {createContext, useEffect, useState} from 'react'
import {PaginatedList, Todo} from '../../common/types'
import {Consumer} from './consumer'
import {Logo} from '../../common/Logo'

export type TodoContextType = {
    loading: boolean
    todos: Todo[]
    page: number
    maxPages: number,
    setPage: (page: number) => void,
    toggleTodo: (todoId: number) => void,
}

export const TodosContext = createContext<TodoContextType | null>(null)

export const Provider = () => {
    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [page, setPage] = useState(0)
    const [maxPages, setMaxPages] = useState<number>(0)

    const toggleTodo = (todoId: number) => {
        const _toggleTodo = async () => {
            setLoading(true)
            const newTodo = await (await fetch(`http://localhost:3000/${todoId}`, {method: 'PUT'})).json()
            setLoading(false)
            setTodos(todos.map((old) => old.id == todoId ? newTodo : old))
        }

        _toggleTodo()
    }

    const context: TodoContextType = {
        loading, todos, page, maxPages, setPage, toggleTodo
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response: PaginatedList<Todo> = await (await fetch(`http://localhost:3000/?page=${page}`)).json()
            setTodos(response.list)
            setLoading(false)
            setMaxPages(response.maxPages)
        }

        fetchData()
    }, [page])

    return <>
        <TodosContext.Provider value={context}>
            <Logo/>
            <Consumer/>
        </TodosContext.Provider>
    </>
}