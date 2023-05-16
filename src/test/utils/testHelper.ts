import path from "path";
import createLogger from "../../logger";

/**
 * @file This contains file fields and/or helper functions for use in Unit tests.
 *
 * Contains helper functions:
 * - createCustomLogger
 *
 * @author Bobby McGetrick
 */
const mockPath = path.join(__dirname, "mockModule.ts");

const mockModule = {
    filename: mockPath,
};

export function createCustomLogger() {
    return createLogger(mockModule as NodeJS.Module);
}
