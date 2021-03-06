/**
 * @param {Object} state A piece of state attached to one url.
 * @return {Object|null} Either the data most recently fetched from that url or null if there is none.
 */
export const dataSelector = (state) => {
  if (state && state.data) {
    return state.data;
  }

  return null;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {Object|null} error Either an error, if there was one during the last request, or null.
 * @property {string} name
 * @property {string} message
 */
export const errorSelector = (state) => {
  if (state && state.error) {
    return state.error;
  }

  return null;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {boolean} isPending Whether there is a request pending for that url.
 */
export const isPendingSelector = (state) => {
  if (state && state.pendingRequests) {
    return state.pendingRequests > 0;
  }

  return false;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {boolean} completedRequests How many requests, successful or unsuccessful, have been made to this url.
 */
export const completedRequestsSelector = (state) => {
  if (state && typeof state.completedRequests === 'number') {
    return state.completedRequests;
  }

  return 0;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {boolean} completedRequests How many successful requests have been made to this url. A successful request is a request whose Promise is not rejected.
 */
export const successfulRequestsSelector = (state) => {
  if (state && typeof state.successfulRequests === 'number') {
    return state.successfulRequests;
  }

  return 0;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {boolean} hasBeenRequested Whether any request has been made, whether pending or completed, to this url.
 */
export const hasBeenRequestedSelector = state => {
  if (state) {
    return (state.pendingRequests && state.pendingRequests > 0)
      || (state.completedRequests && state.completedRequests > 0);
  }

  return false;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {boolean} hasCompletedOnce Whether any request has been completed, whether failed or successful, to this url.
 */
export const hasCompletedOnceSelector = state => {
  if (state && typeof state.completedRequests === 'number') {
    return state.completedRequests > 0;
  }

  return false;
};

/**
 * @param {Object} state A piece of state attached to one url.
 * @return {number} pendingRequests The number of requests currently pending to this url.
 */
export const pendingRequestsSelector = state => {
  if (state && typeof state.pendingRequests === 'number') {
    return state.pendingRequests;
  }

  return 0;
};
