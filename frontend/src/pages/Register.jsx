import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import registerJmg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import axios from "axios";
const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    name: undefined,
    password: undefined,
    confirmpassword: undefined,
    role: "tourist",
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
        "http://localhost:5000/auth/signup",
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
        <Col lg="10" className="m-auto">
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerJmg} alt="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Register</h2>
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
                    type="text"
                    placeholder="Username"
                    required
                    id="name"
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
                  <input
                    type="password"
                    placeholder=" Confirm Password"
                    required
                    id="confirmpassword"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <select name="role" id="role" onChange={handleChange}>
                    <option
                      value="tourist
                    "
                    >
                      Tourist
                    </option>
                    <option value="travel_agency">Travel Agency</option>
                  </select>
                </FormGroup>
                <Button className="btn secondary__btn auth__btn" type="submit">
                  Register
                </Button>
                <p>
                  Already have an account? <Link to="/login">Login </Link>
                </p>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
