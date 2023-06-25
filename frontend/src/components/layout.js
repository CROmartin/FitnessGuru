import * as React from "react";

import Header from "./header";
import "./layout.css";
import styled from "styled-components";

const LayoutStyle = styled.div`
  min-height: 100vh;
  margin: auto;
  width: 90%;
  max-width: 1440px;
`;

const Main = styled.main`
  padding-top: 100px;
`;
const Layout = ({ children }) => {
  return (
    <LayoutStyle>
      <Header siteTitle={`Title`} />
      <Main>{children}</Main>
      <footer>© {new Date().getFullYear()} &middot; FitnessGuru</footer>
    </LayoutStyle>
  );
};

export default Layout;
