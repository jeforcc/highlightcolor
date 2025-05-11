import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import NavMenu from "./components/NavMenu";
import WikiPage from "./components/WikiPage";

const GlobalStyle = createGlobalStyle`
  body {
    background: #181c24;
    color: #f3f3f3;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  padding-top: 120px;
`;

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <NavMenu />
      <Main>
        <Routes>
          <Route path="/" element={<h1 style={{opacity: 0.15, fontWeight: 700}}>Выберите раздел ↑</h1>} />
          <Route path="/:section/:item" element={<WikiPage />} />
        </Routes>
      </Main>
    </Router>
  );
}