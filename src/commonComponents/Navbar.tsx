// // import logo from '../../src/logo.svg'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import narutoIcon from '../assets/images/naruto-119.svg'
function NavbarComponent() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page
  };
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: 'black',color:'white' }}>
        <Container fluid>
          <Navbar.Brand onClick={handleLogoClick} style={{width:'120px'}}>
            <img src={narutoIcon} alt="Naruto Icon" style={{ width: '40px', height: '40px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav.Link href="#" style={{ width: '200px' }}>
              Address hyderabad ,500081 
              <span style={{display:'block'}}><FontAwesomeIcon icon={['fas', 'location-dot']} />Update Location</span>
            </Nav.Link>
            <Form className="d-flex flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav style={{ color: 'white' }}>
              <NavDropdown title="Lang" id="navbarScrollingDropdown" style={{ backgroundColor: 'yellow', color: 'white' }}>
                <NavDropdown.Item href="#action3" style={{ color: 'white' }}>Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4" style={{ color: 'black' }}>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5" style={{ color: 'black' }}>
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action2" style={{ color: 'white' }}>Link</Nav.Link>
              <Nav.Link href="#" className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600' >
                login
              </Nav.Link>
            </Nav>
            <div>
              <FontAwesomeIcon icon={['fas', 'cart-shopping']} style={{ color: 'white' }} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavbarComponent;