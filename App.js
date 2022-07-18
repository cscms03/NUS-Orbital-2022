import AppChild from "./AppChild";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppChild />
    </Provider>
  );
}

export default App;
