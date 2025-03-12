import "@testing-library/jest-dom";
import { server } from "./__mocks__/server";

// Start the mock server before tests run
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
