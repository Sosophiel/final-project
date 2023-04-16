import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

class Events extends React.Component {
    constructor(){
        super()
        this.state = {
            events: []
        };
    }

    getEvents = async () => {
        try {
            //todo : remplacer le userid par celui connecté
            let response = await axios.get('/api/users/1/events');

            if(response.status === 200) {
                this.setState({ events: response.data });
            }
            else {
                //afficher modale erreur
            }
            console.log(response.data);

        } catch (e) {
            console.log(e.response.data);
        } 
    }

    componentDidMount() {
        this.getEvents()
    }
    render() {
        return (
            <>
            <Container fluid="md">
            <Row>
                <Col md="6" >My Events</Col>
                <Col md="6"><Button variant="primary">+ Add New Event</Button></Col>
            </Row>
            <Row>
                    <Col> 
                    <Card style={{ width: '40rem' }}>
                        <Card.Header> 
                            <Row>
                                <Col>Title</Col>
                                <Col>Start Date</Col>
                                <Col>End Date</Col>
                                <Col>Total Amount</Col>
                            </Row>
                        </Card.Header>
                        <ListGroup variant="flush">
                            {
                                this.state.events.map(event =>{
                                    return(
                                        <ListGroup.Item key={event.eventId}>
                                            <Col>{event.title}</Col>
                                            <Col>{event.startDate}</Col>
                                            <Col>{event.endDate}</Col>
                                            <Col>0</Col>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    </Card>
                </Col>
                
            </Row>
            </Container>
            </>
        );
    }
}

export default Events