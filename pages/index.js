import { useState, useEffect } from 'react'
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'
import styled from 'styled-components'
import axios from 'axios'

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
  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data)
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const onColumnSort = sortBy => {
    const order = sortBy.order === SortOrder.ASC ? 1 : -1
    const data = [...posts]
    data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order))
    setPosts(data)
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
      width: 150,
      resizable: true,
      sortable: true,
      align: Column.Alignment.CENTER,
    },
    {
      key: 'body',
      title: 'Body',
      dataKey: 'body',
      width: 150,
      resizable: true,
      sortable: true,
      align: Column.Alignment.CENTER,
    },
    {
      key: 'action',
      width: 100,
      align: Column.Alignment.CENTER,
      frozen: Column.FrozenDirection.RIGHT,
      cellRenderer: ({ rowData, ...rest }) => {
        console.log('rest: ', rest);
        console.log('rowData: ', rowData);
        return (
          <button
            onClick={() => {}}
          >
            Remove
          </button>
        )
      },
    },
  ]

  return (
    <>
      <Container height={1000}>
        <BaseTable
          data={posts}
          columns={columns}
          width={1000}
          height={1000}
          sortBy={defaultSort}
          onColumnSort={onColumnSort}
        />
      </Container>
    </>
  )
}
