import {FC} from 'react'

export const Loading: FC<{ loading: boolean }> = ({loading}) => {
    return <div style={{
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: '52px',
    }}>
        {loading && <span className={'loading'}>🤞</span>}
        {!loading && <span>👍</span>}
    </div>
}