export type ButtonProps = {
  filter: string
  currentFilter: string
  title: string
  setFilter: (filter: string) => void
}
export default function Button({ filter, title, currentFilter, setFilter }: ButtonProps) {
  let classSpecs = 'px-4 rounded text-gray-700 dark:text-white'

  if (currentFilter === filter) classSpecs += ' bg-blue-500 text-white'
  return (
    <button onClick={() => setFilter(filter)} className={classSpecs} >
      {title}
    </button>
  )
}
