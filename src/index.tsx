import React from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./app/App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const rerenderEntireTree = () => {
  const rootElement = document.getElementById("root") as HTMLDivElement;
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

rerenderEntireTree();

// If you want your appActions to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", () => {
    rerenderEntireTree();
  });
}
