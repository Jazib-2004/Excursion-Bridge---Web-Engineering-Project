import React, { useRef, useEffect, useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import "./header.css";
const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  // const {isLoggedIn, authUser} = useAuth();
  const [isOpen, setOpen] = useState(false);
  const headerRef = useRef(null);
  const stickyHeaderHandle = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderHandle();
    return window.removeEventListener("scroll", stickyHeaderHandle);
  });   

  return (
    <header className="header" ref={headerRef}>
      <div className="nav__wrapper">
        {/* --------- Logo --------- */}
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="navigation">
          {nav_links.map((item, index) => (
            <div className="nav__item" key={index}>
              <NavLink
                className={(navClass) =>
                  navClass.isActive ? "active__link" : ""
                }
                to={item.path}
              >
                {item.display}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="nav__right">
          {/* <div className="nav__btns"> */}
          <Button className="btn secondary__btn" onClick={()=>setOpen(false)}>
            <Link to="/Login">Login</Link>
          </Button>
          <Button className="btn primary__btn" onClick={()=>setOpen(false)}>
            <Link to="/register">Register</Link>
          </Button>
          {/* </div> */}
        </div>
        <span
          className="mobile__menu"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <i class="ri-menu-line"></i>
        </span>
        {isOpen && <div className="mobile__navigation" >
          {nav_links.map((item, index) => (
            <div className="nav__item" key={index} onClick={()=>setOpen(false)}>
              <NavLink
                className={(navClass) =>
                  navClass.isActive ? "active__link" : ""
                }
                to={item.path}
              >
                {item.display}
              </NavLink>
            </div>
          ))}
        </div>
        }

      </div>
    </header>
  );
};

export default Header;
