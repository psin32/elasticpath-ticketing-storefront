import { NextRequest } from "next/server";
import { middlewareRunner } from "./lib/middleware/middleware-runner";
import { epccCartMiddleware } from "./lib/middleware/epcc-cart-middleware";
import { implicitAuthMiddleware } from "./lib/middleware/implicit-auth-middleware";

export async function middleware(req: NextRequest) {
    return middlewareRunner(
        {
            runnable: implicitAuthMiddleware,
            options: {
                exclude: ["/_next", "/configuration-error"],
            },
        },
        {
            runnable: epccCartMiddleware,
            options: {
                exclude: ["/_next", "/configuration-error"],
            },
        },
    )(req);
}
