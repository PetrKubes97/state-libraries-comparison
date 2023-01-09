import { useState } from 'react'
import { Provider as Redux } from './implementations/redux/provider'
import { Provider as ReduxToolKit } from './implementations/reduxToolKit/provider'
import { Provider as ReactContext } from './implementations/useContextApp/provider'
import { Provider as ReactQuery } from './implementations/useQuery/provider'
import { Provider as Zustand } from './implementations/zustand/provider'
import './App.css'

export const App = () => {
    type Solution = 'redux' | 'reduxToolKit' | 'context' | 'react query' | 'zustand'
    const [solution, setSolution] = useState<Solution>('redux')

    return <div style={{ flexFlow: 'column' }}>
        <select name="solution" value={solution} onChange={event => setSolution(event.target.value as Solution)}>
            <option id={'react query'}>react query</option>
            <option id={'redux'}>redux</option>
            <option id={'reduxToolKit'}>reduxToolKit</option>
            <option id={'context'}>context</option>
            <option id={'zustand'}>zustand</option>
        </select>
        {solution == 'react query' && <ReactQuery />}
        {solution == 'redux' && <Redux />}
        {solution == 'reduxToolKit' && <ReduxToolKit />}
        {solution == 'context' && <ReactContext />}
        {solution == 'zustand' && <Zustand />}
    </div>
}