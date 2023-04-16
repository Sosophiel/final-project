import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Chart } from "react-google-charts";
import Spinner from 'react-bootstrap/Spinner';

import Stack from 'react-bootstrap/Stack';


    


export const data = [
    ["Music", "Hours per Day"],
    ["Food", 11],
    ["Clothes", 2],
    ["Flowers", 2],
    ["Decorations", 2],
    ["Other", 7],
    ];

    export const options = {
    title: "My Budget Events",
    };


class EventDetails extends React.Component {
    constructor(){
        super()
        this.state = {
            eventDetails: [],
            isLoading: false
        };
    }

    getEventDetails = async () => {
        try {
            //todo : remplacer le userid par celui connecté
            const eventId = 1
            const userId = 1
            this.setState({ isLoading: true });
            let response = await axios.get(`/api/users/${userId}/events/${eventId}/detail`);


            if(response.status === 200) {
                this.setState({ eventDetails: response.data });
            }
            else {
                //afficher modale erreur
            }
            this.setState({ isLoading: false });
            console.log(response.data);

        } catch (e) {
            console.log(e);
        } 
    }

    componentDidMount() {
        this.getEventDetails()
    }
    
    render() {

        const isLoading = this.state.isLoading;
        let spinner;
        if (isLoading) {
          spinner = <Spinner animation="border" />;
        } 

        return (
            <>
             <Row className="mt-5 mb-5">
                <Col md="6" className='h1'>My Event - </Col>
                <Col md="6"><Button variant="secondary">+ Add New Detail</Button></Col>
            </Row>
            <Row>
                <Col> 
                    <Card style={{ width: '60rem' }}>
                        <Card.Header> 
                            <Row>
                                <Col>Title</Col>
                                <Col>Budget</Col>
                                <Col>Cost</Col>
                                <Col>Deposit</Col>
                                <Col>Supplier name</Col>
                                <Col>Supplier email</Col>
                                <Col>Supplier phone</Col>
                                <Col>Action</Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {spinner}
                            <ListGroup variant="flush">
                                {
                                    this.state.eventDetails.map(event =>{
                                        return(
                                            <ListGroup.Item key={event.eventDetailsId}>
                                                <Row>
                                                <Col>{event.title}</Col>
                                                <Col>{event.budget}</Col>
                                                <Col>{event.cost}</Col>
                                                <Col>{event.deposit}</Col>
                                                <Col>{event.supplierName}</Col>
                                                <Col>{event.supplierEmail}</Col>
                                                <Col>{event.supplierPhone}</Col>
                                                <Col>
                                                    <Button variant="primary">Edit</Button>
                                                    <Button variant="danger">Delete</Button>
                                                </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6">
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}/>
                </Col>
            </Row>
            </>
        );
    }
}

export default EventDetails