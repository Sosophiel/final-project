import React from 'react';
import {Container} from 'react-bootstrap';
import Login from './Login.js';
import Register from './Register.js';
import {Routes, Route} from 'react-router-dom';


const LoginContainer = (props) => {
    return(
        <>
          <Container fluid>
          <Routes>
            <Route path="/register" element={<Register title="Register" />} />
            <Route path="/" element={<Login title="Login" />} />
            <Route path='/login' element={<Login title="Login" />} />
            
          </Routes>
          </Container>
        </>  
    )
}

export default LoginContainer