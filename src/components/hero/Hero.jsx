import React from "react";
import handIcon from "../assets/Frontend_Assets/hand_icon.png";
import arrowIcon from "../assets/Frontend_Assets/arrow.png";
import "./hero.css";

const Hero = () => {
  return (
    <div>
      
      <div className="hero ">
        <div className="hero-left">
          <h2 className="uppercase text-gray-800 font-semibold text-3xl">
            new arrivals only
          </h2>
          <div>
            <div className="hero-left-icon flex items-center gap-5">
              <p className="text-[#171717] text-7xl font-bold">
                new
              </p>
              <img src={handIcon} alt="Hand Icon" className="w-24 h-24 " />
            </div>
            <p className="text-[#171717] text-7xl font-bold">collections</p>
            <p className="text-[#171717] text-7xl font-bold">for everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div>latest collections</div>
            <img src={arrowIcon} alt="Arrow Icon" />
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            alt="Featured collection showcase"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
