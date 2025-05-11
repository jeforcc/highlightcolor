import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97);}
  to { opacity: 1; transform: scale(1);}
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 2000;
  inset: 0;
  background: rgba(24,28,36,0.92);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
`;

const Modal = styled.div`
  margin-top: 60px;
  background: #232733;
  border-radius: 18px;
  box-shadow: 0 8px 48px #000a;
  max-width: 700px;
  width: 95vw;
  color: #f3f3f3;
  padding: 36px 32px 32px 32px;
  position: relative;
  animation: ${fadeIn} 0.4s;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 22px;
  background: none;
  border: none;
  color: #bdbdbd;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #fff; }
`;

const Title = styled.h2`
  font-size: 2.1rem;
  margin: 0 0 18px 0;
  font-weight: 800;
  letter-spacing: 1.5px;
`;

const Img = styled.img`
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  margin: 18px auto 24px auto;
  display: block;
  box-shadow: 0 4px 32px #0004;
`;

const Text = styled.div`
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 18px;
  color: #e0e0e0;
`;

export default function ArticleModal({ open, onClose, article }) {
  if (!open || !article) return null;
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose} title="Закрыть">&times;</CloseBtn>
        <Title>{article.title}</Title>
        {article.img && <Img src={article.img} alt={article.title} />}
        <Text>{article.text}</Text>
        {article.img2 && <Img src={article.img2} alt={article.title + " 2"} />}
        {article.text2 && <Text>{article.text2}</Text>}
      </Modal>
    </Overlay>
  );
}
