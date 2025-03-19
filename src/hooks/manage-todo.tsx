import { useRef, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { TODO_LIST_KEY } from '@/constants'

interface Todo {
  id: string
  text: string
  complete: boolean
  dueDate?: string
}

export const useMangateTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(
    getLocalStorage(TODO_LIST_KEY) ?? []
  )
  const newTodo = useRef<HTMLInputElement>(null)
  const todoDueDate = useRef<HTMLInputElement>(null)

  const addTodo = () => {
    if (newTodo.current && newTodo.current.value.trim()) {
      const newTodoItem: Todo = {
        id: crypto.randomUUID(),
        text: newTodo.current?.value.trim() ?? '',
        complete: false,
        dueDate: todoDueDate.current?.value
      }
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodoItem]
        setLocalStorage(TODO_LIST_KEY, updatedTodos)
        return updatedTodos
      })
      newTodo.current.value = ''
      todoDueDate.current!.value = ''
    }
  }

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id)
      setLocalStorage(TODO_LIST_KEY, updatedTodos)
      return updatedTodos
    })
  }

  const completeHandler = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((el) =>
        el.id === id ? { ...el, complete: !el.complete } : el
      )
      setLocalStorage(TODO_LIST_KEY, updatedTodos)
      return updatedTodos
    })
  }

  return {
    completeHandler,
    deleteTodo,
    addTodo,
    todos,
    setTodos,
    newTodo,
    todoDueDate
  }
}
