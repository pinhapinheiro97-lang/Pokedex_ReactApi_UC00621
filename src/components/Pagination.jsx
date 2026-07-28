import React from 'react'

const Pagination = ({ previousPage, nextPage, prevPageUrl, nextPageUrl }) => {
    return (
        <div className='pagination'>
            <button onClick={previousPage} disabled={!prevPageUrl}>Página anterior</button>
            <button onClick={nextPage} disabled={!nextPageUrl}>Página seguinte</button>

        </div>
    )
}

export default Pagination