
import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import Header from './Components/Header.js'
import SideMenu from './Components/SideMenu.js'
import Home from './Components/Home.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import Reports from './Components/Reports.js';
import Events from './Components/Events.js';
import EventDetails from './Components/EventDetails.js';
import {Routes, Route} from 'react-router-dom';
import {useState, createContext} from 'react';
import './App.css';

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState();

    const LoginContainer = () => (
      <Container fluid>
        <Route exact path="/" element={<Login title="Login" />} />
        <Route path='/login' element={<Login title="Login" />} />
        <Route path="/register" element={<Register title="Register" />} />
      </Container>
    )


    const DefaultContainer = () => (
      <>
        <Header/>
        <Container fluid>
          <Row>
            <Col md={1} className="bg-light text-white">
              <SideMenu/>
            </Col>
            <Col md={11}>
              <Routes>
                <Route path="/reports" element={<Reports title="Reports" />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:eventId/detail" element={<EventDetails />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </>
    )

  return (


    
    <div>
      <AppContext.Provider value={{accessToken, setAccessToken}}>
      <Header/>
      <Container fluid>
        <Row>
          <Col md={1} className="bg-light text-white">
            <SideMenu/>
          </Col>
          <Col md={11}>
            <Routes>
              <Route exact path="/(login)" element={LoginContainer()}/>
              <Route element={DefaultContainer()}/>
            </Routes>
          </Col>
        </Row>
      </Container>
      </AppContext.Provider>
    </div>
  );
}

export default App;
