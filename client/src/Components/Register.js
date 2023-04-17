import {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container  from 'react-bootstrap/Container';
import {AppContext} from '../App';


const Register = (props) => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [country, setCountry] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();
    const {setAccessToken} = useContext(AppContext);

    useEffect(()=>{
        setMsg('')
    },[])

    const handleAction = async () => {
      try {
          let response = await axios.post('/api/users/register', {
            firstName, lastName,address, city, zipCode, country, phone, email, password
          });
          console.log(response.data);
          setAccessToken()

          navigate('/login')
      } catch (e) {
          console.log(e.response.data);
          setMsg(e.response.data.msg)
      } 

        
      }
      const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "address"){
            setAddress(value);
        }
        if(id === "city"){
          setCity(value);
      }
        if(id === "zipCode"){
            setZipCode(value);
        }
        if(id === "country"){
            setCountry(value);
        }
        if(id === "phone"){
           setPhone(value);
    }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }


    return(
        <>
        
            <h1 style={{display: 'flex', justifyContent: 'center', fontFamily: 'birthday'}}>{props.title} </h1>
            <Container fluid="md">

            
            <Card >
      <Card.Header>Please fill out the form to register</Card.Header>
      <Card.Body>
    
            <Form className="mb-3">

            <Row className="mb-3">
              <Form.Group as={Col} controlId="firstname">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" onChange={(e) =>handleInputChange(e) } />
              </Form.Group>

              <Form.Group as={Col} controlId="lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" onChange={(e) =>handleInputChange(e)}/>
              </Form.Group>
            </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={(e) =>handleInputChange(e) } />
        </Form.Group>

        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) =>handleInputChange(e)}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control onChange={(e) =>handleInputChange(e)}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control onChange={(e) =>handleInputChange(e)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="zipCode">
          <Form.Label>Zip</Form.Label>
          <Form.Control  onChange={(e) =>handleInputChange(e)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control  onChange={(e) =>handleInputChange(e)}/>
        </Form.Group>
      </Row>

      <Button variant="primary" onClick={() => handleAction()}>
        Register
      </Button>
    </Form>
   
      </Card.Body>
    </Card>      
    </Container>
        </>

    )
}

export default Register