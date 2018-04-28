let test = require("tape");
let spy = require("spy");

let {
  Provider,
  _createMapDispatchToProps,
  _createMapStateToProps,
  _createFullMapStateToProps,
  _createBasicMapStateToProps,
  _createFullMapDispatchToProps,
} = require("./dist/react-redux-simple.js");

test("Provider", t => {
  t.ok(typeof Provider === "function", "exports Provider from react-redux");
  t.end();
});

test("createBasicMapStateToProps", t => {
  let selectors = { count: state => state.count };
  let mapState = _createBasicMapStateToProps(selectors);
  let state = { count: 1 };
  let props = mapState(state);
  t.same(props, { count: 1 }, "should map state to props");
  t.end();
});

test("createFullMapStateToProps", t => {
  let selectors = props => ({ count: state => state.count + props.count });
  let mapState = _createFullMapStateToProps(selectors);
  let state = { count: 1 };
  let ownProps = { count: 3 };
  let props = mapState(state, ownProps);
  t.same(props, { count: 4 }, "should map state to props");
  t.end();
});

test("createFullMapDispatchToProps", t => {
  let dispatch = spy();
  let actions = props => ({ inc: () => ({ type: "INC", by: props.amount }) });
  let mapDispatch = _createFullMapDispatchToProps(actions);
  let ownProps = { amount: 1 };
  let props = mapDispatch(dispatch, ownProps);

  props.inc();
  t.ok(dispatch.calledWith({ type: "INC", by: 1 }), "should have called dispatch");
  t.end();
});

test("createMapStateToProps", t => {
  let basic = _createMapStateToProps({
    count: state => state.count
  });

  let full = _createMapStateToProps(props => ({
    count: state => state.count
  }));

  t.is(basic.length, 1, "should support basic version");
  t.is(full.length, 2, "should support full version");

  t.end();
});

test("createMapDispatchToProps", t => {
  let basic = _createMapDispatchToProps({
    inc: () => ({ type: "INC" })
  });

  let full = _createMapDispatchToProps(props => ({
    inc: () => ({ type: "INC" })
  }));

  t.is(typeof basic, "object", "should support basic shorthand");
  t.is(full.length, 2, "should support full version");

  t.end();
});

