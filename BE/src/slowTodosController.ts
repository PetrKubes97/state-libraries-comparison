type Todo = {
    id: number
    text: string
    completed: boolean
}

type PaginatedList<T> = {
    list: T[],
    maxPages: number
}

const DELAY = 500
const PER_PAGE = 5

const _sleep = async (millis: number) => {
    await new Promise(f => setTimeout(f, millis));
}

export const TodosController = () => {
    const todos: Todo[] = []

    // Seed some data
    for (let i = 0; i < 15; i++) {
        todos.push({
            id: i,
            text: `Some todo ${i}`,
            completed: i % 4 == 0
        })
    }

    const addTodo = async (text: string): Promise<Todo> => {
        await _sleep(DELAY)
        const newId = todos.length
        const newTodo = {
            id: newId,
            text,
            completed: false
        }
        todos.push(newTodo)
        return newTodo
    }

    const toggleTodo = async (todoId: number): Promise<Todo> => {
        await _sleep(DELAY)
        const idx = todos.findIndex((todo) => todo.id == todoId)
        todos[idx].completed = !todos[idx].completed
        return todos[idx]
    }

    const getTodos = async (page: number): Promise<PaginatedList<Todo>> => {
        await _sleep(DELAY)
        const startIdx = page * PER_PAGE
        const endIdx = (page + 1) * PER_PAGE
        return {
            list: todos.slice(startIdx, endIdx),
            maxPages: todos.length / PER_PAGE
        }
    }

    return {
        addTodo,
        toggleTodo,
        getTodos
    }
}
