import React, { useEffect, useState } from 'react';
import CarTable from './CarTable';
import PieChart from './PieChart';
import StackedBarChart from './StackedBarChart';
import carData from '../data/cars.json';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setCars(carData);
    setFilteredCars(carData);
  }, []);

  const handleFilter = () => {
    let filtered = cars;

    if (selectedBrand !== 'All') {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }

    if (minPrice !== '') {
      filtered = filtered.filter(car => car.value >= parseInt(minPrice, 10));
    }

    if (maxPrice !== '') {
      filtered = filtered.filter(car => car.value <= parseInt(maxPrice, 10));
    }

    setFilteredCars(filtered);
  };

  return (
    <Container fluid>
      <h1 className="my-4">Car Market Dashboard</h1>

      {/* 筛选表单 */}
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="brandSelect">
              <Form.Label>Car Brand</Form.Label>
              <Form.Control as="select" value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
                <option value="All">All</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="minPrice">
              <Form.Label>Minimum Price (Baht)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter minimum price"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="maxPrice">
              <Form.Label>Maximum Price (Baht)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter maximum price"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleFilter}>
              Apply Filter
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col md={5}>
          <h3>Car Distribution by Brand and Model</h3>
          <CarTable cars={filteredCars} />
        </Col>
        <Col md={7}>
          <Row>
            <Col md={6}>
              <h3>Brand Distribution</h3>
              <PieChart cars={filteredCars} />
            </Col>
            <Col md={6}>
              <h3>Detailed Model Distribution</h3>
              <PieChart cars={filteredCars} detailed />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <h3>Model Distribution within Brands</h3>
              <StackedBarChart cars={filteredCars} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
