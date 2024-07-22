import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="app-background">
      <Container>
        <Row className="justify-content-center">
          <Col md="8" className="d-flex flex-column align-items-center">
            <img
              src="img/pokeball3.jpg"
              className="mx-auto rounded-circle shadow-lg animate__animated animate__bounceInLeft pokeball-image"
            />
            <Link to={`/index`} >
                <Button  color="danger" className="mt-3 px-4 py-2 fs-4 fw-bold text-white shadow-lg" style={{ borderRadius: '9999px' }}>
                    START
                </Button>
            </Link>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
