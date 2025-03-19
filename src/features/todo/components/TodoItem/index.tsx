import { useSortable } from '@dnd-kit/sortable'
import { TodoElement } from '@/features/todo/types'
import { CSS } from '@dnd-kit/utilities'
import UIButton from '@/components/Button'

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
          <div className="border border-gray-100 bg-blue-500 p-2 rounded-lg mr-2">
            <label className="text-white">Due: {todo.dueDate}</label>
          </div>
        )}
        <UIButton
          onClick={() => deleteTodo(todo.id)}
          variant="danger"
          className="mr-2"
        >
          Delete
        </UIButton>
        <UIButton variant="success" onClick={() => completeHandler(todo.id)}>
          {todo.complete ? 'Undo' : 'Done'}
        </UIButton>
      </div>
    </li>
  )
}
