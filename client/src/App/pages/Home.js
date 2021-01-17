import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//
class Home extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      list: []
    };
  }
  //
  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.getMovies();
    }
  }
  //
  componentWillUnmount() {
    this.mounted = false;
  }
  //
  getMovies = () => {
    fetch('/movies/all')
      .then(res => res.json())
      .then(list => this.setState({ list }))
  }
  //
  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <Alert variant="primary" className="Headline">
          <h3>Cartelera</h3>
        </Alert>
        {list.length ? (
          <Row>
            {list.map((item, idx) => {
              if (idx < 6) {
                return (
                  <Col key={idx} sm={6} className="Thumb">
                    <Card>
                      <Card.Img variant="top" src={'/img/' + item.image} />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })}
          </Row>
        ) : (
            <Row>
              <Col>
                <h2>No hay Peliculas Disponibles</h2>
              </Col>
            </Row>
          )
        }
        <Row>
          <Col>
            <Link to={'./peliculas'}>
              <>
                <Button variant="info">Ver todas las Peliculas</Button>{' '}
              </>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;