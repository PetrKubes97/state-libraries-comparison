import { FC, useEffect } from 'react'
import { Container } from '../../common/Container'
import { Loading } from '../../common/Loading'
import { ListOfTodos } from '../../common/ListOfTodos'
import { Paginator } from '../../common/Paginator'
import { useAppSelector, State, useAppDispatch } from './provider'
import * as Actions from './actions'
import { bindActionCreators } from 'redux'


export const Consumer: FC = () => {
    const { fetchTodos, toggleTodo } = bindActionCreators(Actions, useAppDispatch())
    const { page, isFetching, todosList, isLoading, todoToggled } = useAppSelector((state: State) => state.todos)

    useEffect(() => {
        fetchTodos(page)
    }, [])

    useEffect(() => {
        if (todoToggled) {
            fetchTodos(page)
        }
    }, [todoToggled])

    return <>
        <Container>
            <Loading loading={isFetching || isLoading} />
            {todosList && <ListOfTodos todos={todosList.list} onToggle={toggleTodo} />}
            <Paginator
                currentPage={page} maxPages={todosList?.maxPages ?? 0} onPageChange={(newPage) => {
                    fetchTodos(newPage)
                }} />
        </Container>
    </>
}