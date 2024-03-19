import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './createStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  toggleTodoDone(todoId: number): void;
  addTodo(title: string): void;
  removeTodo(todoId: number): void;
}

const useGlobalStore = createStore<IGlobalStore>((setState, getState) => ({
  user: null,
  todos: [],
  login: () =>
    setState({
      user: { email: 'danilocrgm@jstack.com.br', name: 'Danilo Medeiros' },
    }),
  logout: () => setState({ user: null }),
  addTodo: (title: string) => {
    setState((prevState) => ({
      todos: prevState.todos.concat({
        id: Date.now(),
        title,
        done: false,
        author: getState().user?.name ?? 'Convidado',
      }),
    }));
  },
  toggleTodoDone: (todoId: number) => {
    setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo,
      ),
    }));
  },
  removeTodo: (todoId: number) => {
    setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  },
}));

export default useGlobalStore;
