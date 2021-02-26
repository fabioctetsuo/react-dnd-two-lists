import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import App from "./App";

test("should drag n drop item between lists", () => {
  render(<App />);
  const selectedList = screen.getByTestId("selected");
  const availableList = screen.getByTestId("available");

  expect(
    within(selectedList).queryByLabelText(/item name 5/i)
  ).not.toBeInTheDocument();

  const draggableItem = within(availableList).getByLabelText(/item name 5/i);
  expect(draggableItem).toBeInTheDocument();
  fireEvent.dragStart(draggableItem);
  fireEvent.dragEnter(selectedList);
  fireEvent.dragOver(selectedList);
  fireEvent.drop(selectedList);

  expect(
    within(selectedList).getByLabelText(/item name 5/i)
  ).toBeInTheDocument();
});
