  import React, { useState } from 'react'
  import { Row, Col, Form, Button } from 'react-bootstrap'
  import { gql, useLazyQuery } from '@apollo/client'
  import { Link, useNavigate  } from 'react-router-dom'


  
    

  const LOGIN_USER = gql`
    query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`
  
  export default function Register(props) {
    const [variables, setVariables ] = useState({
      username: '',
      password: '',
  
    })
  
    const [errors, setErrors] = useState({})
    
    let navigate = useNavigate();
  
    const [loginUser,  { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
        onCompleted(data) {
          localStorage.setItem('token', data.login.token)
          navigate('/')
          
        },
    })
  
    const submitLoginForm = (e) => {
      e.preventDefault()
  
      loginUser({ variables })
    }
    return (  
        <Row className=" py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          
          <h1 className='text-center '>Azure for Health LLC. Patient Portal </h1>
          <h3 className='text-center '>Login Here!</h3>
          <Form onSubmit={submitLoginForm}>
    
    <Form.Group >
    <Form.Label className={errors.username && 'text-danger'}>{errors.username ?? 'Username'}</Form.Label>
      <Form.Control type="text" placeholder="Enter Username" value={variables.username} className={errors.username && 'is-invalid'} onChange={(e) => 
        setVariables({...variables,username: e.target.value}) } />
    </Form.Group>
    <Form.Group >
    <Form.Label className={errors.password && 'text-danger'}>{errors.password ?? 'Password'}</Form.Label>
      <Form.Control type="Password" placeholder="Enter Password" value={variables.password} className={errors.password && 'is-invalid'} onChange={(e) => 
        setVariables({...variables,password: e.target.value}) } />
    </Form.Group>
   
    <div className="text-center py-2">
        <Button variant="success" type="submit" disabled= {loading}>
            { loading ? 'loading...': 'Login'}
    </Button>
    <br />
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
    </div>
  </Form>
  </Col>
  </Row>
    )
  }
  

