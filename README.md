## Test your react app

# Overview

# Tests

- Unit test
- integration test
- E2E test

# TDD overview

- red
- green
- refactor

# Tools

- **Jest**
  Jest acts as a test runner, assertion library, and mocking library, also provide snapshot testing.
- **react-testing-library**
  rendering a component (or multiple components), finding elements, and interacting with elements
- **Cypress**
  E2E

# react-testing-library

- **render**
  renders a React element into the DOM and returns utility functions for testing the component
- **rerender**
  It'd probably be better if you test the component that's doing the prop updating to ensure that the props are being updated correctly

```
import { render } from '@testing-library/react'
const { rerender } = render(<NumberDisplay number={1} />)
// re-render the same component with different props
rerender(<NumberDisplay number={2} />)

```

- **custom render**
  It's often useful to define a custom render method that includes things like global context providers, data stores, etc

- **query**
  different querySelectors https://testing-library.com/docs/dom-testing-library/api-queries

use `screen` for pages.

- **events**

```

fireEvent.click(DOMElement)

fireEvent.change(DOMElement, { target: { value: '23' } })

```

Consider fireEvent.click which creates a click event and dispatches that event on the given DOM node. This works properly for most situations when you simply want to test what happens when your element is clicked, but when the user actually clicks your element, these are the events that are typically fired (in order):

- fireEvent.mouseOver(element)
- fireEvent.mouseMove(element)
- fireEvent.mouseDown(element)
- element.focus() (if that element is focusable)
- fireEvent.mouseUp(element)
- fireEvent.click(element)

This part should be covered by the E2E test.

https://testing-library.com/docs/dom-testing-library/api-events

# Jest

- **Mocking**
  You may simply want to check that a function passed as props is successfully called.

```

const clickFn = jest.fn();
describe('MyComponent', () => {
it('button click should hide component', () => {
const component = shallow(<MyComponent onClick={clickFn} />);
component
.find('button#my-button-two')
.simulate('click');
expect(clickFn).toHaveBeenCalled();
});
});

```

```

const mockTryGetValue = jest.fn(() => false);
const mockTrySetValue = jest.fn();

jest.mock('save-to-storage', () => ({
SaveToStorage: jest.fn().mockImplementation(() => ({
tryGetValue: mockTryGetValue,
trySetValue: mockTrySetValue,
})),
}));
describe('MyComponent', () => {
it('should set storage on save button click', () => {
mockTryGetValue.mockReturnValueOnce(true);
const component = mount(<MyComponent />);
component.find('button#my-button-three').simulate('click');
expect(mockTryGetValue).toHaveBeenCalled();
expect(component).toMatchSnapshot();
component.unmount();
});
});

```

# Test Apollo

```
import { MockedProvider } from '@apollo/react-testing';
import { GET_DOG_QUERY, Dog } from './dog';

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data: {
        dog: { id: '1', name: 'Buck', breed: 'bulldog' },
      },
    },
  },
];

it('renders without error', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>,
  );
});
```

# How to organize your test

Test for Behavior & appearance
don't test implementation details

# snapshot testing

Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly

```
jest --updateSnapshot
```

# resources

- https://testing-library.com/docs/dom-testing-library/api-queries*
- https://jestjs.io/docs/en/getting-started
- https://www.apollographql.com/docs/react/development-testing/testing/
