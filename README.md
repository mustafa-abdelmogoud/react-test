## Test your react app

# Overview

# different testing methodologies

# Tools

- Jest
  Jest acts as a test runner, assertion library, and mocking library, also provide snapshot testing.
- Enzym
  rendering a component (or multiple components), finding elements, and interacting with elements
- Cypress

# Install

Jest is already installed by CRA

```
yarn add -D enzyme enzyme-adapter-react-16 enzyme-to-json
```

update package.json

```
"jest": {
  "snapshotSerializers": ["enzyme-to-json/serializer"]
}
```

emzyme-to-json: provides better serialization for snapshot comparison.
snapshotSerializers: allow you to pass react component to toMachSnapshot without toJson()

add setupTests.js

```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```

if not using CRA add this line to package.json

```
"setupFiles": ["./src/setupTests.js"]
```

# Enzyme

- mount:

* Full DOM rendering including child components
* Ideal for use cases where you have components that may interact with DOM API, or use React lifecycle methods in order to fully test the component
* As it actually mounts the component in the DOM .unmount() should be called after each tests to stop tests affecting each other
* Allows access to both props directly passed into the root component (including default props) and props passed into child components

- shallow

* Renders only the single component, not including its children. This is useful to isolate the component for pure unit testing. It protects against changes or bugs in a child component altering the behaviour or output of the component under test
* As of Enzyme 3 shallow components do have access to lifecycle methods by default
* Cannot access props passed into the root component (therefore also not default props), but can those passed into child components, and can test the effect of props passed into the root component. This is as with shallow(<MyComponent />), you're testing what MyComponent renders - not the element you passed into shallow

- render

* Renders to static HTML, including children
* Does not have access to React lifecycle methods
* Less costly than mount but provides less functionality

- Events

The Enzyme API has several ways to simulate events or user interactions. If you are wanting to test interacting with a child component then the mount method can be used.

```
it('should be possible to activate button with Spacebar', () => {
  const component = mount(<MyComponent />);
  component
    .find('button#my-button-one')
    .simulate('keydown', { keyCode: 32 });
  expect(component).toMatchSnapshot();
  component.unmount();
});
```

# Jest

- Mocking
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

# Snapshot testing
