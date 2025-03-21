import UIButton from '@/components/Button'
import { useTodo } from '../../context'

const CreateTodo = () => {
  const { addTodo, todoDueDate, newTodo } = useTodo()
  return (
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
      <UIButton variant="primary" onClick={addTodo}>
        Add
      </UIButton>
    </div>
  )
}

export default CreateTodo
