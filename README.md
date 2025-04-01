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

1. **Task Filter Bug:**

   - The filter functionality is not working as expected. Changing the filter does not update the task list correctly.

2. **Task Deletion Issue:**

   - Deleting a task does not immediately update the UI, causing a delay or inconsistency in the displayed task list.

3. **Styling Inconsistencies:**

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


# Implementation Details

## Changes Implemented

### 1. **State Management with Jotai**
- Added **Jotai** for state management since no state management solution was previously in place.
- Created an atom (`tasksAtom`) using `atomWithStorage`, allowing tasks to persist in local storage.
- Implemented the `useTasks` hook to manage tasks using `useAtom`.
- Chose Jotai because it is lightweight and simple for small projects. For a large-scale project, Redux and its ecosystem would be a better choice.

### 2. **Bug Fixes**
- **Task Filtering Issue:**
  - Fixed the filtering logic in `useTasks` to correctly return completed, pending, or all tasks based on the selected filter.
  - Previously, tasks were not updating correctly when switching between filters, causing inconsistencies in the displayed list.
- **Task Deletion Issue:**
  - Fixed an issue where deleting a task did not immediately update the UI.
  - The issue was caused by a stale state reference, which has been resolved by properly updating the state after deletion.

### 3. **Code Refactoring & Improvements**
- Improved code modularity by extracting task-related logic into `useTasks`.
- Used **TypeScript** for strict type safety, ensuring correctness across components.
- Created a utility function `getNewTaskId` to ensure new tasks have unique IDs.

### 4. **UI Enhancements**
- Improved UI consistency by refining **Tailwind CSS** styles.
- Applied `framer-motion` animations to enhance user experience.
- Added a confirmation modal (`ConfirmModal`) before deleting a task.

### 5. **Testing Improvements**
- Fixed warnings related to `Headless UI` by adding **jsdom-testing-mocks**.
- Ensured all test cases pass successfully.
- Added tests to verify that:
  - Tasks are added correctly and persist in the state.
  - Tasks can be marked as completed or pending.
  - The delete confirmation modal appears before deletion.
  - Task filtering updates the list correctly.

## Assumptions Made
- **Local Storage Persistence:**
  - Tasks should persist between page reloads, so `atomWithStorage` is used.
- **Task IDs:**
  - Each task must have a unique `id`, handled by `getNewTaskId`.
- **Task Filtering Logic:**
  - Tasks should be filtered dynamically based on their completion status.

## How to Test the Improvements

### 1. **Run the Application**
```bash
pnpm dev
```
- Open `http://localhost:5173` in a browser.
- Ensure the UI loads without errors.

### 2. **Test Task Functionality**
#### a) Adding a Task
- Enter a task name and click **Add**.
- The task should appear in the list.

#### b) Marking a Task as Completed
- Click on a task to toggle its completion status.
- It should visually update based on the filter applied.

#### c) Deleting a Task
- Click the delete button for a task.
- A confirmation modal should appear.
- Confirm deletion; the task should be removed.

#### d) Filtering Tasks
- Click each filter option (**All**, **Completed**, **Pending**).
- Tasks should update accordingly.

### 3. **Run Tests**
```bash
pnpm test
```
- Ensure all test cases pass without errors.
