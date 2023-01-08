import {Consumer} from './consumer'
import {Logo} from '../../common/Logo'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Provider = () => {
    return <QueryClientProvider client={queryClient}>
        <Logo/>
        <Consumer/>
    </QueryClientProvider>
}