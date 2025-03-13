# contributing to task manager

## project setup

### clone the repository and install dependencies
```sh
git clone <repo-url>
cd react-take-home-exercise
pnpm install
```

### run the development server
```sh
pnpm dev
```
this will start the project locally at `http://localhost:5173`.

---

## code guidelines

i follow **clean code** principles and **solid** design patterns to keep the codebase maintainable. here are the key guidelines:

### ** folder structure**
the project is structured as follows:
```
src
 ├── components          
 │   ├── __tests__       
 │   ├── deleteconfirmation.tsx
 │   ├── taskfilter.tsx
 │   ├── taskitem.tsx
 │   ├── taskmanager.tsx
 │
 ├── hooks               
 │   ├── usedeleteconfirmation.ts
 │   ├── usetaskmanager.ts
 │
 ├── services            
 │   ├── storageservice.ts
 │   ├── taskservice.ts
 │
 ├── tests               
 │   ├── setup.ts
 │
 ├── app.tsx
 ├── main.tsx
 ├── index.css
 ├── index.html
 │
github                  
.gitignore
readme.md
package.json
tsconfig.json
vite.config.ts
tailwind.config.js
postcss.config.js
pnpm-lock.yaml
```
### **naming conventions**
- use **camelcase** for variables and functions.
- use **pascalcase** for react components.
- folder and file names should be **descriptive and consistent**.
- keep function and component names **meaningful**.

### **hooks & services separation**
- **hooks (`src/hooks/`)** should handle state and effects.
- **services (`src/services/`)** should handle logic, api calls, and storage.
- this ensures **single responsibility principle (srp)** is maintained.

---

## testing strategy

i use **vitest** and **react testing library** to ensure the application functions correctly.

### running the tests**
```sh
pnpm test
```
this runs all tests inside `src/components/__tests__/` and other test directories.

### **testing setup**
global test configurations are in `src/tests/setup.ts`. this ensures that vitest is correctly set up and includes necessary utilities for testing.

### **how i write tests**
- **component tests** go inside `src/components/__tests__/`.
- i use **react testing library** to interact with the ui.
- mocking is done using **vitest's `vi.fn()`**.
- tests follow a **given-when-then** structure.

---

## ci/cd & pull requests

### **before you commit**
run tests and ensure your code follows best practices:
```sh
pnpm test
```

### **pull request guidelines**
- feature branches should be named using the convention: `feature/branch-name`.
- bug fixes should be named: `fix/bug-description`.
- before opening a pr, ensure:
  - tests pass.
  - code follows clean code & solid principles.
  - ci/cd pipeline does not fail.
---

## additional tools

### **automating with makefile**
i use a `makefile` to enforce testing before running the app:
```make
install:
	pnpm install

start:
	pnpm test && pnpm dev

test:
	pnpm test

build:
	pnpm test && pnpm build
```
now, running:
```sh
make start
```
**ensures that tests pass before launching the app.**

---