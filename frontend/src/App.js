import React from "react";
import Home from "./components/Home";
import Layout from "./components/layout";
import Header from "./components/header";
import Cloud from "./components/Cloud";
import TypingEffect from "./components/TypingEffect";
import { Routes, Route } from "react-router-dom";
import EmailList from "./components/EmailList";
import Calculator from "./components/Caclculator";
function App() {
  return (
    <Layout>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {" "}
              <Cloud />
              <TypingEffect
                text="AI powered Fitness guru"
                typingSpeed={120}
                delay={0}
              />
              <TypingEffect
                text="Generate your meal plan now!"
                typingSpeed={120}
                delay={3500}
              />{" "}
              <Calculator />
              <EmailList />
            </>
          }
        />

        <Route path="/emails" element={<EmailList />} />
      </Routes>
    </Layout>
  );
}

export default App;
