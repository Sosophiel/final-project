import {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {AppContext} from '../App';


const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {setAccessToken} = useContext(AppContext);

    useEffect(()=>{
        setMsg('')
    },[])

    const handleAction = async (title) => {
        if(title === 'Register'){
            try {
                let response = await axios.post('/register', {
                    email, password
                });
                console.log(response.data);
                setAccessToken()
                setEmail()
                setPassword()
                setMsg(response.data.msg)
                navigate('/login')
            } catch (e) {
                console.log(e.response.data);
                setMsg(e.response.data.msg)
            } 
        }
        else if (title === 'Login') {
            try {
                let response = await axios.post('/login', {
                    email, password
                });
                console.log(response.data);
                setAccessToken(response.data)
                setMsg(response.data.msg)
                navigate('/')
            } catch (e) {
                console.log(e.response.data);
                setMsg(e.response.data.msg)
            } 
        }
    }


    return(
        <>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>{props.title} </h1>
            <Card >
      <Card.Header>Please fill out the form to register</Card.Header>
      <Card.Body>
    
            <Form className="mb-3">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
   
      </Card.Body>
    </Card>      
        </>

    )
}

export default Register