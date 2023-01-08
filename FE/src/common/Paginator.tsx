import {FC} from 'react'

export const Paginator: FC<{
    currentPage: number,
    maxPages: number,
    onPageChange: (newPage: number) => void
}> = ({currentPage, maxPages, onPageChange}) => {
    const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPage = event.target.valueAsNumber
        if (newPage >= 0 && newPage <= maxPages) {
            onPageChange(newPage)
        }
    }

    return <div style={{gap: '16px', marginTop: '16px'}}>
        <button className={'outline'} disabled={currentPage == 0} onClick={() => onPageChange(currentPage - 1)}>Prev</button>
        <input type={'number'} onChange={handlePageChange} value={currentPage}/>
        <button className={'outline'} disabled={currentPage == maxPages - 1} onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
}