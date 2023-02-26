import { createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/store/app.states';


export const selectTodoFeature = (state: AppStateInterface) => state.todo;

export const todosSelector = createSelector(
    selectTodoFeature, 
    (state) => state.todos
);


export const errorSelector = createSelector(
    selectTodoFeature, 
    (state) => state.error
);
