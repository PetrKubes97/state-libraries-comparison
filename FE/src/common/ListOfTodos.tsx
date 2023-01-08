import {Todo} from './types'
import {FC} from 'react'

export const ListOfTodos: FC<{ todos: Todo[], onToggle: (todoId: number) => void }> = (props) => {
    return <div style={{width: '500px', flexFlow: 'column', marginTop: '10px'}}>
        {props.todos.map((todo) => {
            return <div
                key={todo.id}
                className={'todoRow'}
                onClick={() => props.onToggle(todo.id)}
            >
                <span>{todo.text}</span>
                <input type={'checkbox'}
                       checked={todo.completed}
                       readOnly={true}
                />
            </div>
        })}
    </div>
}