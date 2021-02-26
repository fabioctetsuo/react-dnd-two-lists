import * as React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

const Container = styled.article<{ isDragging: boolean }>`
  background: #ffffff;
  padding: 16px;
  border: 1px solid #f6f6f6;
  border-radius: 8px;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: move;
  font-family: Open sans, sans-serif;

  h6 {
    font-size: 16px;
    padding: 0;
    margin: 0 0 8px 0;
  }

  span {
    font-size: 14px;
  }
`;

const Item: React.FC<{
  id: string;
  title: string;
  description: string;
  type: string;
}> = ({ id, title, description, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    item: { id, type, title, description },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Container ref={drag} isDragging={isDragging} aria-labelledby={id}>
      <h6 id={id}>{title}</h6>
      <span>{description}</span>
    </Container>
  );
};

export default Item;
