export type Todo = {
    id: number,
    text: string,
    completed: boolean
}

export type PaginatedList<T> = {
    list: T[],
    maxPages: number
}