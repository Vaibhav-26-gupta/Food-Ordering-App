import React, { useState } from "react";

const App = () => {
  const [foodItems] = useState([
    { id: 1, name: "Apple", price: 1 },
    { id: 2, name: "Banana", price: 2 },
    { id: 3, name: "Carrot", price: 3 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (foodItem) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === foodItem.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...foodItem, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <h1>Food Items</h1>
      <ul>
        {foodItems.map((food) => (
          <li key={food.id}>
            {food.name} - ${food.price}
            <button onClick={() => addToCart(food)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
