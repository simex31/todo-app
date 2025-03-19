import { useFetchQuote, useMangateTodo } from '@/hooks'
import List from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import PageWrapper from '@/components/layout/PageWrapper'

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

  return (
    <PageWrapper>
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
      <p className="mb-4">
        <i>{quote}</i>
      </p>
      <CreateTodo
        newTodo={newTodo}
        todoDueDate={todoDueDate}
        addTodo={addTodo}
      />
      <List
        completeHandler={completeHandler}
        deleteTodo={deleteTodo}
        setTodos={setTodos}
        todos={todos}
      />
    </PageWrapper>
  )
}

export default TodoList
