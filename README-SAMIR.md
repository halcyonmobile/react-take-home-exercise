# Task Manager Application - Samir Souza's Implementation

[View Original Requirements](./README.md)

## Live Demo
🚀 [View Live Application](https://react-take-home-exercise.onrender.com/)

## Overview
This solution implements a Task Manager application using React, TypeScript, and Tailwind CSS. The application allows users to create, manage, and filter tasks with a clean and responsive interface.

## Key Features Implemented

### Core Functionality
- Add new tasks with unique IDs
- List all tasks with proper styling
- Mark tasks as completed/uncompleted
- Delete tasks with confirmation dialog
- Filter tasks by status (All, Completed, Pending)
- Persistent storage using localStorage
- Responsive design for all screen sizes

### Technical Improvements
1. **TypeScript Integration** (`src/types/index.ts`)
   - Added types: `Task`, `TaskFilterStatus`, `ButtonVariant`
   - Implemented interfaces for component props: `TaskItemProps`, `TaskListProps`, `ButtonProps`
   - Enhanced code reliability with proper type checking across components

2. **State Management** (`src/hooks/useTasks.ts`)
   - Created custom `useTasks` hook for centralized task management
   - Implemented callback-based state updates: `addTask`, `deleteTask`, `toggleTask`
   - Added task filter logic in `filterTasks` utility (`src/utils/task.ts`)

3. **UI/UX Enhancements**
   - Implemented consistent Tailwind CSS styling
   - Added confirmation dialog (`src/components/DeleteConfirmationDialog.tsx`)
   - Created reusable Button component (`src/components/shared/Button.tsx`)
   - Improved responsive design with breakpoints (`sm:`, `md:`, `lg:` classes)

4. **Code Quality**
   - Separated concerns: `TaskManager.tsx`, `TaskList.tsx`, `TaskItem.tsx`
   - Implemented proper file structure:
     ```
     src/
     ├── components/
     │   ├── shared/
     │   │   └── Button.tsx
     │   ├── TaskItem.tsx
     │   ├── TaskList.tsx
     │   └── TaskManager.tsx
     ├── hooks/
     │   └── useTasks.ts
     ├── types/
     │   └── index.ts
     └── utils/
         └── task.ts
     ```
   - Added unit tests in `__tests__` directories
   - Used React patterns: `useCallback`, `useState`, `useEffect`

## Changelog

### Bug Fixes
- Fixed task filter functionality (`src/utils/task.ts` - `filterTasks` function)
- Resolved task deletion UI update issue (`src/hooks/useTasks.ts` - `deleteTask` callback)
- Corrected styling inconsistencies (`src/components/shared/Button.tsx` - Tailwind classes)
- Fixed TypeScript warnings and errors (`src/types/index.ts`)

### New Features
- Added local storage persistence (`src/hooks/useTasks.ts` - `STORAGE_KEY`)
- Implemented confirmation dialog (`src/components/DeleteConfirmationDialog.tsx`)
- Created shared Button component with variants (`src/components/shared/Button.tsx`)
- Added responsive design (`sm:`, `md:`, `lg:` classes in components)
- Implemented group button for task status (`src/components/TaskStatusFilter.tsx`)
- Added test suite (`src/__tests__/` directory)
- Deployed application with CI/CD pipeline (`render.yaml`)

### Code Improvements
- Consolidated task-related files under `src/components/`
- Normalized naming conventions (eg: `TaskItem.tsx`, `TaskList.tsx`)
- Implemented `useTasks` custom hook (`src/hooks/useTasks.ts`)
- Added TypeScript types (`src/types/index.ts`)
- Improved component organization:
  ```typescript
  // src/components/TaskItem.tsx
  interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }

## Technical Decisions

### State Management
- Chose custom hook over Redux/Context due to application size
- Example from `useTasks.ts`:
  ```typescript
  const [tasks, setTasks] = useState<Task[]>(getStoredTasks);
  const addTask = useCallback((title: string) => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }, []);
  ```

### Component Architecture
- Created reusable components:
  ```typescript
  // src/components/shared/Button.tsx
  export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    children,
    ...props
  }) => {
    // implementation
  };
  ```
- Separated business logic:
  ```typescript
  // src/hooks/useTasks.ts
  export const useTasks = () => {
    // Task management logic
    return { tasks, addTask, deleteTask, toggleTask };
  };
  ```

### Testing Strategy
- Unit tests structure:
  ```
  src/__tests__/
  ├── components/
  │   ├── TaskItem.test.tsx
  │   └── TaskList.test.tsx
  ├── hooks/
  │   └── useTasks.test.ts
  └── utils/
      └── task.test.ts
  ```
- Test example:
  ```typescript
  // src/__tests__/hooks/useTasks.test.ts
  describe('useTasks', () => {
    it('should add new task correctly', () => {
      // test implementation
    });
  });
  ```

### Deployment
- Set up deployment on Render.com with configuration:
  ```yaml
  # render.yaml
  services:
    - type: web
      name: task-manager
      env: static
      buildCommand: pnpm install --frozen-lockfile && pnpm test && pnpm run build
  ```

## Future Improvements
1. Add task categories or tags
2. Implement task due dates
3. Add task priority levels
4. Implement task search functionality
5. Add keyboard shortcuts
6. Implement drag-and-drop task reordering
7. Add task descriptions or notes
8. Implement user authentication
9. Add task sharing capabilities
10. Implement task export/import functionality

## Development Practices
- Used conventional commits for clear version history
- Implemented proper code review practices
- Maintained consistent code style
- Added comprehensive documentation
- Followed React best practices

## Running Locally
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run tests: `pnpm test`
4. Start development server: `pnpm dev`
5. Build for production: `pnpm build`

## Contact
For any questions or clarifications about the implementation, please feel free to reach out.
- Samir.souza@gmail.com
- +55 98 98777 8050
- https://www.linkedin.com/in/samir-souza/

Thank you for reviewing my solution! 🙌

---

## Detailed Changelog

### TypeScript and Initial Fixes
1. **[76942d66]** chore: add typescript types
   - Added new types to support application functionality
   - File: `src/types/index.ts`

2. **[cf750de1]** feat: add, filter, and showing tasks correctly
   - Solved filter conditions bug
   - Implemented type safety across components
   - Added proper task state management with setState callback
   - Fixed TaskItem component styling and props
   - Files: `src/components/TaskItem.tsx`, `src/utils/task.ts`

### UI Components and Styling
3. **[591d4c5e]** feat: update task status filter buttons
   - Created shared Button component with variants
   - Added children node support
   - File: `src/components/shared/Button.tsx`

4. **[f85fa660]** feat: delete SOLVED, new task fixed
   - Fixed task deletion with proper state updates
   - Implemented correct ID generation for new tasks
   - Files: `src/hooks/useTasks.ts`

5. **[dd007c8b]** feat: SOLVED - Styling Inconsistencies
   - Standardized Button component usage
   - Added variant and type props
   - Unified code style (double quotes)
   - Enhanced Tailwind styling
   - Files: `src/components/**/*.tsx`

### Enhanced UI/UX
6. **[91c895d2]** feat: responsiveness style
   - Added Tailwind breakpoints
   - Implemented responsive design
   - Files: Various component files

7. **[066c710a]** feat(ui): restyle task status buttons into group button
   - Enhanced filter buttons UI
   - File: `src/components/TaskStatusFilter.tsx`

8. **[59985f7b]** feat(Improved UI/UX): Implement a confirmation dialog
   - Added delete confirmation dialog
   - File: `src/components/DeleteConfirmationDialog.tsx`

### Code Organization and State Management
9. **[2c3a8e81]** refactor: consolidate task-related files
   - Normalized naming conventions
   - Improved button styling and responsiveness
   - Files: Multiple component files

10. **[f0973f35]** feat: implement useTasks hook
    - Centralized task state management
    - Implemented task operations (add, delete, toggle, filter)
    - File: `src/hooks/useTasks.ts`

11. **[af283894]** refactor: refactor TaskManager with useTasks
    - Separated concerns with custom hook
    - Added performance optimizations (memo, useCallback)
    - File: `src/components/TaskManager.tsx`

### Testing and Configuration
12. **[0ab42f21]** chore: update .gitignore
    - Excluded test coverage reports
    - File: `.gitignore`

13. **[3c4f1a54]** test: add Jest configuration
    - Set up testing environment
    - Files: `jest.config.js`, `jest.setup.js`

14. **[feat/test]** feat: add Persistence from local storage
    - Implemented localStorage persistence
    - Added related tests
    - Files: `src/hooks/useTasks.ts`, `src/__tests__/hooks/useTasks.test.ts`

### Deployment and CI/CD
15. **[render01]** feat(deploy): add Render.com deployment configuration
    - Added render.yaml
    - Configured static site deployment
    - Set up SPA routing
    - File: `render.yaml`

16. **[render02]** feat(ci/cd): configure branch environments
    - Set up main and samir-souza-solution branches
    - Configured environments (production/preview)
    - Added CI/CD pipeline with testing
    - File: `render.yaml`

Each commit represents a significant improvement to the application, following a logical progression from basic functionality to advanced features and deployment configuration.


## Some commits explained

