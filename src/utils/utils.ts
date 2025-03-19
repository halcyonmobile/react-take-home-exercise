import { Task } from "../components/TaskManager/TaskManager";

export const findLastIndex = (tasks: Task[]) => {
    if (tasks?.length === 0 ) return 0
    const indexes = tasks.map(task => task.id)
    return Math.max(...indexes) 
}   