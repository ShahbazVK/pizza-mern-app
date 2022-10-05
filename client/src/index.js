import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux'
import store from "./store";
import "./index.css";
import App from "./App";

// store.subscribe(() => console.log("STORE", store.getState()))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
