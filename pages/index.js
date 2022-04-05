import { useState, useEffect } from 'react'
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'
import styled from 'styled-components'
import axios from 'axios'
import EditableCell from '../components/EditableCell'
import Pagination from '../components/Pagination'

const Container = styled.div`
  height: ${props => props?.height || '100vh'};
  width: calc(50vw + 220px);
`
const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
}

const defaultSort = { key: 'title', order: SortOrder.ASC }

export default function Home() {
  const [posts, setPosts] = useState([])
  const [sortBy, setSortBy] = useState(defaultSort);
  const [currentPage, setCurrentPage] = useState(1)

  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data.map((i, key) => ({ ...i, key })));
  }

  useEffect(() => {
    const { hash } = window?.location || {};
    if (typeof hash === 'string' && hash.includes('#page')) {
      setCurrentPage(hash?.split('#page')[1]);
    }
    fetchPosts();
  }, []);

  const onColumnSort = (sortBy) => {
    const order = sortBy.order === SortOrder.ASC ? 1 : -1
    posts.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order))
    setSortBy(sortBy)
    setPosts(posts)
  }

  const currentData = () => {
    const start = (currentPage - 1) * 10
    const end = start + 10
    return posts.slice(start, end)
  }

  const removeRow = (rowData, data) => setPosts(Array.isArray(data) ? data.filter(({ id }) => rowData?.id !== id) : [])

  const editRow = (rowData, data) => {
    const newRow = { ...rowData, title: "Updated" }
    const newData = Array.isArray(data) ? data.map((item) => item?.id === newRow?.id ? { ...newRow } : { ...item }) : []
    setPosts(newData)
  }

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataKey: 'id',
      width: 150,
      resizable: true,
      sortable: true,
      frozen: Column.FrozenDirection.LEFT,
    },
    {
      key: 'title',
      title: 'Title',
      dataKey: 'title',
      width: 300,
      resizable: true,
      sortable: true,
      align: Column.Alignment.CENTER,
      cellRenderer: (props) => <EditableCell {...props} setPosts={setPosts} />,
    },
    {
      key: 'body',
      title: 'Body',
      dataKey: 'body',
      width: 500,
      resizable: true,
      sortable: true,
      align: Column.Alignment.CENTER,
      cellRenderer: (props) => <EditableCell {...props} setPosts={setPosts} />,
    },
    {
      key: 'action',
      title: 'Action',
      width: 100,
      align: Column.Alignment.CENTER,
      frozen: Column.FrozenDirection.RIGHT,
      cellRenderer: ({ rowData = {}, container = {} }) => (
        <>
          <button
            onClick={() => removeRow(rowData, container?._data)}
          >
            Remove
          </button>
        </>
      ),
    },
  ];

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    window.location.hash = `page${page}`;
  }

  return (
    <>
      <Container id="container">
        <BaseTable
          data={currentData()}
          width={1020}
          height={550}
          sortBy={sortBy}
          onColumnSort={onColumnSort}
        >
          {columns.map((item) => <Column {...item} />)}
        </BaseTable>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={posts.length}
          pageSize={10}
          onPageChange={handleCurrentPage}
        />
      </Container>
    </>
  )
}
