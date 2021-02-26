import React from "react";
import styled from "styled-components";
import List from "./List";
import { ItemTypes } from "./Constants";

const Container = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 600px;
`;

function App() {
  const [lists, setLists] = React.useState([
    {
      accept: ItemTypes.SELECTED,
      items: [
        {
          id: "1",
          title: "Item name 1",
          description: "Descrição 1",
          type: ItemTypes.AVAILABLE,
        },
        {
          id: "2",
          title: "Item name 2",
          description: "Descrição 2",
          type: ItemTypes.AVAILABLE,
        },
        {
          id: "3",
          title: "Item name 3",
          description: "Descrição 3",
          type: ItemTypes.AVAILABLE,
        },
      ],
    },
    {
      accept: ItemTypes.AVAILABLE,
      items: [
        {
          id: "4",
          title: "Item name 4",
          description: "Descrição 4",
          type: ItemTypes.SELECTED,
        },
        {
          id: "5",
          title: "Item name 5",
          description: "Descrição 5",
          type: ItemTypes.SELECTED,
        },
      ],
    },
  ]);

  return (
    <Container>
      {lists.map((list) => (
        <List
          key={list.accept}
          items={list.items}
          accepts={list.accept}
          setLists={setLists}
        />
      ))}
    </Container>
  );
}

export default App;
