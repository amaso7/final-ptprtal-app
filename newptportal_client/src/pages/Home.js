import React, { Fragment } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { useAuthDispatch } from '../context/auth'

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`

export default function Home({  }) {
  const dispatch = useAuthDispatch()
  let navigate = useNavigate()
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  const { loading, data, error } = useQuery(GET_USERS)

  if (error) {
    console.log(error)
  }

  if (data) {
    console.log(data)
  }

  let usersMarkup
  if (!data || loading) {
    usersMarkup = <p>Loading..</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div key={user.username}>
        <p>{user.username}</p>
      </div>
    ))
  }
  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Col xs={4}>{usersMarkup}</Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>
    </Fragment>
  )
}