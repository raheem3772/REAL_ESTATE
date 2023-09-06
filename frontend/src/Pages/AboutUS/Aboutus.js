import React from "react";
import "./Aboutus.css";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationCityIcon from "@mui/icons-material/LocationCity";
const Aboutus = () => {
  return (
    <div className="homePageMainContainer">
      <div className="backgroundFilterAbout"></div>
      <div className="contentContainer heightContectMainABout  w-50">
        <h1 className="h1TagPicCard">
          <span className="text-white">About Us</span>
        </h1>
        <p className="pTagPicCard">
          A great platform to buy, sell and rent your properties without any
          agent or commissions. <br />
          <br />
          Here, we believe in the transformative power of technology to simplify
          and enhance your real estate journey. Our mission is to empower you
          with the tools and information you need to make informed decisions
          when it comes to buying, selling, renting, or investing in real
          estate.
          <br />
          <br />
          We have a dedicated team of real estate enthusiasts, tech-savvy
          professionals, and industry experts who have come together to
          revolutionize the way you experience real estate. With a shared
          passion for simplifying the complex world of property transactions,
          we've created a platform that puts you at the center of every real
          estate endeavor.
        </p>
      </div>
      <div className="aboutUsContentDiv container">
        <div className="row  d-flex my-lg-5  ">
          <div className="col-md-1"></div>
          <div className="col-md-4 imgDivAbout"></div>
          <div className="col-md-6 m-lg-4  d-flex flex-column   justify-content-center align-items-start ">
            <h2>
              Efficiency. Transparency. <br /> Control.
            </h2>
            <p className="text-secondary  ">
              We developed a platform for the Real Estate marketplace that
              allows buyers and sellers to easily execute a transaction on their
              own. The platform drives efficiency, cost transparency and control
              into the hands of the consumers. Hously is Real Estate Redefined.
            </p>
            <button className="btnHover">Learn More</button>
          </div>
        </div>
        <div className="my-4">
          <div className="my-4 bg-blue-500">
            <h1 className="text-center iconsHelpCard">How It Works!</h1>
            <p className="text-center text-secondary">
              A great plateform to buy, sell and rent your properties without
              any agent or commisions.
            </p>
            <div className="help3Cards">
              <div className="helpCard">
                <HomeIcon className="iconsHelpCard" sx={{ fontSize: "5rem" }} />
                <h3>Evaluate Property</h3>
                <p className="text-secondary text-center">
                  If the distribution of letters and words is random, the reader
                  will not be distracted from making.
                </p>
              </div>
              <div className="helpCard">
                <SupportAgentIcon
                  className="iconsHelpCard"
                  sx={{ fontSize: "5rem" }}
                />
                <h3 className="">Meeting with Agent</h3>
                <p className="text-secondary text-center">
                  If the distribution of letters and words is random, the reader
                  will not be distracted from making.
                </p>
              </div>
              <div className="helpCard">
                <LocationCityIcon
                  className="iconsHelpCard"
                  sx={{ fontSize: "5rem" }}
                />
                <h3 className="">Close the Deal</h3>
                <p className="text-secondary text-center">
                  If the distribution of letters and words is random, the reader
                  will not be distracted from making.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-lg-5 ">
          <div className="my-4 bg-blue-500">
            <h2 className="text-center iconsHelpCard">
              Have Question ? Get in touch!
            </h2>
            <p className="text-center text-secondary">
              A great plateform to buy, sell and rent your properties without
              any agent or commisions.
            </p>
            <div className="d-flex justify-content-center">
              <button className="btnHover my-6">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
