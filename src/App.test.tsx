import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import App from "./App";

test("should drag n drop item between lists", () => {
  render(<App />);
  const selectedList = screen.getByTestId("selected");
  const availableList = screen.getByTestId("available");

  expect(
    within(selectedList).getByLabelText(/item name 1/i)
  ).toBeInTheDocument();
  expect(
    within(selectedList).queryByLabelText(/item name 5/i)
  ).not.toBeInTheDocument();

  // drag item name 5 to selected list
  const draggableItem = within(availableList).getByLabelText(/item name 5/i);
  expect(draggableItem).toBeInTheDocument();
  fireEvent.dragStart(draggableItem);
  fireEvent.dragEnter(selectedList);
  fireEvent.dragOver(selectedList);
  fireEvent.drop(selectedList);

  expect(
    within(selectedList).getByLabelText(/item name 5/i)
  ).toBeInTheDocument();

  // drag item name 1 to available list
  fireEvent.dragStart(within(selectedList).getByLabelText(/item name 1/i));
  fireEvent.dragEnter(availableList);
  fireEvent.dragOver(availableList);
  fireEvent.drop(availableList);

  expect(
    within(selectedList).queryByLabelText(/item name 1/i)
  ).not.toBeInTheDocument();
  expect(
    within(availableList).getByLabelText(/item name 1/i)
  ).toBeInTheDocument();
});
