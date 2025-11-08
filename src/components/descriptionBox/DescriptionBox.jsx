import React from "react";
import "./descriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim cum
          neque laudantium. Saepe libero ratione animi sed similique quam iste
          quia culpa maxime rerum inventore, pariatur repellendus quidem, autem
          suscipit laudantium ullam ipsam expedita enim aperiam! Deserunt labore
          quam laudantium omnis dicta perferendis. Natus, minima qui! Cupiditate
          vitae quasi debitis.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
