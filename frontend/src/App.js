import React from "react";
import Layout from "./components/shared/layout";
import { Routes, Route } from "react-router-dom";
import EmailList from "./components/shared/EmailList";
import Generator from "./pages/Generator";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />
      <Route
        exact
        path="/generator"
        element={
          <Layout>
            <Generator />
          </Layout>
        }
      />
      <Route
        path="/emails"
        element={
          <Layout>
            <EmailList />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
