import { setLocalStorage } from '@/utils'
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TODO_LIST_KEY } from '@/constants'
import UIButton from '@/components/Button'
import { useTodo } from '../../context'
import TodoItem from '../TodoItem'

const List = () => {
  const { todos, setTodos, deleteTodo, completeHandler, sortTodo } = useTodo()
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
    <>
      <UIButton onClick={sortTodo} className="mb-2">
        Sort
      </UIButton>
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
    </>
  )
}

export default List
