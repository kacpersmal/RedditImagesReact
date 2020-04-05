import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Display from './display';
function App() {
  return (
    <div className="App">
      <Container className="h-100 text-center">
        <Row className="h-100">
          <Col></Col>
            <Col className="my-auto" xs={6}>
              <Display></Display>
            </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
