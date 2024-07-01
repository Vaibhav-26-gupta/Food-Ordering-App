import { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  // console.log("CartDAta", data);
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let options = props.options;
  let priceOptions = Object.keys(options);

  // const handelAddToCart = async () => {
  //   // data.map((foodItem) => {
  //   //   setCart((prevCart) => {
  //   //     const itemInCart = prevCart.find((item) => item.id === foodItem.id);
  //   //     if (itemInCart) {
  //   //       return prevCart.map((item) =>
  //   //         item.id === foodItem.id
  //   //           ? { ...item, quantity: item.quantity + 1 }
  //   //           : item
  //   //       );
  //   //     } else {
  //   //       return [...prevCart, { ...foodItem, quantity: 1 }];
  //   //     }
  //   //   });
  //   // });
  //   let food = [];
  //   for (let item of data) {
  //     // console.log("item :::", item);
  //     // console.log("DATA :::", data);
  //     if (item.id === props.foodItem._id) {
  //       food = item;
  //       console.log("new food:::", food);
  //       break;
  //     }
  //   }
  //   if (food.length !== 0) {
  //     if (food.size === size) {
  //       console.log("UPDATING DATA");
  //       await dispatch({
  //         type: "UPDATE",
  //         id: props.foodItem._id,
  //         price: finalPrice,
  //         qty: qty,
  //       });
  //       return;
  //     } else if (food.size !== size) {
  //       await dispatch({
  //         type: "ADD",
  //         id: props.foodItem._id,
  //         name: props.foodItem.name,
  //         price: finalPrice,
  //         qty: qty,
  //         size: size,
  //       });
  //       return;
  //       // await console.log(data);
  //     }
  //     return;
  //   }
  //   await dispatch({
  //     type: "ADD",
  //     id: props.foodItem._id,
  //     name: props.foodItem.name,
  //     price: finalPrice,
  //     qty: qty,
  //     size: size,
  //   });
  // };

  const handelAddToCart = async () => {
    let foodToUpdate = data.find((item) => item.id === props.foodItem._id);
    console.log("DATAA", data);

    if (foodToUpdate) {
      console.log("FOOD TO UPDATE ::::", foodToUpdate);
      if (foodToUpdate.size === size) {
        console.log("Updating Data");
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        console.log("Adding Data 1");
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      console.log("Adding Data 2");
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          style={{ height: "150px", objectFit: "fill" }}
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">Some Description</p> */}
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rouned"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">Rs.{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-success justify-center ms-2`}
            onClick={handelAddToCart}
          >
            Add To Cart
          </button>
          {/* <ul>
            {data.map((food) => (
              <li key={food.id}>
                {food.name} - ${food.price}
                <button onClick={() => handelAddToCart(food)}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
