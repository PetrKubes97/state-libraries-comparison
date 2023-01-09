import { Logo } from '../../common/Logo'
import { Provider as ReduxProvider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Consumer } from './consumer'
import thunk from "redux-thunk";
import { todosReducer } from './reducers'

const reducers = combineReducers({
    todos: todosReducer
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type State = ReturnType<typeof reducers>

export const Provider = () => {
    return <ReduxProvider store={store}>
        <Logo />
        <Consumer />
    </ReduxProvider>
}