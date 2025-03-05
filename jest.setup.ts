import "@testing-library/jest-dom";
import { useTaskManagerStore, TaskManagerStore } from "@/store";

// first, we turn the useStore hook into a jest mock
jest.mock("@/store", () => ({
  useTaskManagerStore: jest.fn(),
}));

// jest.mocked allows us to keep type safety on useStore's defined types
// when defining mock implementation values
const useStoreMock = jest.mocked(useTaskManagerStore);

// we will import this method into our tests, allowing them to specify
// only those store values the test needs to care about
export const mockUseTaskManagerStore = (
  overrides: Partial<TaskManagerStore> = {}
) => {
  useStoreMock.mockImplementation((getterFn) => {
    return getterFn({
      // we include the store's actual values by default
      // this allows the mocked store to have complete functionality,
      // with "granular" mocks defined as specified by tests
      ...jest.requireActual("@/store").useTaskManagerStore(),
      ...overrides,
    });
  });
};

// this will set the default mock for the store on a per-test basis
// Note: setting this mock per test is a little heavy-handed, alternatively
// you can use beforeAll to set the default mock once per test suite
beforeEach(() => {
  mockUseTaskManagerStore();
});
