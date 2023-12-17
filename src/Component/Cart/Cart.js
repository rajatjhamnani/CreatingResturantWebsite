import React, { useContext, useState, useEffect } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/Cart-context";

const Cart = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const amount = cartCtx.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalAmount(amount);
    };

    calculateTotalAmount();
  }, [cartCtx.items]);

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <div className={classes["item-actions"]}>
          <li key={item.id}>
            Name: {item.name}, Price: {item.price}
            <space>-------------</space>
            <button
              onClick={() => {
                cartCtx.removeItem(item.id, item.name);
              }}
            >
              -
            </button>
            Quantity: {item.quantity}
            <button onClick={() => cartCtx.addItem({ ...item, quantity: 1 })}>
              +
            </button>
          </li>
        </div>
      ))}
    </ul>
  );

  // const handleOrder = () => {
  //   // Logic for placing an order with the items in the cart
  //   // This is where you might send a request to a server or take further action
  //   // For now, let's just log a message
  //   console.log("Order placed!");
  // };

  return (
    <Modal onClose={props.onClose}>
      {CartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
