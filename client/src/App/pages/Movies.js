import React, { Component } from 'react';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//
class Movies extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      all: [],
      movies: [],
      rooms: [],
      genres: [
        {
          label: '- Todas -'
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
        },
      ],
      showHide: false,
      isLogged: false,
      reservationMovie: '',
      reservationDocument: '',
      reservationRoom: '',
      reservationTime: '',
      category: '- Todas -'
    };
    //
    const requestOptions = {
      method: 'GET',
    };
    fetch('/users/logged', requestOptions)
      .then(response => response.json())
      .then(data => this.handleLogged(data));
  }
  //
  componentDidMount() {
    this.mounted = true;
    this.mounted && this.getRooms();
    this.mounted && this.getMovies();
  }
  //
  componentWillUnmount() {
    this.mounted = false;
  }
  //
  getRooms = () => {
    fetch('/rooms/all')
      .then(res => res.json())
      .then(data => this.handleRooms(data))
  }
  //
  getMovies = () => {
    fetch('/movies/all')
      .then(res => res.json())
      .then(data => this.handleMovies(data))
  }
  //
  handleRooms(data) {
    this.mounted && this.setState({ rooms: data })
  }
  //
  handleMovies(data) {
    this.mounted && this.setState({ all: data });
    this.handleFilter('- Todas -');
  }
  //
  handleFilter(genre) {
    let list = [];
    if (genre === '- Todas -') {
      list = this.state.all
    } else {
      this.state.all.forEach(element => {
        if (genre === element.genre) {
          list.push(element);
        }
      });
    };
    this.setState({ movies: list, category: genre });
  }
  //
  handleSubmit() {
    // console.log('handleSubmit', this.state);
    let data = {
      document: this.state.reservationDocument,
      title: this.state.reservationMovie,
      room: this.state.reservationRoomNumber,
      time: this.state.reservationTime
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/reservations/new', requestOptions)
      .then(response => response.json())
      .then(res => this.setState({ showHide: !this.state.showHide }));
  }
  //
  handleModalShowHide(data) {
    let randomItem = this.state.rooms[Math.floor(Math.random() * this.state.rooms.length)];
    // console.log('handleModalShowHide', data, randomItem);
    this.setState({
      showHide: !this.state.showHide,
      reservationMovie: data.title,
      reservationRoomId: randomItem.id,
      reservationRoomNumber: randomItem.number,
      reservationTime: data.time,
    });
  }
  //
  handleLogged(res) {
    this.setState({
      isLogged: res.status,
      reservationDocument: res.session.document
    });
    // console.log('handleLogged', res);
  }
  //
  render() {
    const genres = this.state.genres;
    const movies = this.state.movies;
    const logged = this.state.isLogged;
    return (
      <div className="App">
        <Alert variant="primary" className="Headline">
          <Dropdown className="float-right">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Filtro de Categorias / <small>Viendo:</small> {this.state.category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {genres.map((item, idx) => {
                return (
                  <Dropdown.Item key={idx} onClick={() => this.handleFilter(item.label)}>{item.label}</Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <h3>Peliculas</h3>
        </Alert>
        {movies.length ? (
          <div>
            {movies.map((item, idx) => {
              return (
                <Row key={idx} className="Pelicula">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col xs={4}>
                            <Image src={'/img/' + item.image} fluid />
                          </Col>
                          <Col xs={8}>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                              {item.description}
                            </Card.Text>
                            <h6 className="text-right">
                              <Badge variant="secondary">Duración: {item.duration}</Badge>&nbsp;<Badge variant="warning">Categoria: {item.genre}</Badge>
                            </h6>
                            {(logged ?
                              (<Button variant="success" size="sm" className="float-right" onClick={() => this.handleModalShowHide(item)}>
                                Reservar: {item.time}
                              </Button>)
                              : ('')
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              );
            })}
          </div>
        ) : (
            <Row>
              <Col>
                <h2>No hay Peliculas Disponibles</h2>
              </Col>
            </Row>
          )
        }
        {/* Salas */}
        <Modal
          size="sm"
          show={this.state.showHide}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton onClick={() => this.handleModalShowHide('')}>
            <Modal.Title>Generar Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <h4><small>Pelicula:</small> {this.state.reservationMovie}</h4>
                <hr></hr>
                <h4><small>Documento:</small> {this.state.reservationDocument}</h4>
                <hr></hr>
                <h4><small>Sala:</small> {this.state.reservationRoomNumber}</h4>
                <hr></hr>
                <h4><small>Hora:</small> {this.state.reservationTime}</h4>
                <hr></hr>
              </Col>
              <Col xs={12} className="text-right">
                <Button variant="success" type="button" onClick={() => this.handleSubmit()}>
                  Confirmar
                  </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Movies;