/**
 * Use data 'states'
 */
export enum AsyncItemState {
  UNINITIALIZED = "uninitialized",
  LOADING       = "loading",
  POLLING       = "refreshing",
  LOADED        = "loaded",
  ERROR         = "error"
}

/**
 * Generic wrapper interface 
 */
export interface AsyncItem<T> {    
    state     : AsyncItemState;
    error    ?: Error;
    cachedAt ?: Date;

    isPolling: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;

    data     ?: T;          
}

/**
 * Wrapper function to easily determine async state
 */
export function queryState<T>(item:AsyncItem<T>) {
  return {
    isPolling : (item.state === AsyncItemState.POLLING),
    isLoading : (item.state === AsyncItemState.LOADING),
    isLoaded  : (item.state === AsyncItemState.LOADED)
  };
}

/**
 * Simple construction function...
 */
export function makeAsyncItem<T>(data:T = null, state = AsyncItemState.LOADING) {
  return { state, data };
}

/**
 * Wrap `item` values for async presentation with ghosts
 */
export function wrapAsAsyncItems<Model>(list) {
  return list.map((item:Model) => makeAsyncItem<Model>(item, AsyncItemState.LOADING)); 
}

/**
 * Build initial list of Ghost elements
 */
export function buildGhosts<Model>() {
  const ghosts = new Array(10).fill(null);
  return wrapAsAsyncItems<Model>(ghosts);
}

/**
 * Use 'uid' if not a ghost... otherwise just create a number...
 * 
export function trackByFn<Model>(index:number, item: AsyncItem<Model>) {
    return item.data ? item.data.id : 0; 
}
*/
