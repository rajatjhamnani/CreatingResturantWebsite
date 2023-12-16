import { useState } from "react";
import CartContext from "./Cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const addItemToCartHandler = (newItem) => {
    const existingItemIndex = items.findIndex(
      (item) => item.name === newItem.name
    );
    if (existingItemIndex !== -1) {
      const updatedItem = [...items];
      updatedItem[existingItemIndex].quantity += newItem.quantity;
      setItems(updatedItem);
    } else {
      setItems((prevItem) => [...prevItem, newItem]);
    }
  };
  const removeItemFromCartHandler = (id) => {};
  const cartContext = {
    items: items,
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
