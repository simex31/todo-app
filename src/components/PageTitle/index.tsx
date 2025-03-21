type Props = {
  title: string
}

const PageTitle: React.FC<Props> = ({ title }) => {
  return <h2 className="text-xl font-semibold mb-4">{title}</h2>
}

export default PageTitle
