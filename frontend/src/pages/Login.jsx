import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    role: "travel_agency",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
    };
    e.preventDefault();
    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        credentials,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row>
        <Col lg="8" className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    id="email"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <select name="role" id="role">
                    <option
                      value="tourist
                    "
                    >
                      Tourist
                    </option>
                    <option value="travel-agency">Travel Agency</option>
                  </select>
                </FormGroup>
                <Button className="btn secondary__btn auth__btn" type="submit">
                  Login
                </Button>
                <p>
                  Don't have an account? <Link to="/register">Create </Link>
                </p>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
