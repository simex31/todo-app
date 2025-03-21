import { TodoContext } from "@/features/todo/context"
import { useContext } from "react"

export const useTodo = () => {
    const context = useContext(TodoContext)
    if (!context) {
      throw new Error('useTodo must be used within a TodoProvider')
    }
    const {
      todos,
      setTodos,
      addTodo,
      deleteTodo,
      completeHandler,
      sortTodo,
      newTodo,
      todoDueDate
    } = context
  
    return {
      todos,
      setTodos,
      addTodo,
      deleteTodo,
      completeHandler,
      sortTodo,
      newTodo,
      todoDueDate
    }
  }