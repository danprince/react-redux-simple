import * as ReactRedux from "react-redux";

/**
 * Converts selectors into a mapStateToProps implementation.
 */
export function createMapStateToProps(selectors) {
  if (typeof selectors === "function") {
    return createFullMapStateToProps(selectors);
  } else {
    return createBasicMapStateToProps(selectors);
  }
}

/**
 * Converts actions into a mapDispatchToProps implementation.
 */
export function createMapDispatchToProps(actions) {
  if (typeof actions === "function") {
    return createFullMapDispatchToProps(actions);
  } else {
    return actions;
  }
}

/**
 * Returns the two argument version of mapStateToProps that will select
 * data from the store whenever the store's state changes or the component
 * is passed new props.
 */
export function createFullMapStateToProps(selectorFactory) {
  return (state, ownProps) => {
    let selectors = selectorFactory(ownProps);
    let props = {};

    for (let key in selectors) {
      props[key] = selectors[key](state);
    }

    return props;
  }
}

/**
 * Returns the one argument version of mapStateToProps that will only select
 * props when the store's state changes.
 */
export function createBasicMapStateToProps(selectors) {
  return state => {
    let props = {};

    for (let key in selectors) {
      props[key] = selectors[key](state);
    }

    return props;
  }
}

/**
 * Returns the two argument version of mapDispatchToProps that will rebind
 * the action creators whenever the component receives props.
 */
export function createFullMapDispatchToProps(actionsFactory) {
  return (dispatch, ownProps) => {
    let actions = actionsFactory(ownProps);
    let props = {};

    for (let key in actions) {
      props[key] = (...args) => {
        let action = actions[key](...args);
        dispatch(action);
      };
    }

    return props;
  }
}

function validateSelectors(selectors, component) {
  if (typeof selectors === "object") {
    for (let key in selectors) {
      let selector = selectors[key];
      let name = component.name ? `<${component.name}>` : "component";

      if (typeof selector !== "function") {
        console.warn(`Invalid selector "${key}" in ${name}! Expected a function but got "${typeof selector}"!`);
      }
    }
  }
}

function validateActions(actions, component) {
  if (typeof actions === "object") {
    for (let key in actions) {
      let action = actions[key];
      let name = component.name ? `<${component.name}>` : "component";

      if (typeof action !== "function") {
        console.warn(`Invalid action "${key}" in ${name}! Expected a function but got "${typeof action}"!`);
      }
    }
  }
}

export const Provider = ReactRedux.Provider;

export function connect(component) {
  let selectors = component.selectors;
  let actions = component.actions;

  if (selectors) validateSelectors(selectors, component);
  if (actions) validateActions(actions, component);

  let connector = ReactRedux.connect(
    selectors && createMapStateToProps(selectors),
    actions && createMapDispatchToProps(actions)
  );

  return connector(component);
}

