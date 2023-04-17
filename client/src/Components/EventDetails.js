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
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
            isLoading: false,
            show : false,
            selectedEventDetail : null
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

    handleClose = () => this.setState({show:false});

    handleShow = (eventDetailsId) => {
        if(eventDetailsId !== 0 ) {
            const selectedEventDetail = this.state.eventDetails.filter(event => event.eventDetailsId === eventDetailsId)[0];
            this.setState({show:true, selectedEventDetail:selectedEventDetail})
        }
        else {
            this.setState({show:true, selectedEvent:null})
        }
    };

    handleChange = (e) => {
        let selectedEventDetail = this.state.selectedEventDetail
        if(selectedEventDetail) {
            selectedEventDetail[e.target.name] = e.target.value;
            this.setState({selectedEvent :selectedEventDetail})
        }
    }

    handleSave = async (event) => {
        try {
            //event.preventDefault();

            //todo : remplacer le userid par celui connecté
            this.setState({ isLoading: true });
            console.log(this.state.selectedEventDetail)

            let selectedEventDetail = this.state.selectedEventDetail

            if(selectedEventDetail) {
                const data = {
                    title: selectedEventDetail.title,
                    budget: selectedEventDetail.budget,
                    cost: selectedEventDetail.cost,
                    deposit: selectedEventDetail.deposit,
                    supplierName: selectedEventDetail.supplierName,
                    supplierPhone: selectedEventDetail.supplierPhone,
                    supplierEmail: selectedEventDetail.supplierEmail
                }
    
                await axios.put(`/api/users/1/events/${selectedEventDetail.eventId}/detail/${selectedEventDetail.eventDetailsId}` , data);
            }
            else {
                

                
                // const data = {
                //     title: this.state.selectedEvent.title,
                //     startDate: this.state.selectedEvent.startDate,
                //     endDate: this.state.selectedEvent.endDate,
                //     userId: 1
                // }
    
                // await axios.post(`/api/users/1/events` , data);
            }
            this.handleClose();
 
            this.setState({ isLoading: false, selectedEvent: null });

   

        } catch (e) {
            console.log(e);
        } 
    }
    
    render() {

        const isLoading = this.state.isLoading;
        const selectedEvent = this.state.selectedEventDetail
        let spinner;
        let label = selectedEvent ? 'Edit Event' : 'New Event'
        if (isLoading) {
          spinner = <Spinner animation="border" />;
        } 

        return (
            <>
             <Modal show={this.state.show} onHide={()=>this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="a">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" defaultValue={selectedEvent?.title} name='title' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="b">
              <Form.Label>Budget</Form.Label>
              <Form.Control type="number" defaultValue={selectedEvent?.budget} name='budget' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="c">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="number" defaultValue={selectedEvent?.cost} name='cost' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="a">
              <Form.Label>Deposit</Form.Label>
              <Form.Control type="number" defaultValue={selectedEvent?.deposit} name='deposit' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="b">
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control type="text" defaultValue={selectedEvent?.supplierName} name='supplierName' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="b">
              <Form.Label>Supplier Email</Form.Label>
              <Form.Control type="email" defaultValue={selectedEvent?.supplierEmail} name='supplierEmail' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="b">
              <Form.Label>Supplier Phone</Form.Label>
              <Form.Control type="number" defaultValue={selectedEvent?.supplierPhone} name='supplierPhone' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> this.handleClose()}>Close </Button>
          <Button variant="primary" onClick={(e)=> this.handleSave(e)}> Save Changes</Button>
        </Modal.Footer>
      </Modal>


             <Row className="mt-5 mb-5">
                <Col md="6" className='h1'>My Event - </Col>
                <Col md="6"><Button variant="secondary" onClick={()=> this.handleShow(0)}>+ Add New Detail</Button></Col>
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
                                                    <Button variant="primary" className="me-2" onClick={()=> this.handleShow(event.eventDetailsId)}>Edit</Button>
                                                    <Button variant="danger" className="me-2">Delete</Button>
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