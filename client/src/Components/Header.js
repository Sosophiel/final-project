
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';

const Header = (props) => {
    return(
        <>
             <Navbar bg="light" expand="lg" id="navb">
              <Container>
                <Navbar.Brand href="#home">My Event Budget Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto"></Nav>
                  <Nav>
                    <NavDropdown title="My profil" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">My Informations</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </>  
    )
}

export default Header