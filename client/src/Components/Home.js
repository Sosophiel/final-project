import {useState, useEffect, useContext} from 'react';
import {AppContext} from '../App';
//import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";


const Home = (props) => {
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState('');
    const {accessToken} = useContext(AppContext)

    useEffect(()=>{
        console.log('accessToken=>', accessToken);
        try {
            const decode = jwt_decode(accessToken.accessToken)
            console.log(decode)
        } catch (e) {
            
        }
    },[])

    useEffect(()=>{
        const getUsers = async() => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
                setMsg('')     
            } catch (e) {
                console.log(e.response.data);
                setMsg(e.response.data.msg)
            }
        }
        getUsers()
    }, [])

    return(
        <>
         <h1 style={{display: 'flex', justifyContent: 'center'}}> Your Event Budget Tracker</h1>

    <Container className="my -4">
        <Stack className="me-auto">
            <h1> Budgets </h1>
            <input/>
            <Button variant="primary">Add Budget</Button>
            <Button variant="outline-primary">Add Expense </Button>
        </Stack>

    </Container>        
        </>
    )
}



export default Home