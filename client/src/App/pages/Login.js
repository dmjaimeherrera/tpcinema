import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: '',
      password: '',
      showHide: false,
      loginStatus: false,
      loginTitle: '',
      loginMessage: '',
      isLogged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //
  // componentDidMount() {
    // this.getList();
  // }
  //
  handleChange(event) {
    this.setState({
      [event.target.getAttribute('data-field')]: event.target.value,
    });
  }
  //
  handleSubmit(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document: this.state.document, password: this.state.password })
    };
    fetch('/users/login', requestOptions)
      .then(response => response.json())
      .then(data => this.handleResponse(data));
    event.preventDefault();
  }
  //
  handleResponse(res) {
    if (res === false) {
      this.setState({
        loginStatus: false,
        loginTitle: 'Error',
        loginMessage: 'Datos Invalidos'
      })
    } else {
      this.setState({
        loginStatus: true,
        loginTitle: 'Bienvenido',
        loginMessage: 'Ingreso Exitoso'
      })
      //this.state.document
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: this.state.document })
      };
      fetch('/jwt', requestOptions)
        .then(response => response.json())
        .then(data => this.handleLogin(data));
    }
    // console.log('handleResponse', res);
    this.handleModalShowHide();
  }
  //
  handleLogin(res){
    // console.log('handleLogin', res);
    this.setState({isLogged: true});
  }
  //
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
    if(this.state.isLogged === true){
      // window.location.reload(true);
      window.location.href = "/peliculas";
    }
    // console.log('Status:', this.state.registerStatus, 'Modal:', this.state.showHide);
  }
  //
  render() {
    // const { list } = this.state;
    // value={this.state.document}
    return (
      <div className="App">
        <Alert variant="success" className="Headline">
          <h3>Ingresar Cinema</h3>
        </Alert>
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="loginDocument">
                <Form.Label>Cedula</Form.Label>
                <Form.Control type="text" data-field="document" onChange={this.handleChange} placeholder="Digite su Cedula" className="text-center" required />
                <Form.Text className="text-muted">
                  Escriba su Cedula sin signos de puntuacion.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="loginPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" data-field="password" onChange={this.handleChange} placeholder="Digite su Contraseña" className="text-center" required />
              </Form.Group>
              <Button variant="success" type="submit" className="SignupBtn">
                Ingresar
              </Button>
              <p>
                Si usted aun no es un usuario, <Link to={'./registro'}>registrese aqui.</Link>
              </p>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Modal
          size="sm"
          show={this.state.showHide}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>{this.state.loginTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.loginMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.handleModalShowHide()}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Login;