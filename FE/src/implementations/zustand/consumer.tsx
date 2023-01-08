import {Container} from '../../common/Container'
import {ListOfTodos} from '../../common/ListOfTodos'
import {Paginator} from '../../common/Paginator'
import {Loading} from '../../common/Loading'
import {useTodoStore} from './provider'
import {useEffect} from 'react'

export const Consumer = () => {
    const todoStore = useTodoStore()

    useEffect(() => {
        todoStore.changePage(0)
    }, [])

    console.log(todoStore)

    return <>
        <Container>
            <Loading loading={todoStore.loading}/>
            <ListOfTodos
                todos={todoStore.todos[todoStore.currentPage] ?? []}
                onToggle={todoStore.toggleTodo}
            />
            <Paginator
                currentPage={todoStore.currentPage}
                maxPages={todoStore.maxPages}
                onPageChange={todoStore.changePage}/>
        </Container>
    </>
}