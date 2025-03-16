# React Take-Home Challenge: Task Manager App

## Overview

This exercise is designed to assess your proficiency with React, TypeScript and Tailwind CSS. In this project, you'll work on a simple Task Manager application that allows users to add, view, and manage tasks. Your goal is to review the existing codebase, identify issues, and implement fixes and enhancements.

Your work will be evaluated on:

- **Bug Fixes:** Correcting the identified issues.
- **Code Quality:** Clean, modular, and well-typed code.
- **UI/UX:** Consistent and responsive styling using Tailwind CSS.
- **Optional Enhancements:** Going the extra mile with additional features like local storage or tests.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20 or above)
- **pnpm (v9)**

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone git@github.com:halcyonmobile/react-take-home-exercise.git
   pushd react-take-home-exercise
   ```

2. **Install dependencies:**

   ```bash
   pnpm i
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **View the app:**

   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal) to see the application in action.

## Exercise Details

### Application Functionality

The Task Manager app includes the following core features:

- **Adding Tasks:** Users can create new tasks.
- **Listing Tasks:** A list view displays all tasks.
- **Marking Tasks as Completed:** Users can mark tasks as done.
- **Deleting Tasks:** Remove tasks from the list.
- **Filtering Tasks:** Filter tasks by status (All, Completed, Pending).

### Issues to Address

While reviewing the project, please identify and resolve the following issues:

1. **SOLVED - Task Filter Bug:** 

   - The filter functionality is not working as expected. Changing the filter does not update the task list correctly.

2. **SOLVED - Task Deletion Issue:**

   - Deleting a task does not immediately update the UI, causing a delay or inconsistency in the displayed task list.

3. **SOLVED -Styling Inconsistencies:**

   - Some UI elements are not using Tailwind CSS classes consistently. Ensure the layout, spacing, and colors align with the provided design guidelines.

4. **TypeScript Warnings/Errors:**

   - Several components may have missing or incorrect type definitions. Address all TypeScript warnings to ensure robust type safety.

5. **Code Refactoring:**
   - The current code structure has redundant logic and lacks modularity. Refactor the code to improve readability and maintainability.

### Optional Enhancements

If time permits, consider implementing one or more of the following:

- **Persistence:**
  - Implement functionality to save and retrieve tasks from local storage or a remote API, ensuring that the task list persists across page reloads.
- **Improved UI/UX:**
  - Enhance the user interface with additional styling improvements or animations to improve user experience.
  - Implement a confirmation dialog when deleting a task.
- **Improved UI/UX:**
  - Deploy the app
  - Create a CI/CD pipeline that will automatically deploy/release the app when changes were made.
- **Unit Testing:**
  - Write tests for key components using your preferred testing framework (e.g., Jest, React Testing Library).

## Submission Instructions

- **Repository:** Fork the repository for your changes.
- **Pull Request:** Once completed, submit one or more pull requests to showcase your changes.
- **Documentation:** Include a brief explanation of your changes, any assumptions made, and instructions on how to test your improvements.

### CHANGES
- 76942d66a5830 - chore: add typescript types
  - Add new types to better support the application's functionality.

- cf750de1cd3ed - feat: add, filter, and showing tasks correctly

  - SOLVED: The filter conditions

  - use the types to ensure type safety
  - add tasks correctly: guarantee that the tasks are added with the correct status, use the defined type, and use the callback form from setState to update the task list.

  - toggle TaskCompletion: use correct taskType 

  - TaskItem Component: style working correctly, correct props types

- 591d4c5ee607d - feat: update task status filter buttons
  - create a shared button component with variants and receiving a children node


- f85fa6607e92f - feat: delete SOLVED, new task fixed
  - SOLVED - Task Deletion Issue. Use the callback form from setState to filter the current data and remove the task with the id.
  - Generate a new item with the correct new id

- dd007c8bfbe18 - feat - SOLVED - Styling Inconsistencies
  - Delete and add button - use the Button component
  - Button component - adjusted to use variants and the type prop
  - Some codestyle adjustments - quotes for double quotes
  - Tailwind class adjustments for better styling

- 91c895d2d1889 - feat: responsiveness style
  - add breakpoints using tailwind parameters

- 066c710a91d6f - feat(ui): restyle task status buttons into group button

## Evaluation Criteria

Your submission will be evaluated based on:

- Correctness and completeness of bug fixes.
- Overall code quality and maintainability.
- Effective use of React hooks, TypeScript, and Tailwind CSS.
- The clarity and efficiency of your solution.
- Bonus points for optional enhancements and well-written tests.

## Additional Notes

- **Functionality:** Ensure your solution runs without errors.
- **Clean Code:** Focus on writing clean, well-documented, and modular code.
- **Clarifications:** If you have any questions or need further clarifications during the exercise, feel free to reach out.

Good luck, and we look forward to reviewing your submission!
