import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Table, Collapse } from 'react-bootstrap';
import carData from '../data/cars.json'; // 导入车辆数据

function HighlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [showForm, setShowForm] = useState(false); // 控制选择表单的显示和隐藏

  // 当组件加载时，从localStorage恢复数据
  useEffect(() => {
    const savedCars = localStorage.getItem('highlightedCars');
    if (savedCars) {
      setHighlightedCars(JSON.parse(savedCars));
    }
  }, []);

  // 当highlightedCars变化时，将数据保存到localStorage
  useEffect(() => {
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCars));
  }, [highlightedCars]);

  // 添加车辆到重点车辆列表
  const addCarToHighlight = (car) => {
    if (!highlightedCars.some(c => c.model === car.model)) {
      setHighlightedCars([...highlightedCars, car]);
    }
  };

  // 从重点车辆列表中移除车辆
  const removeCarFromHighlight = (model) => {
    setHighlightedCars(highlightedCars.filter(car => car.model !== model));
  };

  return (
    <Container>
      <h2 className="my-4">Highlighted Cars</h2>

      <Button
        variant="info"
        onClick={() => setShowForm(!showForm)}
        aria-controls="car-selection-form"
        aria-expanded={showForm}
        className="mb-3"
      >
        {showForm ? 'Hide Selection Form' : 'Show Selection Form'}
      </Button>

      <Collapse in={showForm}>
        <div id="car-selection-form">
          <h4>Available Cars</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carData.map(car => (
                <tr key={car.model}>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      onClick={() => addCarToHighlight(car)}
                      disabled={highlightedCars.some(c => c.model === car.model)}
                    >
                      Add to Highlight
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Collapse>

      <h4>Highlighted Cars</h4>
      <Row>
        {highlightedCars.length > 0 ? (
          highlightedCars.map(car => (
            <Col md={4} key={car.model} className="mb-4">
              <Card>
                <Card.Img variant="top" src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                <Card.Body>
                  <Card.Title>{car.brand} - {car.model}</Card.Title>
                  <Card.Text>
                    Price: {car.value} Baht<br />
                    Quantity: {car.quantity}<br />
                    Model: {car.model}
                  </Card.Text>
                  <Button 
                    variant="danger" 
                    onClick={() => removeCarFromHighlight(car.model)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No highlighted cars selected.</p>
        )}
      </Row>
    </Container>
  );
}

export default HighlightedCars;

