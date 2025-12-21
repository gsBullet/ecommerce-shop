import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../items/Item";

const NewCollection = () => {
  const [newCollection, setNewCollection] = useState();
  console.log(newCollection);

  const fetchNewCollection = async () => {
    const response = await fetch("http://localhost:9000/api/new-collections");
    const data = await response.json();
    setNewCollection(data.data);
  };
  useEffect(() => {
    fetchNewCollection();
  }, []);
  return (
    <div className="">
      <div className="new-collections">
        <h1>New Collection</h1>
        <hr />
        <div className="collections">
          {newCollection?.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.thumbnail}
              new_price={item.new_price}
              old_price={item.old_price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
