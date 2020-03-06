import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

function changeIsDisplayingThread() {
  return {
    type: "CHANGE_IS_DISPLAYING_THREAD"
  };
}
it("should dispatch action", () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(changeIsDisplayingThread());

  const actions = store.getActions();
  const expectedPayload = { type: "CHANGE_IS_DISPLAYING_THREAD" };
  expect(actions).toEqual([expectedPayload]);
});

function incrementStreamCounter() {
  return {
    type: "INCREMENT_STREAM_COUNTER"
  };
}
it("should dispatch action", () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(incrementStreamCounter());

  const actions = store.getActions();
  const expectedPayload = { type: "INCREMENT_STREAM_COUNTER" };
  expect(actions).toEqual([expectedPayload]);
});

function changeIsDisplayingAnalytics() {
  return {
    type: "CHANGE_IS_DISPLAYING_ANALYTICS"
  };
}
it('should dispatch action', () => {
    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(changeIsDisplayingAnalytics())

    const actions = store.getActions()
    const expectedPayload = {type: "CHANGE_IS_DISPLAYING_ANALYTICS"}
    expect(actions).toEqual([expectedPayload])
})

function changeThreadContact() {
    return {
        type: "CHANGE_THREAD_CONTACT"
    }
}
it('should dispatch action', () => {
    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(changeThreadContact())

    const actions = store.getActions()
    const expectedPayload = {type: "CHANGE_THREAD_CONTACT"}
    expect(actions).toEqual([expectedPayload])
})

function changeAnalyticsContact() {
    return {
        type: "CHANGE_ANALYTICS_CONTACT"
    }
}
it('should dispatch action', () => {
    const  initialState = {}
    const store = mockStore(initialState)

    store.dispatch(changeAnalyticsContact())
   
    const actions = store.getActions()
    const expectedPayload = {type: "CHANGE_ANALYTICS_CONTACT"}
    expect(actions).toEqual([expectedPayload])
})

function iframeLoaded() {
    return {
        type: "IFRAME_LOADED"
    }
}
it('should dispatch action', () => {
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(iframeLoaded())
    const actions = store.getActions()
    const expectedPayload = {type: "IFRAME_LOADED"}
    expect(actions).toEqual([expectedPayload])
})

function setSnippetFilter() {
    return {
        type: "SET_SNIPPET_FILTER"
    }
}
it('should dispatch action', () => {
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(setSnippetFilter())
    const actions = store.getActions()
    const expectedPayload = {type: "SET_SNIPPET_FILTER"}
    expect(actions).toEqual([expectedPayload])
})