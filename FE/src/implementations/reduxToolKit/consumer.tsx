import { FC } from 'react'
import { Container } from '../../common/Container'
import { Loading } from '../../common/Loading'
import { ListOfTodos } from '../../common/ListOfTodos'
import { Paginator } from '../../common/Paginator'
import { changePage, useAppDispatch, useAppSelector, useFetchTodosQuery, useToggleTodoMutation } from './provider'

export const Consumer: FC = () => {
    const page = useAppSelector((state) => state.todos.page)
    const { data, isFetching } = useFetchTodosQuery(page)
    const [toggleTodo, { isLoading }] = useToggleTodoMutation()
    const dispatch = useAppDispatch()

    return <>
        <Container>
            <Loading loading={isFetching || isLoading} />
            {data && <ListOfTodos todos={data.list} onToggle={toggleTodo} />}
            <Paginator
                currentPage={page} maxPages={data?.maxPages ?? 0} onPageChange={(newPage) => {
                    dispatch(changePage(newPage))
                }} />
        </Container>
    </>
}