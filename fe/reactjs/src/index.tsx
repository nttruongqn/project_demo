import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import AuthProvider from "./store/AuthProvider";
import { ShoppingCartProvider } from "./store/ShoppingCartProvider";
import FormPaymentProvider from "./store/FormPaymentProvider";


const persistor = persistStore(store);
const container = document.getElementById("root")!;
const root = createRoot(container);

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#0277bd',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#eceff1',
    },
  },
});



root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AuthProvider>
        <ShoppingCartProvider>
          <FormPaymentProvider>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <CssBaseline>
                <App />
              </CssBaseline>
            </BrowserRouter>
          </PersistGate>
          </FormPaymentProvider>
        </ShoppingCartProvider>
      </AuthProvider>
    </Provider>
  </ThemeProvider>
);

