
import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../models';
import * as todoActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  tasks?: Task[];
  currentTask?: Task;
  deleteListId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  tasks: storage.getItem('todo').tasks,
  currentTask: {},
  deleteListId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const todoReducer = createReducer(
  initialState,

  // GeTasks
  on(todoActions.findUserList, (state) => ({...state, isLoading: true})),
  on(todoActions.findUserListSuccess, (state, result) => ({tasks: result.response, isLoading: false, isLoadingSuccess: true})),

  // Create Task Reducers
  on(todoActions.createList, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
  on(todoActions.createListSuccess, (state, result) => {
    const tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    const currentTask = undefined !== state.currentTask ? _.cloneDeep(state.currentTask) : {};
    currentTask.id = result.taskId;
    tasks.push(currentTask);
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

  // Delete Task Reducers
  on(todoActions.deleteList, (state, {taskid}) => ({...state, isLoading: true, deleteListId: taskid})),
  on(todoActions.deleteListSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    if (result.status) {
      tasks = tasks.filter(task => task.id !== state.deleteListId);
    }
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  }),

   // Edit Task Reducers
   on(todoActions.updateList, (state, {task}) => ({...state, isLoading: true, currentTask: task})),
   on(todoActions.updateListSuccess, (state, result) => {
    let tasks = undefined !== state.tasks ? _.cloneDeep(state.tasks) : [];
    const currentTask = undefined !== state.currentTask ? _.cloneDeep(state.currentTask) : {};
    tasks = tasks.map(tsk => {
      if (tsk.id === currentTask.id) {
        tsk = currentTask;
      }
      return tsk;
    });
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return todoReducer(state, action);
}

export const findUserList = (state: State) => {
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};