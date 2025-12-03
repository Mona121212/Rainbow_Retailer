// import the generated route tree

import { createRouter } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";
//create a new router instance

const router = createRouter({ routeTree });

// register the router instance for type safety

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
    
}

export default router;