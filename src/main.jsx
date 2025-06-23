import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import GlobalStyles from "./GlobalStyles/GlobalStyles.jsx";
import AuthContextProvider from "./contexts/authContext.jsx";
import NotificationContextProvider from "./contexts/notifcationContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AuthContextProvider>
          <NotificationContextProvider>
          <StrictMode>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GlobalStyles>
                <App />
              </GlobalStyles>
            </GoogleOAuthProvider>
          </StrictMode>
          </NotificationContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
