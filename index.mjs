// Import h3 as npm dependency
import { createApp, createRouter, defineEventHandler, readBody, getHeaders, createError, sendError } from "h3";
import { authorization } from './config.mjs'

// Create an app instance
export const app = createApp();

// Create a new router and register it in app
const router = createRouter();
app.use(router);

// Add a new route that matches GET requests to / path
router.post("/", defineEventHandler(async event => {
	const headers = getHeaders(event);
	if (headers.authorization !== authorization) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

    const body = await readBody(event);

    const completedFetch = await fetch(body.url, body.reqOpts)

    return {
        status: completedFetch.status,
        body: completedFetch.body()
    };
}));