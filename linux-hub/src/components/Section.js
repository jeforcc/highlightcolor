import React from "react";
import styled, { keyframes } from "styled-components";
import Logo from "./Logo";

const appear = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: rotate(${props => props.angle}deg);
  margin: 0 40px;
  min-width: 260px;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 18px 0 18px 0;
  letter-spacing: 2px;
  color: ${props => props.accent};
  text-shadow: 0 2px 8px #0001;
  transition: color 0.3s;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  animation: ${appear} 1.1s cubic-bezier(.6,-0.28,.74,.05);
`;

const ListItem = styled.li`
  margin: 12px 0;
  font-size: 1.1rem;
  cursor: pointer;
  color: #222;
  position: relative;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: ${props => props.accent};
    transform: scale(1.13) translateX(8px);
    text-shadow: 0 2px 12px #0002;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: ${props => props.accent};
    border-radius: 50%;
    margin-right: 12px;
    opacity: 0.5;
    transition: background 0.3s;
  }
  &:hover::before {
    opacity: 1;
    background: #fff;
    border: 2px solid ${props => props.accent};
  }
`;

export default function Section({ title, items, logoType, angle, accent }) {
  return (
    <SectionWrapper angle={angle}>
      <Logo type={logoType} accent={accent} />
      <Title accent={accent}>{title}</Title>
      <List>
        {items.map(item => (
          <ListItem key={item} accent={accent}>{item}</ListItem>
        ))}
      </List>
    </SectionWrapper>
  );
}
