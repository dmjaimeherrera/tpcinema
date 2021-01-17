import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import logo from '../logo.svg';
import './App.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
//
function UserLoginButton(props) {
  return (
    <Nav>
      <Link to={'./ingresar'}>
        <>
          <Button variant="success">Ingresar</Button>{' '}
        </>
      </Link>
    </Nav>
  );
}
//
function UserLogoutButton(props) {
  return (
    <Nav>
      <>
        <Button variant="danger" onClick={props.onClick}>Cerrar Sesion</Button>{' '}
      </>
    </Nav>
  );
}
//
function AdminButton(props) {
  return (
    <Nav>
      <Link to={'./admin'}>
        <>
          <Button variant="secondary">Administrador</Button>{' '}
        </>
      </Link>
    </Nav>
  );
}
//
class App extends Component {
  //
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: false,
      isAdmin: false
    };
    //
    this.handleLogged();
  }
  //
  handleLogged() {
    const requestOptions = {
      method: 'GET',
    };
    fetch('/users/logged', requestOptions)
      .then(response => response.json())
      .then(data => this.handleResponse('logged', data));
  }
  //
  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }
  //
  handleLogoutClick() {
    const requestOptions = {
      method: 'GET',
    };
    fetch('/users/logout', requestOptions)
      .then(response => response.json())
      .then(data => this.handleResponse('logout', data));
    // this.setState({ isLoggedIn: false });
  }
  //
  handleResponse(action, res) {
    // console.log('handleResponse', action, res);
    if (action === 'logged' && res.status === true) {
      this.setState({
        isLoggedIn: true
      });
      if (res.session.document === '111222333') {
        this.setState({
          isAdmin: true
        });
      }
    } else if (action === 'logout' && res === true) {
      // window.location.reload(true);
      window.location.href = "/";
    }
  }
  //
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let userButton;
    if (isLoggedIn) {
      userButton = <UserLogoutButton onClick={this.handleLogoutClick} />;
    } else {
      userButton = <UserLoginButton onClick={this.handleLoginClick} />;
    }
    const isAdmin = this.state.isAdmin;
    let adminButton;
    if (isAdmin) {
      adminButton = <AdminButton />;
      // } else {
      // userButton = <UserLoginButton onClick={this.handleLoginClick} />;
    }
    const App = () => (
      <Container className="Main">
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand href="/">TP Cinema</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto Menu">
              <Nav>
                <Link to={'./'}>
                  <>
                    <Button variant="primary">Inicio</Button>{' '}
                  </>
                </Link>
              </Nav>
              <Nav>
                <Link to={'./peliculas'}>
                  <>
                    <Button variant="primary">Peliculas</Button>{' '}
                  </>
                </Link>
              </Nav>
              {userButton}
              {adminButton}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/peliculas' component={Movies} />
              <Route path='/ingresar' component={Login} />
              <Route path='/registro' component={Register} />
              <Route path='/admin' component={Admin} />
            </Switch>
          </Col>
        </Row>
      </Container>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. TEST
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
