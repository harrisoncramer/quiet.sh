import type {Config} from "@jest/types";

// https://jestjs.io/docs/configuration
// https://github.com/kulshekhar/ts-jest
const config: Config.InitialOptions = {
  roots: ["./server"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
};

export default config;
