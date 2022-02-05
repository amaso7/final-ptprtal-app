import React from 'react'
import {  Container, Row, Col, Form, Button} from 'react-bootstrap'
import './App.scss';

function App() {
  return (
    <Container>
      
      <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        
        <h1 className='text-center '>Azure for Health LLC. Patient Portal </h1>
        <h2 className='text-center '>Register Here!</h2>
        <Form onSubmit={submitRegisterForm}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username </Form.Label>
    <Form.Control type="text" placeholder="Enter Username" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Password </Form.Label>
    <Form.Control type="Password" placeholder="Enter Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Confirm Password </Form.Label>
    <Form.Control type="Password" placeholder="Confirm Password" />
  </Form.Group>
  <div className="text-center"><Button variant="primary" type="submit" >
    Register
  </Button></div>
  

</Form>

        </Col>
      </Row>
    </Container>
  );
}

export default App;
