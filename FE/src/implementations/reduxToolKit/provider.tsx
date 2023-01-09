import { Logo } from '../../common/Logo'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Provider as ReduxProvider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Consumer } from './consumer'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PaginatedList, Todo } from '../../common/types'

type TodosState = {
    page: number
}

const initialTodoState: TodosState = {
    page: 0
}

const stateSlice = createSlice({
    name: 'state',
    initialState: initialTodoState,
    reducers: {
        changePage: (state, newPage: PayloadAction<number>) => {
            state.page = newPage.payload
        }
    }
})

export const { changePage } = stateSlice.actions;

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    tagTypes: ['Todo'],
    endpoints: builder => ({
        fetchTodos: builder.query<PaginatedList<Todo>, number>({
            query: (page) => `/?page=${page}`,
            providesTags: () => [
                'Todo',
            ]
        }),
        toggleTodo: builder.mutation<Todo, number>({
            query: todoId => ({
                url: `/${todoId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const { useFetchTodosQuery, useToggleTodoMutation } = apiSlice

const store = configureStore({
    reducer: {
        todos: stateSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const Provider = () => {
    return <ReduxProvider store={store}>
        <Logo />
        <Consumer />
    </ReduxProvider>
}