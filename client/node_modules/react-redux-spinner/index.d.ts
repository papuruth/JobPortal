import * as React from 'react';
import * as NProgress from 'nprogress';

export const begin: string;
export const end: string;
export const endAll: string;
export const pendingTask: string;

interface SpinnerProps {
  config: NProgressConfigureOptions;
}

export const Spinner: React.ComponentClass<SpinnerProps>;

type State = number;
interface Action {
  type: string;
}
type Reducer = (state: State, action: Action) => State;

export const pendingTasksReducer: Reducer;

export interface ConfigurablePendingTasksReducerOptions {
  actionKeyPath: ReadonlyArray<string>;
}

type ConfigurablePendingTasksReducer = (options: ConfigurablePendingTasksReducerOptions) => Reducer;
export const configurablePendingTasksReducer: ConfigurablePendingTasksReducer;
