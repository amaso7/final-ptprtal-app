import React, { useState } from 'react'
import {  Container, Row, Col, Form, Button} from 'react-bootstrap'
import './App.scss';

function App() {

  const [variables, setVariables ] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',

  })

  const submitRegisterForm = e => {
    e.preventDefault()

    console.log(variables)

  }
  return (
    <Container>
      
      <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        
        <h1 className='text-center '>Azure for Health LLC. Patient Portal </h1>
        <h3 className='text-center '>Register Here!</h3>
        <Form onSubmit={submitRegisterForm}>
  <Form.Group>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={variables.email} onChange={(e) => 
      setVariables({...variables,email: e.target.value}) }/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group >
    <Form.Label>Username </Form.Label>
    <Form.Control type="text" placeholder="Enter Username" value={variables.username} onChange={(e) => 
      setVariables({...variables,username: e.target.value}) } />
  </Form.Group>
  <Form.Group >
    <Form.Label>Password </Form.Label>
    <Form.Control type="Password" placeholder="Enter Password" value={variables.password} onChange={(e) => 
      setVariables({...variables,password: e.target.value}) } />
  </Form.Group>
  <Form.Group >
    <Form.Label>Confirm Password </Form.Label>
    <Form.Control type="Password" placeholder="Confirm Password" value={variables.confirmPassword} onChange={(e) => 
      setVariables({...variables,confirmPassword: e.target.value}) }/>
  </Form.Group>
  <div className="text-center py-2"><Button variant="success" type="submit" >
    Register
  </Button></div>
  

</Form>

        </Col>
      </Row>
    </Container>
  );
}

export default App;
