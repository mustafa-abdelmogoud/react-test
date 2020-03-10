import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import App from "./App";

/**
 * Behaviour
 */
test("initial counter value is 0", () => {
  const { container } = render(<App />);
  /**
   * select hte right query
   * https://testing-library.com/docs/guide-which-query
   */
  const counterValue = getByTestId(container, "counter");
  expect(counterValue.textContent).toBe("0");
});

test("increment by clicking on increment button", () => {
  const { container } = render(<App />);
  const counterValue = getByTestId(container, "counter");
  const incrementButton = getByTestId(container, "increment");
  expect(counterValue.textContent).toBe("0");
  fireEvent.click(incrementButton);
  expect(counterValue.textContent).toBe("1");
});

test("decrement by clicking on increment button", () => {
  const { container } = render(<App />);
  const counterValue = getByTestId(container, "counter");
  const decrementButton = getByTestId(container, "decrement");
  expect(counterValue.textContent).toBe("0");
  fireEvent.click(decrementButton);
  expect(counterValue.textContent).toBe("-1");
});

test("decrement & increment", () => {
  const { container } = render(<App />);
  const counterValue = getByTestId(container, "counter");
  const decrementButton = getByTestId(container, "decrement");
  const incrementButton = getByTestId(container, "increment");
  expect(counterValue.textContent).toBe("0");
  fireEvent.click(incrementButton);
  expect(counterValue.textContent).toBe("1");
  fireEvent.click(decrementButton);
  expect(counterValue.textContent).toBe("0");
});

/**
 * Appearance
 */

// don't test implementation details
test("page shows increment & decrement buttons", () => {
  const { getByText } = render(<App />);
  expect(getByText(/\+/i)).toBeInTheDocument();

  expect(getByText(/-/i)).toBeInTheDocument();
});

// don't run into updating the snapshot
test("match a snapshot", () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});
