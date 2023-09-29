export const ssr = false; // this essentially turns our entire project into true SPA mode. No JS code will execute server side.

import { LoggedIn, isLoggedIn } from "../lib/auth.js";

export async function load() {
    await isLoggedIn();
}