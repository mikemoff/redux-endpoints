# redux-endpoints
> Define Redux modules for fetching data from API endpoints

## Motivation
I found myself writing a lot of boilerplate code every time I wanted to fetch data and ingest it into my Redux store. First, I would define some actions for requesting and ingesting the data. Then I would define a reducer to process those actions. Then I would define some middleware or a saga to intercept the "request" action and fire off the "ingest" one once the API call was complete. Establishing all the cross references and integrating the module into my Redux setup was tedious and error prone. More importantly, I quickly realized that for simple cases I was doing the exact same thing every time, with minor variations caused only by slips of memory or spells of laziness. I made redux-endpoints as a way to truly standardize this type of module definition.

## Example
```js
// src/redux-modules/resourceApi/index.js
import { createEndpoint } from 'redux-endpoints';

const ep = createEndpoint({
  name: 'resourceApi',
  request: (url) => new Promise((resolve, reject) => (
    fetch(url, { credentials: 'include' })
      .then(resp => resp.json())
      .then(json => resolve(json))
  )),
  resolver: id => id,
  url: '/api/resource/:id',
});

const {
  actionCreators,
  actionTypes,
  middleware,
  selectors,
  reducer,
} = ep;

export {
  actionCreators,
  actionTypes,
  middleware,
  selectors,
};

export default reducer;
```

```js
// src/redux-store/index.js
import { applyMiddleware, createStore } from 'redux';

import apiResourceReducer, { middleware as resourceApiMiddleware } from 'redux-modules/resourceApi';

const middleware = applyMiddleware(
  resourceApiMiddleware,
);

const reducer = combineReducers({
  resourceApi: apiResourceReducer,
});

const store = createStore(reducer, {}, middleware);
```

```js
// whereveryouwant.js
import store from 'redux-store';

import { actionCreators } from 'redux-modules/resourceApi';

store.dispatch(actionCreators.request(1));
```

The code above triggers:
1. An action, `resourceApi/REQUEST_RESOURCE_API_DATA`,
1. A fetch to the url `/api/resource/1`, and
1. An action, `resourceApi/INGEST_RESOURCE_API_DATA`.

At the end of the whole thing, the `resourceApi` branch of your state will look as follows:
```json
{
  "1": {
    "pendingRequests": 0,
    "data": {
      "id": 1,
      "server_attribute": "server_value"
    }
  }
}
```
