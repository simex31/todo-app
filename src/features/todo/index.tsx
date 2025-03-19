import React, { useRef, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../../utils'
import { TODO_LIST_KEY } from '../../constants'

interface Todo {
  id: string
  text: string
  complete: boolean
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    getLocalStorage(TODO_LIST_KEY) ?? []
  )
  const newTodo = useRef<HTMLInputElement>(null)

  const addTodo = () => {
    if (newTodo.current && newTodo.current.value.trim()) {
      const newTodoItem: Todo = {
        id: crypto.randomUUID(),
        text: newTodo.current?.value.trim() ?? '',
        complete: false
      }
      setTodos((prevTodos) => {
        setLocalStorage(TODO_LIST_KEY, [...prevTodos, newTodoItem])
        return [...prevTodos, newTodoItem]
      })
      newTodo.current.value = ''
    }
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const completeHandler = (id: string) => {
    setTodos([
      ...todos.map((el) =>
        el.id === id ? { ...el, complete: !el.complete } : el
      )
    ])
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2">
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          ref={newTodo}
          className="p-2 border border-gray-300 rounded-lg flex-1 mr-2"
          placeholder="Add a new task..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 border border-gray-100 rounded-lg ${todo.complete ? 'bg-green-200' : ''}`}
            >
              <span className={todo.complete ? 'line-through' : ''}>
                {todo.text}
              </span>
              <div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-100 hover:text-red-700 me-2 bg-red-500 p-2 rounded"
                >
                  Delete
                </button>
                <button
                  className="text-green-100 hover:bg-green-800 me-2 bg-green-400 p-2 rounded"
                  onClick={() => completeHandler(todo.id)}
                >
                  Done
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </ul>
    </div>
  )
}

export default TodoList
