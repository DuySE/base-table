import { useState } from 'react'

export default function usePagination(data = [], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(data.length / itemsPerPage)

  const currentData = () => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return data.slice(start, end)
  }

  const next = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage))
  }

  const prev = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1))
  }

  const jump = page => {
    const pageNumber = Math.max(1, page)
    setCurrentPage(() => Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}