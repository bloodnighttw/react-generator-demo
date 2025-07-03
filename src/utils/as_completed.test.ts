import { expect, describe, it } from "vitest";
import { asCompleted } from "./as_completed";

describe("asCompleted", () => {

    it.concurrent("random order", async () => {
        const promises = [
            new Promise((resolve) => setTimeout(() => resolve("second"), 20)),
            new Promise((resolve) => setTimeout(() => resolve("first"), 10)),
            new Promise((resolve) => setTimeout(() => resolve("last"), 30)),
        ] as Promise<string>[];

        const g = asCompleted(promises);
        const results: string[] = [];

        for await (const value of g) {
            results.push(value);
        }

        expect(results).toEqual(["first", "second", "last"]);
    })

    it.concurrent("error handling", async () => {
        const promises = [
            new Promise((resolve) => setTimeout(() => resolve("first"), 10)),
            new Promise((_, reject) => setTimeout(() => reject(new Error("second error")), 20)),
            new Promise((resolve) => setTimeout(() => resolve("last"), 30)),
        ] as Promise<string>[];

        const g = asCompleted(promises);
        const results: string[] = [];

        try {
            for await (const value of g) {
                results.push(value);
            }
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toBe("second error");
        }

        // the last promise should not be executed
        expect(results).toEqual(["first"]);
    })
});


