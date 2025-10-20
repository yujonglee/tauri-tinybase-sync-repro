import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "tinybase/ui-react";

import App from "./App";
import { StoreComponent } from "./tinybase";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
      <StoreComponent />
    </Provider>
  </React.StrictMode>,
);
