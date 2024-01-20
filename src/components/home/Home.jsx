import React from "react";
import "./Home.css";
import ENQ from "../../assets/Enquiry.svg";
import DocT from "../../assets/Doc-Trial.svg";
import ChatAI from "../../assets/ChatAI.svg";
import CustomizedAccordions from "./FAQ";
import { Link } from "react-router-dom";
import Dashboard from "../../assets/dashboard.svg"

const Home = () => {
  return (
    <div className="home_body">
    <div className="db">
        <img src={Dashboard} alt="HERO"/>
    </div>
      <div className="home_service_section">
        <div className="service_head">
          Services
        </div>
        <div className="home_services">
        <div className="cd card_1">
          <div className="serv_img">
            <img src={ENQ} alt="Enquiry_form" />
          </div>
          <div className="serv_head">
            Scan a Menu
          </div>
          <div className="serv_cont">
          A comprehensive inquiry form service is provided, enabling users to effortlessly gather information about all the required documents for completion. Users can fill out the form to receive detailed information on the documents necessary for their specific needs.
          </div>
          <div className="serv_btn">
            <Link to="/form" ><button type="submit">Scan Now</button></Link>
          </div>
        </div>
        <div className="cd card_1">
          <div className="serv_img">
            <img src={ChatAI} alt="ChatAI" />
          </div>
          <div className="serv_head">
            Your HealthBot
          </div>
          <div className="serv_cont">
          An AI-powered chat service is available, allowing users to ask questions related to their document search queries. This service assists users by addressing specific issues they encounter while searching through documents, providing real-time help and guidance.
          </div>
          <div className="serv_btn">
            <Link to="/chat"><button type="submit">Chat Now</button></Link>
          </div>
        </div>
        <div className="cd card_1">
          <div className="serv_img">
            <img src={DocT} alt="DocT" />
          </div>
          <div className="serv_head">
            Know Your Diet
          </div>
          <div className="serv_cont">
          The service offers users the opportunity to test the verification of their documents before officially submitting them to the final portal. This means users can ensure the accuracy and suitability of their documents through a trial process before making the final submission.
          </div>
          <div className="serv_btn">
          <Link to="/doct/details">
                <button type="submit">Get Info</button>
              </Link>
          </div>
        </div>
      </div>
      </div>
      <div className="faq">
        <div className="faq_head">
          Frequently Asked Questions (FAQs)
        </div>
      <CustomizedAccordions />
      </div>
    </div>
  );
};

export default Home;
