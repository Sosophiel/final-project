import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import Header from './Header.js'
import SideMenu from './SideMenu.js'
import Reports from './Reports.js';
import Events from './Events.js';
import EventDetails from './EventDetails.js';
import {Routes, Route} from 'react-router-dom';


const DefaultContainer = (props) => {
    return(
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
}

export default DefaultContainer