import {
    PaginatedList,
    Todo
} from "../../../common/types"

export const FETCHING_TODOS = 'FETCHING_TODOS'
export const FETCHING_TODOS_SUCCESS = 'FETCHING_TODOS_SUCCESS'
export const FETCHING_TODOS_FAILURE = 'FETCHING_TODOS_FAILURE'
export const TOGGLING_TODO = 'TOGGLING_TODO'
export const TOGGLING_TODO_SUCCESS = 'TOGGLING_TODO_SUCCESS'
export const TOGGLING_TODO_FAILURE = 'TOGGLING_TODO_FAILURE'

type TodosActionPayload = {
    isFetching?: boolean,
    page: number,
    todosList: PaginatedList<Todo>
}

export type TodosAction = {
    type: string,
    payload: TodosActionPayload
}

export type ToggleAction = {
    type: string,
}