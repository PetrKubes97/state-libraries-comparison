import { FETCHING_TODOS, FETCHING_TODOS_SUCCESS, FETCHING_TODOS_FAILURE, TodosAction, TOGGLING_TODO, TOGGLING_TODO_FAILURE, TOGGLING_TODO_SUCCESS } from '../actions/types'
import { PaginatedList, Todo } from '../../../common/types'

type TodosState = {
    isFetching: boolean,
    isLoading: boolean,
    todosList: PaginatedList<Todo>
    page: number
    todoToggled: boolean
}

export const initialTodoState: TodosState = {
    isFetching: false,
    isLoading: false,
    page: 0,
    todosList: {
        list: [],
        maxPages: 0
    },
    todoToggled: false
}

export const todosReducer = (state: TodosState = initialTodoState, action: TodosAction) => {
    switch (action.type) {
        case FETCHING_TODOS:
            return {
                ...state,
                isFetching: true,
                isLoading: false,
                page: action.payload.page
            }
        case FETCHING_TODOS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoading: false,
                todosList: action.payload.todosList,
                page: action.payload.page
            };
        case FETCHING_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFetching: false,
            };
        case TOGGLING_TODO:
            return {
                ...state,
                todoToggled: false,
                isLoading: true,
            }
        case TOGGLING_TODO_SUCCESS:
            return {
                ...state,
                todoToggled: true,
                isLoading: false,
            };
        case TOGGLING_TODO_FAILURE:
            return {
                ...state,
                todoToggled: false,
                isLoading: false,
            };
        default:
            return state;
    }
}