import React from "react";
import "./NewCollection.css";
import newCollection from "../assets/Frontend_Assets/new_collections";
import Item from "../items/Item";

const NewCollection = () => {
  return (
    <div className="">
      <div className="new-collections">
        <h1>New Collection</h1>
        <hr />
        <div className="collections">
          {newCollection.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
