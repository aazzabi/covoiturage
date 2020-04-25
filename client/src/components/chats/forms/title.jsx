import React from "react";

import styled from "styled-components";

const TitleDiv = styled.div`
  color: #fff;
  h1 {
    margin: 0px;
  }
  p {
    margin-top: 0px;
    font-size: 12px;
  }
`;

const Title = ({ title, body }) => {
  return (
    <TitleDiv>

      <h1>{title || "~"}</h1>
      <p>{body || "..."}</p>
    </TitleDiv>
  );
};

export default Title;
