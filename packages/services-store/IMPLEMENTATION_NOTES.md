# `@carbon/ibmdotcom-services-store`

`@carbon/ibmdotcom-services-store` is an internal package (for now) of
[Redux](https://redux.js.org) store that works with `@carbon/ibmdotcom-services`
to fetch data from there.

Usage of Redux allows us to do the following:

- Separate the code interacting with `@carbon/ibmdotcom-services` from component
  code, that eliminates the dependency to any JavaScript framework as well as
  the requirement of lifecycle management
- Manage in-progress and error states of `@carbon/ibmdotcom-services` calls in
  an unified manner

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [State structure](#state-structure)
- [Actions](#actions)
  - [Regular actions](#regular-actions)
  - [`redux-thunk` action](#redux-thunk-action)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## State structure

There are two types of services in `@carbon/ibmdotcom-services` that
`@carbon/ibmdotcom-services-store` deals with, one that returns simple data,
another that returns data that is unique to another data, e.g. locale ID. This
document calls such another data _key_, and data that is unique to such another
data _keyed data_ hereafter.

Service returning simple data typically has the following Redux states
associated with it:

```typescript
interface FooAPIState {
  foo?: Foo;
  requestFoo?: Promise<Foo>;
  requestFooInProgress?: boolean;
  errorRequestFoo?: Error;
}
```

Where:

| State                  | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `foo`                  | The data (response) from the service.                            |
| `requestFoo`           | The in-flight or resolved request to the service.                |
| `requestFooInProgress` | `true` if the request to the service is in-flight.               |
| `errorRequestFoo`      | An instance of `Error` if the request to the service has failed. |

Services returning keyed data has state value in a key-value map format:

```typescript
interface BarAPIState {
  bar?: { [language: string]: Bar };
  requestsBar?: { [language: string]: Promise<Bar> };
  requestsBarInProgress?: { [language: string]: boolean };
  errorsRequestBar?: { [language: string]: Error };
}
```

## Actions

There are two categories of actions, one is regular one, another is one using
[`redux-thunk`](https://github.com/reduxjs/redux-thunk).

### Regular actions

Typically, `@carbon/ibmdotcom-services-store` has three regular actions for one
service in `@carbon/ibmdotcom-services`. Regular actions for services returning
simple data are the following:

| Action creator            | Description                                                                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setRequestFooInProgress` | Tells that a request is in progress. A promise that is resolved with the data (response) should be given to the action. The reducer should set `true` to `requestFooInProgress`. The reducer should also set the given promise to`requestFoo`.    |
| `setErrorRequestFoo`      | Tells that a request has been failed. The error should be given to the action. The reducer should set the given error to `errorRequestFoo`. The reducer should also set `false` to `requestFooInProgress`.                                        |
| `setFoo`                  | Tells that a request has been resolved, or the data (response) has been available already. The data should be given to the action. The reducer should set the given data to `foo`. The reducer should also set `false` to `requestFooInProgress`. |

Regular actions for services returning keyed data have similar list of action
creators. The key should be given to each action, in addition to ones described
above. The reducer should update the value of the given key in the state value
as key-value map.

### `redux-thunk` action

Typically, `@carbon/ibmdotcom-services-store` has one `redux-thunk` action for
one service in `@carbon/ibmdotcom-services`. `redux-thunk` action for services
that returns simple data looks like below:

```javascript
function loadFoo() {
  return async (dispatch, getState) => {
    const { requestFoo } = getState().someAPI ?? {};
    if (requestFoo) {
      return requestFoo;
    }
    const promiseFoo = SomeAPI.getFoo();
    dispatch(setRequestFooInProgress(promiseFoo));
    try {
      dispatch(setFoo(await promiseFoo));
    } catch (error) {
      dispatch(setErrorRequestFoo(error));
      throw error;
    }
    return promiseFoo;
  };
}
```

First, we see if we have sent the same request to `@carbon/ibmdotcom-services`
earlier, and if so, just return such earlier request, that works as the request
cache. Given we keep the in-flight or resolved request to the service in
`requestFoo`, we can do it by:

```javascript
const { requestFoo } = getState().someAPI ?? {};
if (requestFoo) {
  return requestFoo;
}
```

Next, we make the service call. We don't inspect the resolved value of the
promise at this point because we want to mark as the request is in progress
right after:

```javascript
const promiseFoo = SomeAPI.getFoo();
dispatch(setRequestFooInProgress(promiseFoo));
```

Then we inspect the resolved value of the promise and updates the state with it.
If the promise is rejected, we mark as such. Either action we end up with marks
as the request is no longer in progress:

```javascript
try {
  dispatch(setFoo(await promiseFoo));
} catch (error) {
  dispatch(setErrorRequestFoo(error));
  throw error;
}
```

Lastly, we return the promise of the request so that other `redux-thunk` actions
can use the result:

```javascript
return promiseFoo;
```

`redux-thunk` action for services that returns keyed data looks like below:

```javascript
function loadBar(foo) {
  return async (dispatch, getState) => {
    const effectiveFoo = foo ?? (await dispatch(loadFoo()));
    const { requestsBar = {} } = getState().someAPI ?? {};
    const { [effectiveFoo]: requestBar } = requestsBar;
    if (requestBar) {
      return requestBar;
    }
    const promiseBar = SomeAPI.getBar(effectiveFoo);
    dispatch(setRequestBarInProgress(effectiveFoo, promiseBar));
    try {
      dispatch(setBar(effectiveFoo, await promiseBar));
    } catch (error) {
      dispatch(setErrorRequestBar(effectiveFoo, error));
    }
    return promiseBar;
  };
}
```

First, we fetch the value of the key as needed. If the key is given directly to
the action we use it, otherwise we get it from another `redux-thunk` action:

```javascript
const effectiveFoo = foo ?? (await dispatch(loadFoo()));
```

Then we do similar thing to `redux-thunk` action for services that returns
simple data. The difference is that the state that holds the request cache as
well as the service call and the Redux actions we dispatch here are keyed by
`effectiveFoo`.
