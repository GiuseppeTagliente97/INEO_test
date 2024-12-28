import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromINEOStateFeatureKey from "./ineo_state/ineo-state.reducer";
import { INEOStateEffects } from './ineo_state/ineo-state.effects';

export interface State {

  [fromINEOStateFeatureKey.INEOStateFeatureKey]:fromINEOStateFeatureKey.State
}

export const reducers: ActionReducerMap<State> = {

  [fromINEOStateFeatureKey.INEOStateFeatureKey]:fromINEOStateFeatureKey.reducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const effects = [
  INEOStateEffects

]


