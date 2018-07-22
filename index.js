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

export const Provider = ReactRedux.Provider;

export function connect(component) {
  let selectors = component.selectors;
  let actions = component.actions;

  return ReactRedux.connect(
    selectors && createMapStateToProps(selectors),
    actions && createMapDispatchToProps(actions)
  )(component);
}

