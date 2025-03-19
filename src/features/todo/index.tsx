import { setLocalStorage } from '@/utils'
import { TODO_LIST_KEY } from '@/constants'
import {
  DndContext,
  MouseSensor,
  closestCenter,
  useSensor
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useFetchQuote, useMangateTodo } from '@/hooks'
import { TodoItem } from './components/TodoItem'

const TodoList: React.FC = () => {
  const { quote } = useFetchQuote()

  const {
    addTodo,
    completeHandler,
    deleteTodo,
    setTodos,
    todos,
    todoDueDate,
    newTodo
  } = useMangateTodo()

  const onDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id)
      const newIndex = todos.findIndex((todo) => todo.id === over.id)
      const newOrder = [...todos]
      const [movedItem] = newOrder.splice(oldIndex, 1)
      newOrder.splice(newIndex, 0, movedItem)
      setTodos(newOrder)
      setLocalStorage(TODO_LIST_KEY, newOrder)
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2">
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
      <p className="mb-4">
        <i>{quote}</i>
      </p>
      <div className="flex items-center mb-4">
        <input
          type="text"
          ref={newTodo}
          className="p-2 border border-gray-300 rounded-lg flex-1 mr-2"
          placeholder="Add a new task..."
        />
        <input
          ref={todoDueDate}
          type="date"
          className="p-2 border border-gray-300 rounded-lg mr-2"
          id="dueDate"
          name="dueDate"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
        >
          Add
        </button>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        sensors={[mouseSensor]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={todos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  completeHandler={completeHandler}
                />
              ))
            ) : (
              <p className="text-gray-500">No tasks available</p>
            )}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default TodoList
