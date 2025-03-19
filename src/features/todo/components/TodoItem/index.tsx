import { useSortable } from '@dnd-kit/sortable'
import { TodoElement } from '../../types'
import { CSS } from '@dnd-kit/utilities'

export const TodoItem: React.FC<{
  todo: TodoElement
  deleteTodo: (id: string) => void
  completeHandler: (id: string) => void
}> = ({ todo, deleteTodo, completeHandler }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex justify-between items-center p-2 border border-gray-100 rounded-lg ${todo.complete ? 'bg-green-200' : ''}`}
    >
      <span className={todo.complete ? 'line-through' : ''}>{todo.text}</span>
      <div className="flex">
        {todo.dueDate && (
          <div className="border border-gray-100 bg-blue-500 p-2 rounded-lg me-2">
            <label className="text-white">Due: {todo.dueDate}</label>
          </div>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-100 hover:text-red-700 me-2 bg-red-500 p-2 rounded"
        >
          Delete
        </button>
        <button
          className="text-green-100 hover:bg-green-800 me-2 bg-green-500 p-2 rounded"
          onClick={(event) => {
            event.stopPropagation()
            event.preventDefault()
            completeHandler(todo.id)
          }}
        >
          Done
        </button>
      </div>
    </li>
  )
}
