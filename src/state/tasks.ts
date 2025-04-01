import { atomWithStorage } from "jotai/utils"
import type { Task } from "@customTypes/types"

export const tasksAtom = atomWithStorage<Task[]>("tasks", [])
