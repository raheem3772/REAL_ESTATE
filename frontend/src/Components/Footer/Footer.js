import React from "react";
import "./Footer.css";
import { Link, NavLink } from "react-router-dom";
const Footer = ({ agencyMainValidation }) => {
  const userId = localStorage.getItem("user_Id");
  return (
    <footer
      className="bg-dark text-center text-white"
      style={{ position: "relative", bottom: 0, width: "100%" }}
    >
      <div className="container p-4">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fa fa-facebook"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fa fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fa fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fa fa-instagram"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fa fa-linkedin "></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <i className="fa fa-github"></i>
          </a>
        </section>

        {/* <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example21"
                    className="form-control"
                  />
                  <label className="form-label" for="form5Example21">
                    Email address
                  </label>
                </div>
              </div>

              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section> */}

        <section className="">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Real Home Estate</h5>

              <p>
                A great plateform to buy, sell and rent your properties without
                any agent or commisions.
              </p>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                {agencyMainValidation !== null &&
                agencyMainValidation.includes(userId) ? (
                  <>
                    <li className="my-3">
                      <NavLink
                        to="profile"
                        className="text-white text-decoration-none  "
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="myproperty"
                        className="text-white text-decoration-none  "
                      >
                        My Properties
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="properties"
                        className="text-white text-decoration-none  "
                      >
                        Properties
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="message"
                        className="text-white text-decoration-none  "
                      >
                        Messages
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="reviews"
                        className="text-white text-decoration-none  "
                      >
                        Review
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="my-3">
                      <NavLink
                        to="profile"
                        className="text-white text-decoration-none   "
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="myproperty"
                        className="text-white text-decoration-none  "
                      >
                        Properties
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="properties"
                        className="text-white text-decoration-none  "
                      >
                        Agencies
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="message"
                        className="text-white text-decoration-none  "
                      >
                        Fav Property
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="reviews"
                        className="text-white text-decoration-none  "
                      >
                        Blogs
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center justify-content-center ">
              <h5 className="text-uppercase mb-4">Contact Details</h5>
              <p className="text-center">
                <b> Location: </b>
                Al rehman garden phase 4
              </p>
              <p className="text-center">
                <b> Email: </b>

                <span className="text-primary">info@realhomeestate.com</span>
              </p>
              <p className="text-center">
                <b> Tel: </b>
                (+92) 300 3423992 <br />
              </p>
            </div>
          </div>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="/">
          RealHomeEstate.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
