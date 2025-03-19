import { Dispatch, SetStateAction } from 'react'
import Button from '../Buttons/Button'
type Filter = {
  currentFilter: string;
  setFilter: Dispatch<SetStateAction<string>>
}
export default function Filter({ currentFilter, setFilter }: Filter) {

  return (
    <>
      <Button
        filter="all"
        currentFilter={currentFilter}
        data-testid="all-button"
        title={"All"}
        setFilter={setFilter}
      />
      <Button
        filter="completed"
        title={"Completed"}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
      <Button
        filter="pending"
        title={"Pending"}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
    </>
  )
}
