import { setupServer } from "msw/node";
import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:5000/api/combined-data", (req, res, ctx) => {
        return res(ctx.json([
            { id: 1, name: "Engineering", users: [{ id: 1, name: "Alice" }] }
        ]));
    }),
];

export const server = setupServer(...handlers);
