import React, { createContext, useRef, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { TODO_LIST_KEY } from '@/constants'
import { TodoContextType, TodoElement } from '../types'

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [todos, setTodos] = useState<TodoElement[]>(
    getLocalStorage(TODO_LIST_KEY) ?? []
  )
  const newTodo = useRef<HTMLInputElement>(null)
  const todoDueDate = useRef<HTMLInputElement>(null)

  const addTodo = () => {
    if (newTodo.current && newTodo.current.value.trim()) {
      const newTodoItem: TodoElement = {
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
      if (todoDueDate.current) todoDueDate.current.value = ''
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

  const sortTodo = () => {
    setTodos((prevTodos) => {
      const sortedTasks = prevTodos.sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
      return [...sortedTasks]
    })
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        completeHandler,
        sortTodo,
        newTodo,
        todoDueDate
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

