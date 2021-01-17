import React, { Component } from 'react';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
//
class Admin extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      movies: [],
      rooms: [],
      reservations: [],
      movieId: 0,
      movieTitle: '',
      movieImage: 'placeholder.jpg',
      movieCurrent: '',
      movieDescription: '',
      movieGenre: '',
      movieDuration: '',
      movieTime: '',
      roomId: 0,
      roomNumber: '',
      roomCapacity: '',
      roomType: '',
      reservation: {},
      showHideMovies: false,
      showHideRooms: false,
      showHideReservations: false,
      titleMovies: '',
      titleRooms: '',
      titleReservations: '',
      genres: [
        {
          label: '- Seleccione uno -'
        },
        {
          label: 'Acción'
        },
        {
          label: 'Animada'
        },
        {
          label: 'Aventura'
        },
        {
          label: 'Ciencia Ficción'
        },
        {
          label: 'Comedia'
        },
        {
          label: 'Drama'
        }
      ],
      types: [
        {
          label: '- Seleccione uno -'
        },
        {
          label: 'Normal'
        },
        {
          label: '3D'
        },
        {
          label: 'Imax'
        }
      ],
      showNotification: false,
      titleNotification: '',
      messageNotification: '',
    };
    //
    const requestOptions = {
      method: 'GET',
    };
    fetch('/users/logged', requestOptions)
      .then(response => response.json())
      .then(data => this.handleLogged(data));
  }
  // Init
  componentDidMount() {
    this.mounted = true;
    this.mounted && this.getMovies();
    this.mounted && this.getRooms();
    this.mounted && this.getReservations();
  }
  //
  componentWillUnmount() {
    this.mounted = false;
  }
  //
  getMovies = () => {
    fetch('/movies/all')
      .then(res => res.json())
      .then(data => this.setState({ movies: data }))
  }
  //
  getRooms = () => {
    fetch('/rooms/all')
      .then(res => res.json())
      .then(data => this.setState({ rooms: data }))
  }
  //
  getReservations = () => {
    fetch('/reservations/all')
      .then(res => res.json())
      .then(data => this.setState({ reservations: data }))
  }
  //
  handleChange(event) {
    let field = event.target.getAttribute('data-field');
    this.setState({
      [field]: event.target.value,
    });
    // console.log('handleChange', field, event.target.value);
  }
  //
  handleImage(event) {
    // console.log(event.target.files);
    var input = document.querySelector('input[type="file"]');
    var data = new FormData();
    data.append('file', input.files[0]);
    data.append('id', this.state.movieId);
    data.append('current', this.state.movieImage);
    fetch('/movies/upload', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(res => this.handleUpload(res));
    /*
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: event.target.files //JSON.stringify({ test: 'uno' })
    };
    fetch('/movies/upload', requestOptions)
      .then(response => response.json())
      .then(res => console.log(res));
      */
  }
  //
  handleUpload(res) {
    // console.log('handleUpload', res);
    this.setState({
      // showNotification: true,
      // titleNotification: res.title,
      // messageNotification: res.message,
      movieImage: res.image,
      movieCurrent: res.current
    });
  }
  //
  handleSubmit(type) {
    // let type = event.target.getAttribute('data-type');
    let method = '';
    let action = '';
    let data = {};
    switch (type) {
      case 'movies':
        data.title = this.state.movieTitle;
        data.description = this.state.movieDescription;
        data.genre = (this.state.movieGenre !== '- Seleccione uno -') ? this.state.movieGenre : '';;
        data.duration = this.state.movieDuration;
        data.time = this.state.movieTime;
        if (this.state.movieId !== 0) {
          method = 'PUT';
          action += 'update/' + this.state.movieId;
        } else {
          method = 'POST';
          action = 'new';
        }
        break;
      case 'rooms':
        data.number = this.state.roomNumber;
        data.capacity = this.state.roomCapacity;
        data.type = (this.state.roomType !== '- Seleccione uno -') ? this.state.roomType : '';
        if (this.state.roomId !== 0) {
          method = 'PUT';
          action += 'update/' + this.state.roomId;
        } else {
          method = 'POST';
          action = 'new';
        }
        break;
      default:
        break;
    }
    // console.log('handleSubmit', type, data, this.state);
    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/' + type + '/' + action, requestOptions)
      .then(response => response.json())
      .then(res => this.handleResponse(type, res));
  }
  //
  handleDelete(type, id) {
    const requestOptions = {
      method: 'DELETE',
    };
    fetch('/' + type + '/delete/' + id, requestOptions)
      .then(response => response.json())
      .then(res => this.handleResponse(type, res));
  }
  //
  handleResponse(type, res) {
    // console.log('handleResponse', type, res);
    switch (type) {
      case 'movies':
        this.setState({
          showHideMovies: !this.state.showHideMovies,
        });
        this.getMovies();
        break;
      case 'rooms':
        this.setState({
          showHideRooms: !this.state.showHideRooms,
        });
        this.getRooms();
        break;
      default:
        break;
    };
    this.setState({
      showNotification: true,
      titleNotification: res.title,
      messageNotification: res.message
    });
    //
    if (type === 'movies' && this.state.movieCurrent !== '' && this.state.movieCurrent !== 'placeholder.jpg') {
      // console.log('borrar imagen', this.state.movieCurrent);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remove: this.state.movieCurrent })
      };
      fetch('/movies/remove', requestOptions)
        .then(response => response.json())
        .then(res => this.setState({ movieCurrent: '' }));
    }
  }
  //
  handleModalShowHide(type, data) {
    switch (type) {
      case 'movies':
        this.setState({
          showHideMovies: !this.state.showHideMovies,
          titleMovies: (data === '') ? 'Agregar Pelicula' : 'Editar Pelicula',
          movieId: (data === '') ? 0 : data.id,
          movieImage: (data === '') ? 'placeholder.jpg' : data.image,
          movieTitle: (data === '') ? '' : data.title,
          movieDescription: (data === '') ? '' : data.description,
          movieGenre: (data === '') ? '' : data.genre,
          movieDuration: (data === '') ? '' : data.duration,
          movieTime: (data === '') ? '' : data.time,
        });
        break;
      case 'rooms':
        this.setState({
          showHideRooms: !this.state.showHideRooms,
          titleRooms: (data === '') ? 'Agregar Sala' : 'Editar Sala',
          roomId: (data === '') ? 0 : data.id,
          roomNumber: (data === '') ? '' : data.number,
          roomCapacity: (data === '') ? '' : data.capacity,
          roomType: (data === '') ? '' : data.type,
        });
        break;
      default:
        break;
    }
    // if (type === 'movies' && this.state.showHideMovies === true && this.state.movieCurrent !== '') {
    // console.log('borrar imagen', this.state.movieCurrent);
    // }
    // console.log('handleModalShowHide', type, data, this.state.showHideMovies);
  }
  //
  handleLogged(res) {
    if (res.status === false) {
      window.location.href = "/";
    }
    // this.setState({
    // isLogged: res.status,
    // reservationDocument: res.session.document
    // });
    // console.log('handleLogged', res);
  }
  //
  render() {
    const movies = this.state.movies;
    const rooms = this.state.rooms;
    const reservations = this.state.reservations;
    const genres = this.state.genres;
    const types = this.state.types;
    return (
      <div className="App">
        <Alert variant="dark" className="Headline">
          <h3>Administrador</h3>
        </Alert>
        <Tabs defaultActiveKey="movies" id="uncontrolled-tab-example">
          <Tab eventKey="movies" title="Peliculas">
            <Row>
              <Col className="Admin">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Imagen</th>
                      <th>Titulo</th>
                      <th>Genero</th>
                      <th>Duracion</th>
                      <th>Hora</th>
                      <th>
                        <Button variant="primary" size="sm" onClick={() => this.handleModalShowHide('movies', '')}>
                          Agregar
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  {movies.length ? (
                    <tbody>
                      {
                        movies.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td><div className="Thumbnail" style={{ backgroundImage: 'url(/img/' + item.image + ')' }}></div></td>
                              <td>{item.title}</td>
                              <td>{item.genre}</td>
                              <td>{item.duration}</td>
                              <td>{item.time}</td>
                              <td>
                                <Button variant="info" size="sm" onClick={() => this.handleModalShowHide('movies', item)}>
                                  Editar
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  ) : (
                      <tbody>
                        <tr>
                          <td colSpan="7">No hay Peliculas</td>
                        </tr>
                      </tbody>
                    )
                  }
                </Table>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="rooms" title="Salas">
            <Row>
              <Col className="Admin">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Numero</th>
                      <th>Capacidad</th>
                      <th>Tipo</th>
                      <th>
                        <Button variant="primary" size="sm" onClick={() => this.handleModalShowHide('rooms', '')}>
                          Agregar
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  {rooms.length ? (
                    <tbody>
                      {
                        rooms.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{item.number}</td>
                              <td>{item.capacity}</td>
                              <td>{item.type}</td>
                              <td>
                                <Button variant="info" size="sm" onClick={() => this.handleModalShowHide('rooms', item)}>
                                  Editar
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5">No hay Salas</td>
                        </tr>
                      </tbody>
                    )
                  }
                </Table>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="reservations" title="Reservas">
            <Row>
              <Col className="Admin">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Pelicula</th>
                      <th>Documento</th>
                      <th>Sala</th>
                      <th>Hora</th>
                    </tr>
                  </thead>
                  {reservations.length ? (
                    <tbody>
                      {
                        reservations.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.document}</td>
                              <td>{item.room}</td>
                              <td>{item.time}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5">No hay Reservas</td>
                        </tr>
                      </tbody>
                    )
                  }
                </Table>
              </Col>
            </Row>
          </Tab>
        </Tabs>
        {/* Peliculas */}
        <Modal
          show={this.state.showHideMovies}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide('movies', '')}>
            <Modal.Title>{this.state.titleMovies}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(this.state.movieId !== 0 ?
              (<Row>
                <Col xs={12}>
                  <label htmlFor="movieImage" className="Uploader">
                    <Image src={'/img/' + this.state.movieImage} fluid />
                    <small>Haz click para seleccionar la imagen de la pelicula</small>
                  </label>
                  <Form.Group>
                    <Form.File id="movieImage" name="cover" label="Imagen de la Pelicula" accept="image/*" className="d-none" onChange={this.handleImage.bind(this)} />
                  </Form.Group>
                </Col>
              </Row>)
              : (<Row>
                <Col xs={12}>
                  <Image src={'/img/' + this.state.movieImage} fluid />
                  <p className="text-center">Para seleccionar la imagen, primero debe agregar la pelicula</p>
                </Col>
              </Row>)
            )}
            <Form>
              <Row>
                <Col sm={7}>
                  <Form.Group controlId="moviesTitle">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" data-field="movieTitle" defaultValue={this.state.movieTitle} onChange={this.handleChange.bind(this)} placeholder="Titulo" />
                  </Form.Group>
                </Col>
                <Col sm={5}>
                  <Form.Group controlId="moviesGenre">
                    <Form.Label>Genero</Form.Label>
                    <Form.Control as="select" data-field="movieGenre" defaultValue={this.state.movieGenre} onChange={this.handleChange.bind(this)}>
                      {genres.map((item, idx) => {
                        return (
                          <option key={idx} value={item.label}>{item.label}</option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="moviesDescription">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={5} data-field="movieDescription" defaultValue={this.state.movieDescription} onChange={this.handleChange.bind(this)} placeholder="Descripcion" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="moviesDuration">
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control type="text" data-field="movieDuration" defaultValue={this.state.movieDuration} onChange={this.handleChange.bind(this)} placeholder="Duracion (HH:MM:SS)" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="moviesTime">
                    <Form.Label>Horarios</Form.Label>
                    <Form.Control type="time" data-field="movieTime" defaultValue={this.state.movieTime} onChange={this.handleChange.bind(this)} placeholder="Horario" className="text-center" />
                  </Form.Group>
                </Col>
                <Col xs={6} className="text-left">
                  {(this.state.movieId !== 0 ?
                    (<Button variant="danger" type="button" onClick={() => this.handleDelete('movies', this.state.movieId)}>
                      Eliminar
                    </Button>)
                    : ('')
                  )}
                </Col>
                <Col xs={6} className="text-right">
                  <Button variant="success" type="button" onClick={() => this.handleSubmit('movies', this.state.movieId)}>
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        {/* Salas */}
        <Modal
          size="sm"
          show={this.state.showHideRooms}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide('rooms', '')}>
            <Modal.Title>{this.state.titleRooms}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xs={12}>
                  <Form.Group controlId="roomsNumber">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control type="text" data-field="roomNumber" defaultValue={this.state.roomNumber} onChange={this.handleChange.bind(this)} placeholder="Numero" />
                  </Form.Group>
                  <Form.Group controlId="roomsCapacity">
                    <Form.Label>Capacidad</Form.Label>
                    <Form.Control type="number" data-field="roomCapacity" defaultValue={this.state.roomCapacity} onChange={this.handleChange.bind(this)} placeholder="Capacidad" />
                  </Form.Group>
                  <Form.Group controlId="roomsType">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control as="select" data-field="roomType" defaultValue={this.state.roomType} onChange={this.handleChange.bind(this)}>
                      {types.map((item, idx) => {
                        return (
                          <option key={idx} value={item.label}>{item.label}</option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={6} className="text-left">
                  <Button variant="danger" type="button" onClick={() => this.handleDelete('rooms', this.state.roomId)}>
                    Eliminar
                  </Button>
                </Col>
                <Col xs={6} className="text-right">
                  <Button variant="success" type="button" onClick={() => this.handleSubmit('rooms', this.state.roomId)}>
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        {/* Notificaciones */}
        <div
          style={{
            position: 'fixed',
            bottom: '5px',
            right: '5px',
          }}
        >
          <Toast onClose={() => this.setState({ showNotification: false })} show={this.state.showNotification} delay={5000} autohide>
            <Toast.Header>
              <strong className="mr-auto">{this.state.titleNotification}</strong>
            </Toast.Header>
            <Toast.Body>{this.state.messageNotification}</Toast.Body>
          </Toast>
        </div>
      </div >
    );
  }
}

export default Admin;