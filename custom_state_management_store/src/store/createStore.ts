/* eslint-disable no-shadow */
import { useSyncExternalStore } from 'react';

type SetterFn<T> = (prevState: T) => Partial<T>;
type SetStateFn<T> = (partialState: Partial<T> | SetterFn<T>) => void;

export function createStore<TState>(
  createState: (setState: SetStateFn<TState>, getState: () => TState) => TState,
) {
  let state: TState;

  let listeners: Set<() => void>;

  const notifyListeners = () => {
    listeners.forEach((listener) => listener());
  };

  function setState(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState;

    state = {
      ...state,
      ...newValue,
    };
    notifyListeners();
  }

  function getState() {
    return state;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function useStore<TValue>(
    selector: (currentState: TState) => TValue,
  ): TValue {
    // old implementation without using the useSyncExternalStore hook (available
    // only in react 18)
    // const [value, setValue] = useState(() => selector(state));

    // useEffect(() => {
    //   const unsubscribe = subscribe(() => {
    //     const newValue = selector(state);
    //     if (value !== newValue) {
    //       setValue(newValue);
    //     }
    //   });
    //
    //   return () => unsubscribe();
    // }, [selector, value]);
    //
    // return value;
    return useSyncExternalStore(subscribe, () => selector(state));
  }

  state = createState(setState, getState);
  listeners = new Set();

  return useStore;
}
