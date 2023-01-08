import {Container} from '../../common/Container'
import {ListOfTodos} from '../../common/ListOfTodos'
import {Paginator} from '../../common/Paginator'
import {Todo} from '../../common/types'
import {useContext} from 'react'
import {TodosContext} from './provider'
import {Loading} from '../../common/Loading'

export const Consumer = () => {
    const context = useContext(TodosContext)!

    return <>
        <Container>
            <Loading loading={context.loading}/>
            <ListOfTodos todos={context.todos} onToggle={context.toggleTodo}></ListOfTodos>
            <Paginator currentPage={context.page} maxPages={context.maxPages} onPageChange={context.setPage}></Paginator>
        </Container>
    </>
}