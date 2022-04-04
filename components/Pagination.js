import { useState } from 'react'

export default function Pagination({ next, prev, jump, currentPage, maxPage }) {
  const [page, setPage] = useState(1)

  return (
    <ul className="pagination">
      <li className="pagination-item">
        <button onClick={() => jump(1)} className={currentPage === 1 ? 'disabled' : ''} disabled={currentPage === 1}>
          First
        </button>
      </li>
      <li className="pagination-item">
        <button onClick={prev} className={currentPage === 1 ? 'disabled' : ''} disabled={currentPage === 1}>
          &lt;
        </button>
      </li>
      <li className="pagination-item">
        <button onClick={next} className={currentPage === maxPage ? 'disabled' : ''} disabled={currentPage === maxPage}>
          &gt;
        </button>
      </li>
      <li className="pagination-item">
        <button onClick={() => jump(maxPage)} className={currentPage === maxPage ? 'disabled' : ''} disabled={currentPage === maxPage}>
          Last
        </button>
      </li>
      <li className="goto">
        <input type="text" name="page" placeholder="Enter page" onChange={e => setPage(e.target.value)} />
        <button onClick={() => jump(page)}>
          Go to page
        </button>
      </li>
    </ul>
  )
}
