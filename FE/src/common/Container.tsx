import React, {FC, ReactNode} from 'react'

export const Container: FC<{ children: ReactNode }> = ({children}) => {
    return <div style={{width: '500px', flexFlow: 'column'}}>
        {children}
    </div>
}