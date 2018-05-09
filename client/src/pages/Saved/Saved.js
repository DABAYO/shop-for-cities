import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Styles from "./Styles.css";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";

import API from "../../utils/API";
import * as Places from "../../utils/PlacesAPI";

const Th = styled.th`
  border: 1px solid #dddddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
  &:hover {
    background-color: yellow;
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: yellow;
  }
`;

class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { cities: [] },
      city: { notes: [] },
      title: "",
      body: "",
      note: { _id: 0, title: "", body: "" },
      category: "",
      radius: 5,
      catList: []
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleNote = event => {
    event.preventDefault();
    let Obj = {
      title: this.state.title.trim(),
      body: this.state.body.trim()
    };

    console.log(`title: ${Obj.title}`);
    console.log(`body: ${Obj.body}`);
  };

  componentDidMount = () => this.loadUser();

  onCityClick = _id =>
    API.getCity(_id)
      .then(({ data: city }) => this.setState({ city }))
      .catch(err => console.log(err));

  onNoteClick = _id => console.log(`note click: ${_id}`);
  onNoteDelete = _id => console.log(`note delete: ${_id}`);

  onSearchCategory = event => {
    event.preventDefault();
    console.log(this.state);

    switch (this.state.category) {
      case "Restaurants":
        API.restaurants(this.state.city.lat, this.state.city.long)
          .then(({ data: catList }) => this.setState({ catList }))
          .catch(err => console.log(err));
        break;

      case "Hospitals":
        API.hospitals(
          this.state.city.lat,
          this.state.city.long,
          this.state.radius
        )
          .then(({ data: catList }) => this.setState({ catList }))
          .catch(err => console.log(err));
        break;

      case "Schools":
        API.schools(
          this.state.city.lat,
          this.state.city.long,
          this.state.radius
        )
          .then(({ data: catList }) => this.setState({ catList }))
          .catch(err => console.log(err));
        break;

      default:
        break;
    }
  };

  onDeleteClick = city => {
    alert("DELETE");
  };

  loadUser = () => {
    API.getUser()
      .then(({ data: user }) => {
        this.setState({
          user
        });
        console.log(this.state.user.cities);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  renderRestaurants() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>{this.state.category}</h3>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Cuisine</Th>
              <Th>Cost for 2</Th>
              <Th>Rating</Th>
              <Th>Link</Th>
              <Th>Distance</Th>
            </tr>
          </thead>
          <tbody>
            {this.state.catList.map(cat => (
              <Tr key={cat.url}>
                <Td>{cat.name}</Td>
                <Td style={{ textAlign: "center" }}>{cat.address}</Td>
                <Td style={{ textAlign: "center" }}>{cat.cuisine}</Td>
                <Td style={{ textAlign: "right" }}>${cat.cost_for_2}</Td>
                <Td style={{ textAlign: "right" }}>{cat.rating}</Td>
                <Td style={{ textAlign: "right" }}>
                  <a href={cat.url} target="_blank">
                    Link
                  </a>
                </Td>
                <Td style={{ textAlign: "right" }}>
                  {Math.floor(cat.distance * 100) / 100.0}
                </Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderHospitals() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>{this.state.category}</h3>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Link</Th>
              <Th>Distance</Th>
            </tr>
          </thead>
          <tbody>
            {this.state.catList.map(cat => (
              <Tr key={cat.url}>
                <Td>{cat.name}</Td>
                <Td style={{ textAlign: "center" }}>{cat.address}</Td>
                <Td style={{ textAlign: "right" }}>
                  <a href={cat.url} target="_blank">
                    Link
                  </a>
                </Td>
                <Td style={{ textAlign: "right" }}>
                  {Math.floor(cat.distance * 100) / 100.0}
                </Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderSchools() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>{this.state.category}</h3>
        <table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Rating</Th>
              <Th>Link</Th>
              <Th>Distance</Th>
            </tr>
          </thead>
          <tbody>
            {this.state.catList.map(cat => (
              <Tr key={cat.url}>
                <Td>{cat.name}</Td>
                <Td style={{ textAlign: "center" }}>{cat.address}</Td>
                <Td>{cat.rating}</Td>
                <Td style={{ textAlign: "right" }}>
                  <a href={cat.url} target="_blank">
                    Link
                  </a>
                </Td>
                <Td style={{ textAlign: "right" }}>
                  {Math.floor(cat.distance * 100) / 100.0}
                </Td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderCatList() {
    switch (this.state.category) {
      case "Restaurants":
        return this.renderRestaurants();
      case "Hospitals":
        return this.renderHospitals();
      case "Schools":
        return this.renderSchools();
      default:
        return <div />;
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <div>
            {this.state.city.name ? (
              <div>
                <h1>Selected City:</h1>
                <form>
                  <Input
                    onChange={() => {}}
                    value={`${this.state.city.name}, ${
                      this.state.city.state
                    }, ${this.state.city.country}`}
                  />
                  <Input
                    onChange={() => {}}
                    value={`${this.state.city.lat}:${this.state.city.long}`}
                  />
                  <label>
                    Radius:
                    <select
                      value={this.state.radius}
                      name="radius"
                      onChange={this.handleInputChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </label>

                  <br />
                  <label>
                    Category:
                    <select
                      value={this.state.category}
                      name="category"
                      onChange={this.handleInputChange}
                    >
                      <option>Choose</option>
                      <option value="Restaurants">Restaurants</option>
                      <option value="Weather">Weather</option>
                      <option value="Hospitals">Hospitals</option>
                      <option value="Schools">Schools</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </label>
                  <br />
                  <FormBtn onClick={this.onSearchCategory}>
                    Search Category
                  </FormBtn>
                </form>
              </div>
            ) : (
              <h1>{this.state.user.name}'s Saved Cities</h1>
            )}
          </div>

          <Link to="/search">
            <button>Search Cities</button>
          </Link>
        </Row>

        <Row>
          <Col size="md-3 sm-6">
            {this.state.user.cities.length ? (
              <div>
                <h3>Saved Cities</h3>
                <table>
                  <thead>
                    <tr>
                      <Th>DELETE</Th>
                      <Th>Name</Th>
                      <Th>State</Th>
                      <Th>Country</Th>
                      <Th>Population</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.user.cities.map(city => (
                      <Tr
                        key={city._id}
                        onClick={() => this.onCityClick(city._id)}
                      >
                        <Td onClick={() => this.onDeleteClick(city)}>X</Td>
                        <Td>{city.name}</Td>
                        <Td style={{ textAlign: "center" }}>{city.state}</Td>
                        <Td style={{ textAlign: "center" }}>{city.country}</Td>
                        <Td style={{ textAlign: "right" }}>
                          {city.population}
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>No Saved Cities Found</h3>
            )}
            <br />
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.body}
                onChange={this.handleInputChange}
                name="body"
                placeholder="Body (required)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.body)}
                onClick={this.handleNote}
              >
                Add/Edit Note
              </FormBtn>
            </form>
            {this.state.city.notes.length ? (
              <div>
                <h3>Saved Notes</h3>
                <table>
                  <thead>
                    <tr>
                      <Th>DELETE</Th>
                      <Th>Title</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.city.notes.map(note => (
                      <Tr
                        key={note._id}
                        onClick={() => this.onNoteClick(note._id)}
                      >
                        <Td onClick={() => this.onNoteDelete(note._id)}>X</Td>
                        <Td>{note.title}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h3>No Saved Notes</h3>
            )}
          </Col>

          <Col size="md-2 sm-1"> </Col>

          <Col size="md-3 sm-6">
            {this.state.catList.length ? (
              this.renderCatList()
            ) : (
              <h3>No Results</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
