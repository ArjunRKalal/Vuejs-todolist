import { TodoStatus, type Todo } from '@/types'
import { reactive, computed } from 'vue'
interface TodoStore {
  [TodoStatus.Pending]: Todo[]
  [TodoStatus.InProgress]: Todo[]
  [TodoStatus.Completed]: Todo[]
}

const defaultValue = {
  [TodoStatus.Pending]: [
    {
      id: 1,
      title: 'learn vuejs',
      description: 'watch videos',
      status: TodoStatus.Pending
    }
  ],
  [TodoStatus.InProgress]: [],
  [TodoStatus.Completed]: []
}
const todoStore = reactive<TodoStore>(defaultValue)

export default () => {
  const getTodoByStatus = (todoStatus: TodoStatus) => {
    return computed(() => todoStore[todoStatus])
  }

  const addNewTodo = (todo: Todo) => {
    todoStore[todo.status].push(todo)
  }

  const removeTodo = (todo: Todo) => {
    todoStore[todo.status] = todoStore[todo.status].filter((data) => data.id !== todo.id)
  }

  const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
    todo.status = newStatus
  }

  return { getTodoByStatus, addNewTodo, removeTodo, updateTodo }
}
