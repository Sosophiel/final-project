import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


class Events extends React.Component {
    constructor(){
        super()
        this.state = {
            events: [],
            isLoading: false,
            showModale : false,
            showConfirmModale : false,
            selectedEvent : {eventId : 0}
        };
    }

    getEvents = async () => {
        try {
            //todo : remplacer le userid par celui connecté
            this.setState({ isLoading: true });
            let response = await axios.get('/api/users/1/events');

            if(response.status === 200) {
                this.setState({ events: response.data });
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
        this.getEvents()
    }

    handleClose = () => this.setState({showModale:false});

    handleShow = (eventId) => {
        if(eventId !== 0 ) {
            const selectedEvent = this.state.events.filter(event => event.eventId === eventId)[0];
            this.setState({showModale:true, selectedEvent:selectedEvent})
        }
        else {
            this.setState({showModale:true, selectedEvent:{eventId:0}})
        }
    };

    handleShowConfirm = (eventId) => this.setState({showConfirmModale :true})

    handleCloseConfirm = () => this.setState({showConfirmModale:false});

    handleChange = (e) => {
        let selectedEvent = this.state.selectedEvent
        //if(selectedEvent) {
            selectedEvent[e.target.name] = e.target.value;
            this.setState({selectedEvent :selectedEvent})
        //}
    }

    handleSave = async () => {
        try {
            //event.preventDefault();

            //todo : remplacer le userid par celui connecté
            this.setState({ isLoading: true });
            console.log(this.state.selectedEvent)

            let selectedEvent = this.state.selectedEvent

            if(selectedEvent.eventId !== 0) {
                const data = {
                    title: selectedEvent.title,
                    startDate: selectedEvent.startDate,
                    endDate: selectedEvent.endDate
                }
    
                await axios.put(`/api/users/1/events/${selectedEvent.eventId}` , data);
            }
            else {
                
                const data = {
                    title: this.state.selectedEvent.title,
                    startDate: this.state.selectedEvent.startDate,
                    endDate: this.state.selectedEvent.endDate,
                    userId: 1
                }
                //console.log(data)
                await axios.post(`/api/users/1/events` , data);
            }
            this.handleClose();
 
            this.setState({ isLoading: false, selectedEvent: {eventId:0} });

            await this.getEvents()

        } catch (e) {
            console.log(e);
        } 
    }

    handleDeleteConfirm = async (eventId) => {
        this.handleShowConfirm(eventId);
    }

    handleDelete = async (event) => { 

    }

    render() {

        const isLoading = this.state.isLoading;
        const selectedEvent = this.state.selectedEvent
        let spinner;
        let label = selectedEvent.eventId !== 0 ? 'Edit Event' : 'New Event'
        if (isLoading) {
          spinner = <Spinner animation="border" />;
        } 

        return (
            <>

    <Modal show={this.state.showConfirmModale} onHide={()=>this.handleCloseConfirm()}>
        <Modal.Header closeButton>
          <Modal.Title>Delete event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this event ?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={()=>this.handleCloseConfirm()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>this.handleCloseConfirm()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal show={this.state.showModale} onHide={()=>this.handleClose()}>
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
              <Form.Label>Start date</Form.Label>
              <Form.Control type="date" defaultValue={selectedEvent?.startDate} name='startDate' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="c">
              <Form.Label>End date</Form.Label>
              <Form.Control type="date" defaultValue={selectedEvent?.endDate} name='endDate' onChange={(e)=> this.handleChange(e)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> this.handleClose()}>Close </Button>
          <Button variant="primary" onClick={()=> this.handleSave()}>  Save Changes</Button>
        </Modal.Footer>
      </Modal>

            <Row className="mt-5 mb-5">
                <Col md="6" className='h1'>My Events</Col>
                <Col md="6"><Button variant="secondary" onClick={()=> this.handleShow(0)}>+ Add New Event</Button></Col>
            </Row>
            <Row>
                    <Col> 
                    <Card style={{ width: '60rem' }}>
                        <Card.Header> 
                            <Row>
                                <Col md="3">Title</Col>
                                <Col md="2">Start Date</Col>
                                <Col md="2">End Date</Col>
                                <Col md="2">Total Amount</Col>
                                <Col md="3">Action</Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {spinner}
                            <ListGroup variant="flush">
                                {
                                    this.state.events.map(event =>{
                                        return(
                                            <ListGroup.Item key={event.eventId} id="details">
                                                <Row>
                                                <Col md="3">{event.title}</Col>
                                                <Col md="2">{event.startDate}</Col>
                                                <Col md="2">{event.endDate}</Col>
                                                <Col md="2">0</Col>
                                                <Col md="3">
                                                    <Link className="me-2" to={`/events/${event.eventId}/detail`}>Details</Link>
                                                    <Button variant="primary" className="me-2" id="btnedit" onClick={()=> this.handleShow(event.eventId)}>Edit</Button>
                                                    <Button variant="danger" className="me-2" id="btndelete" onClick={()=> this.handleDeleteConfirm(event.eventId)}>Delete</Button>
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
                
            </Row>
            </>
        );
    }
}

export default Events