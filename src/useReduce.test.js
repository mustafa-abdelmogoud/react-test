import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Example from "./useReduce";

it("shows success message after confirm button is clicked", () => {
  const { getByText } = render(<Example />);

  expect(getByText(/Waiting for confirmation.../i)).toBeInTheDocument();

  fireEvent.click(getByText("Confirm"));

  expect(getByText("Confirmed!")).toBeInTheDocument();
});
