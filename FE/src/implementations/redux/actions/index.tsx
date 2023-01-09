import { Dispatch } from 'redux';
import { FETCHING_TODOS, FETCHING_TODOS_FAILURE, FETCHING_TODOS_SUCCESS, TOGGLING_TODO, TOGGLING_TODO_SUCCESS, TOGGLING_TODO_FAILURE, TodosAction } from './types'

export const fetchTodos = (page: number) => {
    return (dispatch: Dispatch<TodosAction>) => {
        dispatch({
            type: FETCHING_TODOS,
            payload: {
                page,
                todosList: {
                    list: [],
                    maxPages: 0
                }
            }
        });
        fetch(`http://localhost:3000/?page=${page}`)
            .then(responseJSON => responseJSON.json())
            .then(responseJSON => {
                dispatch({
                    type: FETCHING_TODOS_SUCCESS,
                    payload: {
                        page,
                        todosList: responseJSON
                    }
                })
            })
            .catch(() => {
                dispatch({
                    type: FETCHING_TODOS_FAILURE,
                    payload: {
                        page,
                        todosList: {
                            list: [],
                            maxPages: 0
                        }
                    }
                });
            })
    }
}


export const toggleTodo = (todoId: number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: TOGGLING_TODO,
        });
        fetch(`http://localhost:3000/${todoId}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(() => {
                dispatch({
                    type: TOGGLING_TODO_SUCCESS,
                })
            })
            .catch(() => {
                dispatch({
                    type: TOGGLING_TODO_FAILURE,
                });
            })
    }
}