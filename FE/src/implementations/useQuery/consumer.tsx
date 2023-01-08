import {Container} from '../../common/Container'
import {ListOfTodos} from '../../common/ListOfTodos'
import {Paginator} from '../../common/Paginator'
import {Loading} from '../../common/Loading'
import {useState} from 'react'
import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query'
import {PaginatedList, Todo} from '../../common/types'

export const Consumer = () => {
    const [currentPage, setCurrentPage] = useState(0)

    const {isLoading, data} = useQuery({
        queryKey: ['todo', currentPage],
        queryFn: async (): Promise<PaginatedList<Todo>> =>
            await (await fetch(`http://localhost:3000?page=${currentPage}`)).json(),
    })

    const queryClient = useQueryClient()
    const {mutate, isLoading: isToggleLoading} = useMutation({
            mutationFn: async (todoId: number): Promise<Todo> =>
                await (await fetch(`http://localhost:3000/${todoId}`, {method: 'PUT'})).json(),
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['todo', currentPage]})
        },
    )

    return <>
        <Container>
            <Loading loading={isLoading || isToggleLoading}/>
            <ListOfTodos
                todos={data?.list ?? []}
                onToggle={mutate}
            />
            <Paginator currentPage={currentPage} maxPages={data?.maxPages ?? 0} onPageChange={setCurrentPage}/>
        </Container>
    </>
}