export type TodoElement = {
  id: string
  text: string
  complete: boolean
  dueDate?: string
}

export type TodoContextType = {
  todos: TodoElement[]
  setTodos: React.Dispatch<React.SetStateAction<TodoElement[]>>
  addTodo: () => void
  deleteTodo: (id: string) => void
  completeHandler: (id: string) => void
  sortTodo: () => void
  newTodo: React.RefObject<HTMLInputElement | null>
  todoDueDate: React.RefObject<HTMLInputElement | null>
}
