import { Nav} from 'react-bootstrap';
import {Link } from 'react-router-dom';


const SideMenu = (props) => {
    return(
        <>
             <Nav className="flex-column">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
            </Nav>

        </>  
    )
}

export default SideMenu

