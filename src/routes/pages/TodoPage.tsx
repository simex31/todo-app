import PageWrapper from '@/components/layout/PageWrapper'
import PageTitle from '@/components/PageTitle'
import CreateTodo from '@/features/todo/components/CreateTodo'
import Quote from '@/features/todo/components/Quote'
import TodoList from '@/features/todo/components/TodoList'
import { TodoProvider } from '@/features/todo/context'

const TodoPage = () => {
  return (
    <TodoProvider>
      <PageWrapper>
        <PageTitle title="Todo List" />
        <Quote />
        <CreateTodo />
        <TodoList />
      </PageWrapper>
    </TodoProvider>
  )
}

export default TodoPage
