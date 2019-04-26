import { StateModule } from './root-store.module';
import * as AppSelector from './selectors';
import * as AppState from './state';

export * from './auth-store';
export * from './groups-store'
export * from './users-store';
export * from './settings-store';
export * from './posts-store'
export * from './news-store'
// export * from './my-other-feature-store';

export { AppState, AppSelector, StateModule };
