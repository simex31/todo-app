import { renderHook, act } from '@testing-library/react'
import { TodoProvider } from '../features/todo/context'
import { TODO_LIST_KEY } from '@/constants'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { Mock, vi } from 'vitest'
import { useTodo } from './use-todo'

// Mock local storage functions
vi.mock('@/utils', () => ({
  setLocalStorage: vi.fn(),
  getLocalStorage: vi.fn(() => [])
}))

describe('useTodo Hook', () => {
  test('initially loads todos from local storage', () => {
    ;(getLocalStorage as Mock).mockReturnValueOnce([
      { id: '1', text: 'Test Todo', complete: false }
    ])

    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider })

    expect(result.current.todos).toEqual([
      { id: '1', text: 'Test Todo', complete: false }
    ])
  })

  test('adds a new todo', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider })

    act(() => {
      result.current.newTodo.current = { value: 'New Task' } as HTMLInputElement
      result.current.addTodo()
    })

    expect(result.current.todos.length).toBe(1)
    expect(result.current.todos[0].text).toBe('New Task')
    expect(setLocalStorage).toHaveBeenCalledWith(
      TODO_LIST_KEY,
      result.current.todos
    )
  })

  test('deletes a todo', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider })

    act(() => {
      result.current.setTodos([{ id: '1', text: 'Test Todo', complete: false }])
    })

    act(() => {
      result.current.deleteTodo('1')
    })

    expect(result.current.todos).toEqual([])
    expect(setLocalStorage).toHaveBeenCalledWith(TODO_LIST_KEY, [])
  })

  test('completes a todo', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider })

    act(() => {
      result.current.setTodos([{ id: '1', text: 'Test Todo', complete: false }])
    })

    act(() => {
      result.current.completeHandler('1')
    })

    expect(result.current.todos[0].complete).toBe(true)
    expect(setLocalStorage).toHaveBeenCalled()
  })

  test('sorts todos by due date', () => {
    const { result } = renderHook(() => useTodo(), { wrapper: TodoProvider })

    act(() => {
      result.current.setTodos([
        { id: '1', text: 'First', complete: false, dueDate: '2025-03-25' },
        { id: '2', text: 'Second', complete: false, dueDate: '2025-03-20' },
        { id: '3', text: 'No Due Date', complete: false }
      ])
    })

    act(() => {
      result.current.sortTodo()
    })

    expect(result.current.todos).toEqual([
      { id: '2', text: 'Second', complete: false, dueDate: '2025-03-20' },
      { id: '1', text: 'First', complete: false, dueDate: '2025-03-25' },
      { id: '3', text: 'No Due Date', complete: false }
    ])
  })
})
