import { createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/store/app.states';


export const selectAuthFeature = (state: AppStateInterface) => state.auth;

export const messageSelector = createSelector(
    selectAuthFeature, 
    (state) => state.message
);

export const isAuthenticatedSelector = createSelector(
    selectAuthFeature, 
    (state) => state.isAuthenticated
);

export const userIdSelector = createSelector(
    selectAuthFeature, 
    (state) => state.user?.id
);