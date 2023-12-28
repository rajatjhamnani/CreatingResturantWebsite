import React, { useContext, useState, useEffect } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/Cart-context";

const Cart = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const amount = cartCtx.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalAmount(Number(amount.toFixed(2)));
    };

    calculateTotalAmount();
  }, [cartCtx.items]);

  const handleOrder = () => {
    if (cartCtx.items.length == 0) {
      alert("no order placed yet");
      setOrderPlaced(false);
    } else {
      setOrderPlaced(true);
    }
  };

  const closeModalHandler = () => {
    if (orderPlaced) {
      cartCtx.clearCart();
      setOrderPlaced(false);
    }
    props.onClose();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <div className={classes["item-actions"]} key={item.id}>
          <li style={{ border: "2px solid brown", margin: "4px" }}>
            Name: {item.name}, Price: {item.price}
            <button
              style={{
                backgroundColor: "brown",
                border: "black",
                marginLeft: "200px",
                borderRadius: "25px",
              }}
              onClick={() => {
                cartCtx.removeItem(item.id, item.name);
              }}
            >
              -
            </button>
            {`Quantity:${item.quantity}`}
            <button
              onClick={() => cartCtx.addItem({ ...item, quantity: 1 })}
              style={{
                backgroundColor: "brown",
                border: "black",
                borderRadius: "25px",
              }}
            >
              +
            </button>
          </li>
        </div>
      ))}
    </ul>
  );

  return (
    <Modal onClose={closeModalHandler}>
      {orderPlaced ? (
        <div className={classes.orderSummary}>
          <h2>Order Placed Successfully!</h2>
          <p>Total Amount: ${totalAmount}</p>
          <p>Thank you for your order!</p>
        </div>
      ) : (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            <button className={classes.button} onClick={handleOrder}>
              Order
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
