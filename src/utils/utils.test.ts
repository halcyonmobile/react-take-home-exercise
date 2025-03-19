import '@testing-library/jest-dom'
import { findLastIndex } from './utils';
import { Task } from '../components/TaskManager/TaskManager';

describe('utils', () => {  
    it("findLastIndex", () => {
      const taskArray = [
        {id: 1 , completed: true ,title: 'Placeholder'},
        {id: 2 , completed: true ,title: 'Placeholder'},
      ] as Task[]
      const taskArray2 = [
        {id: 2 , completed: true ,title: 'Placeholder'},
        {id: 3 , completed: true ,title: 'Placeholder'},
      ] as Task[]
      const taskArray3 = [
        {id: 1 , completed: true ,title: 'Placeholder'},
        {id: 3 , completed: true ,title: 'Placeholder'},
      ] as Task[]
      const lastIndex = findLastIndex(taskArray)
      expect(lastIndex).toBe(2)
      const lastIndex2 = findLastIndex(taskArray2)
      expect(lastIndex2).toBe(3)
      const lastIndex3 = findLastIndex(taskArray3)
      expect(lastIndex3).toBe(3)

  
  })
})