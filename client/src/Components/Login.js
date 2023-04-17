import {useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {AppContext} from '../App';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {setAccessToken} = useContext(AppContext);

    useEffect(()=>{
        setMsg('')
    },[])

    const handleAction = async (title) => {

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


    return(
        <>
        <div style={{display: 'flex', justifyContent: 'center', fontFamily: 'birthday'}}>
           

            <Form>
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>       
        </>

    )
}

export default Login