import React from "react";
import "../styles/Home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import Subtitle from "../components/Subtitle/Subtitle";
import worldImg from "../assets/images/world.png";
import SearchBar from "../components/Search-Bar/SearchBar";
import ServiceList from "../components/Services/ServiceList";
import ImageGallery from "../components/Image-Gallery/ImageGallery";
const Home = () => {
  return (
    <>
      <section>
        <Container fluid className="mx-auto">
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quas, odio totam suscipit officiis possimus deserunt tenetur
                  fugit asperiores debitis odit aspernatur consequatur assumenda
                  veniam earum, exercitationem repellat quia in nulla. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit. Quas, odio
                  totam suscipit possimus.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container fluid>
          <SearchBar />
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
              <ImageGallery />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
