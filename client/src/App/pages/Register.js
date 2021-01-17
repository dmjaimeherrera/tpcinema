import React, { Component } from 'react';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//
class Register extends Component {
  //
  constructor(props) {
    super(props);
    this.state = {
      document: '',
      mobile: '',
      email: '',
      emailMessage: '',
      password: '',
      passwordMessage: '',
      showHide: false,
      registerStatus: false,
      registerTitle: '',
      registerMessage: '',
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
    event.preventDefault();
    if (this.state.email.indexOf('@gmail.com') === -1) {
      this.setState({
        emailMessage: 'El correo debe ser Gmail (correo@gmail.com)'
      });
    } else if (this.state.password.length < 8) {
      this.setState({
        passwordMessage: 'La contraseña debe ser minimo de 8 caracteres'
      });
    } else {
      this.setState({
        emailMessage: '',
        passwordMessage: ''
      });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: this.state.document, mobile: this.state.mobile, email: this.state.email, password: this.state.password })
      };
      fetch('/users/new', requestOptions)
        .then(response => response.json())
        .then(data => this.handleResponse(data));
    }
  }
  //
  handleResponse(res) {
    if (typeof res.error !== 'undefined') {
      this.setState({
        registerStatus: false,
        registerTitle: 'Error',
        registerMessage: 'Documento ya registrado'
      })
    } else {
      this.setState({
        registerStatus: true,
        registerTitle: 'Exito',
        registerMessage: 'Registro Exitoso'
      })
      //
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: this.state.document, password: this.state.password })
      };
      fetch('/users/login', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ isLogged: true }));
    }
    // console.log('handleResponse', res);
    this.handleModalShowHide();
  }
  //
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
    // console.log('Status:', this.state.registerStatus, 'Modal:', this.state.showHide);
    if (this.state.isLogged === true) {
      // window.location.reload(true);
      window.location.href = "/peliculas";
    }
  }
  //
  render() {
    return (
      <div className="App">
        <Alert variant="info" className="Headline">
          <h3>Registro Cinema</h3>
        </Alert>
        <Row>
          <Col></Col>
          <Col sm={8}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="registerDocument">
                    <Form.Label>Cedula</Form.Label>
                    <Form.Control type="text" data-field="document" onChange={this.handleChange} placeholder="Digite su Cedula (sin puntos)" className="text-center" required />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="registerMobile">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control type="number" data-field="mobile" onChange={this.handleChange} placeholder="Digite su Celular" className="text-center" required />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="registerEmail">
                    <Form.Label>Correo Electronico</Form.Label>
                    <Form.Control type="email" data-field="email" onChange={this.handleChange} placeholder="Digite su Correo" className="text-center" required />
                    <Form.Text className="text-danger">
                      {this.state.emailMessage}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="registerPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" data-field="password" onChange={this.handleChange} placeholder="Digite su Contraseña" className="text-center" required />
                    <Form.Text className="text-danger">
                      {this.state.passwordMessage}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="info" type="submit" className="RegisterBtn">
                Registro
              </Button>
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
            <Modal.Title>{this.state.registerTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.registerMessage}</Modal.Body>
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

export default Register;