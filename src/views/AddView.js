import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Add = () => {
  return (
    <Container>
      <div>
        <Title>Add</Title>
      </div>
    </Container>
  );
};

export default Add;
