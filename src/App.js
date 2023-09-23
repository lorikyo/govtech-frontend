import './App.css';
import { Layout, Row, Col, Input, Button, notification } from 'antd';
import React, {useState} from 'react';
import axios from 'axios';

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  minHeight: '100vh',
  padding: '50px',
};

const footerStyle = {
  textAlign: 'center',
};

function App() {
  const [isLoadingAddRestaurant, setIsLoadingAddRestaurant] = useState(false);
  const [inputRestaurant, setInputRestaurant] = useState();
  const [isLoadingGetRandomRestaurant, setIsLoadingGetRandomRestaurant] = useState(false);
  const [randomRestaurant, setRandomRestaurant] = useState();

  const handleInputOnChange = (e) => {
    const input = e.target.value;
    setInputRestaurant(input);
  };

  const handleAddRestaurant = () => {
    if (inputRestaurant) {
      setIsLoadingAddRestaurant(true);
      axios.post('http://localhost:8080/govtech/restaurant/add', { name: inputRestaurant })
        .then(value => {
          notification.success({
            message: 'Success',
            description: value.data,
            duration: 2,
          })
          setInputRestaurant();
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoadingAddRestaurant(false));
    }
  };

  const handleGetRandomRestaurant = () => {
    setIsLoadingGetRandomRestaurant(true);
      axios.get('http://localhost:8080/govtech/restaurant/getRandomRestaurant')
        .then(value => {
          setRandomRestaurant(value.data);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoadingGetRandomRestaurant(false));
  };

  return (
    <Layout>
      <Layout.Header style={headerStyle}>Govtech Restaurant</Layout.Header>
      <Layout.Content style={contentStyle}>
        <Row justify='center' gutter={[16, 16]}>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <Input placeholder='Enter restaurant' value={inputRestaurant} onChange={handleInputOnChange} disabled={isLoadingAddRestaurant} />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Button type="primary" style={{ width: '100%' }} onClick={handleAddRestaurant} loading={isLoadingAddRestaurant} disabled={!inputRestaurant}>Add Restaurant</Button>
          </Col>
        </Row>
        <Row justify='center' gutter={[16, 16]}>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <Input disabled value={randomRestaurant} />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Button style={{ width: '100%' }} onClick={handleGetRandomRestaurant} loading={isLoadingGetRandomRestaurant}>Get Random Restaurant</Button>
            </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer style={footerStyle}></Layout.Footer>
    </Layout>
  );
}

export default App;
