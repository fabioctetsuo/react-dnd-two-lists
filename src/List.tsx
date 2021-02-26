import * as React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { ItemTypes } from "./Constants";

import Item from "./Item";

type ItemProps = {
  id: string;
  title: string;
  description: string;
  type: string;
};

type ListProps = {
  items: ItemProps[];
  accepts: string;
  setLists: (state: any) => void;
};

const Container = styled.ul<{ isOver: boolean }>`
  display: flex;
  flex-direction: column;
  background: #d3d3d3;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 16px;
  gap: 16px;
  border: ${({ isOver }) => (isOver ? "2px dashed #000" : "none")};
  box-sizing: border-box;
`;

const moveToAvailable = (
  list: { items: ItemProps[]; accept: string },
  dropItem: ItemProps
) => {
  if (dropItem.type === ItemTypes.AVAILABLE) {
    return {
      ...list,
      items: list.items.filter((item) => item.id !== dropItem.id),
    };
  }
  return {
    ...list,
    items: list.items.concat({ ...dropItem, type: ItemTypes.AVAILABLE }),
  };
};

const moveToSelected = (
  list: { items: ItemProps[]; accept: string },
  dropItem: ItemProps
) => {
  if (dropItem.type === ItemTypes.AVAILABLE) {
    return {
      ...list,
      items: list.items.concat({ ...dropItem, type: ItemTypes.SELECTED }),
    };
  }
  return {
    ...list,
    items: list.items.filter((item) => item.id !== dropItem.id),
  };
};

const getUpdatedLists = (
  list: { items: ItemProps[]; accept: string },
  dropItem: ItemProps
) => {
  if (list.accept === ItemTypes.SELECTED) {
    return moveToAvailable(list, dropItem);
  }
  return moveToSelected(list, dropItem);
};

const ListContainer: React.FC<ListProps> = ({ items, accepts, setLists }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: accepts,
      drop: (dropItem: ItemProps) => {
        setLists((prevState: { items: ItemProps[]; accept: string }[]) => {
          return prevState.map((state) => getUpdatedLists(state, dropItem));
        });
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <Container ref={drop} isOver={isOver} data-testid={accepts}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </Container>
  );
};

const List: React.FC<ListProps> = ({ items, accepts, setLists }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ListContainer items={items} accepts={accepts} setLists={setLists} />
    </DndProvider>
  );
};

export default List;
