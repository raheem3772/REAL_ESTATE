import React, { useState } from "react";
import "./Content.css";
import CardComp from "../CardComp";
import { Modal } from "react-bootstrap";
const Content = ({ token }) => {
  const [propertyModal, setPropertyModal] = useState(false);
  return (
    <div>
      <div className="contentMain">
        <input
          type="search"
          className="col-md-4 searchInput"
          placeholder="Search..."
        />
      </div>
      <div className="row">
        <div className=" contentdiv">
          <div className=" col-md-6 shapeDiv  ">
            <h2 className=" h1Tag">Real Estate</h2>
            <div className="pDiv">
              <p className="text-black  text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s. Lorem Ipsum is simply dummy text of
                the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s.
              </p>
              <button className="btnHover">Learn more</button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 container ">
        <Modal show={propertyModal} onHide={() => setPropertyModal(false)}>
          <Modal.Header className="bg-light" closeButton>
            <Modal.Title>Add Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-2">
              <strong>Title</strong>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Type here"
              />
            </div>
            <div className="my-2">
              <strong>Location</strong>
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Type here"
              />
            </div>
            <div className="my-2">
              <strong>Price</strong>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="$"
              />
            </div>
            <div className="my-2">
              <strong>Size</strong>
              <input
                type="number"
                className="form-control"
                name="size"
                placeholder="Type here"
              />
            </div>
            <div className="my-2">
              <strong>Bedrooms</strong>
              <input
                type="text"
                className="form-control"
                name="bedrooms"
                placeholder="Type here"
              />
            </div>
            <div className="my-2">
              <strong>Type</strong>
              <select type="text" className="form-select" name="type">
                <option>Select a option</option>
                <option value="buy">Sell</option>
                <option value="rent">Rent</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <button
              className="btnHover bg-dark "
              onClick={() => setPropertyModal(false)}
            >
              Cancel
            </button>
            <button className="btnHover">Save</button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex justify-content-center">
          {token !== null ? (
            <button
              className="btnHover"
              onClick={() => {
                setPropertyModal(true);
              }}
            >
              Add Property
            </button>
          ) : null}
        </div>
        {/* <CardComp title="5 Marla" price="90000" location="Main Market Lahore" /> */}
      </div>
    </div>
  );
};

export default Content;
