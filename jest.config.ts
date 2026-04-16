export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testTimeout: 10000,
  clearMocks: true,
  detectOpenHandles: true
};