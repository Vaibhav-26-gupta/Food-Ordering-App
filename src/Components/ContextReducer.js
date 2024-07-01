import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
      console.log("Data Updating");
      return state.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: action.price + food.price,
          };
        } else {
          return food;
        }
      });

    // let arr = [...state];
    // console.log("ARR::::", arr);

    // arr.find((food, index) => {
    //   console.log("FOOD::::", food);
    //   console.log("INDEX::::", index);
    //   // console.log("Food ID ::", food.id);
    //   // console.log("ACTION ID ::", action.id);
    //   if (food.id === action.id) {
    //     arr[index] = {
    //       ...food,
    //       qty: parseInt(action.qty) + parseInt(food.qty),
    //       price: action.price + food.price,
    //     };
    //     console.log("ARRUPDATED:::", arr);
    //   }
    //   return arr;
    // });
    // return arr;
    case "DROP":
      let empArry = [];
      return empArry;
    default:
      console.log("Error in Reducer");
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export default CartProvider;
export const useCart = () => {
  return useContext(CartStateContext);
};
export const useDispatchCart = () => {
  return useContext(CartDispatchContext);
};
