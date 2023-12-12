import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Header from "./Component/Layout/Header";
import Meals from "./Component/Meals/Meals";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
