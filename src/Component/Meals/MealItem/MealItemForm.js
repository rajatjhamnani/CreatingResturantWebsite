import React, { useContext, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import CartContext from "../../../store/Cart-context";

const MealItemForm = (props) => {
  const [quantity, setQuantity] = useState(1);

  const cartContext = useContext(CartContext);

  const handleInputChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const addItemToCart = (event) => {
    event.preventDefault();

    cartContext.addItem({ ...props.item, quantity: quantity });
  };

  return (
    <form className={classes.form} onSubmit={addItemToCart}>
      <Input
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",

          onChange: handleInputChange,
          value: quantity,
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
