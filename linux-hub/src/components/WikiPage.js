import React from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import wikiData from "./wikiData";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.97);}
  to { opacity: 1; transform: scale(1);}
`;

const Article = styled.article`
  background: #232733;
  border-radius: 18px;
  box-shadow: 0 8px 48px #000a;
  max-width: 700px;
  width: 95vw;
  color: #f3f3f3;
  padding: 36px 32px 32px 32px;
  animation: ${fadeIn} 0.4s;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 18px 0;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-align: center;
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

export default function WikiPage() {
  const { section, item } = useParams();
  const data = wikiData[section]?.[item];

  if (!data) {
    return <Article><Title>немає даних</Title><Text>для цього пункту ще немає статті.   :(</Text></Article>;
  }

  return (
    <Article>
      <Title>{data.title}</Title>
      {data.img && <Img src={data.img} alt={data.title} />}
      <Text>{data.text}</Text>

      {data.advantages && (
        <div style={{margin: "24px 0 12px 0"}}>
          <b style={{fontSize: "1.1em"}}>Переваги:</b>
          <ul style={{margin: "8px 0 0 18px"}}>
            {data.advantages.map((adv, i) => (
              <li key={i} style={{margin: "6px 0"}}>{adv}</li>
            ))}
          </ul>
        </div>
      )}

      {data.facts && (
        <div style={{margin: "18px 0 0 0"}}>
          <b style={{fontSize: "1.1em"}}>Цікаві факти:</b>
          <ul style={{margin: "8px 0 0 18px"}}>
            {data.facts.map((fact, i) => (
              <li key={i} style={{margin: "6px 0"}}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {data.img2 && <Img src={data.img2} alt={data.title + " 2"} />}
      {data.text2 && <Text>{data.text2}</Text>}
    </Article>
  );
}
