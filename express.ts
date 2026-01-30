import express from "express";
import fetch, { AbortError } from "node-fetch";
import cors from "cors";
import type { Request, Response } from "express";

const app = express();

/**
 * 1. Allowlist ONLY the domain you intend to talk to
 *    (bare hostname, no protocol, no path)
 */
const ALLOWED_HOSTS = new Set(["provolleyball.com"]);

/**
 * 2. Restrict CORS to your frontend(s)
 */
app.use(
    cors({
        origin: ["http://localhost:5173", "https://localhost:5173"],
        methods: ["GET"]
    })
);

app.get("/api/stats", async (req: Request, res: Response) => {
    const rawUrl = req.query.url;

    if (typeof rawUrl !== "string") {
        return res.status(400).json({ error: "Missing or invalid url parameter" });
    }

    /**
     * 3. Parse the URL safely
     */
    let target: URL;
    try {
        target = new URL(rawUrl);
    } catch {
        return res.status(400).json({ error: "Malformed URL" });
    }

    /**
     * 4. Enforce HTTPS
     */
    if (target.protocol !== "https:") {
        return res.status(400).json({ error: "Only HTTPS URLs are allowed" });
    }

    /**
     * 5. Host allowlist check (SSRF protection)
     */
    if (!ALLOWED_HOSTS.has(target.hostname)) {
        return res.status(403).json({ error: "Host not allowed" });
    }

    /**
     * 6. Path restriction: ONLY /api/*
     */
    if (!target.pathname.startsWith("/api")) {
        return res.status(403).json({ error: "Only /api routes are allowed" });
    }

    /**
     * 7. Timeout protection
     */
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(target.toString(), {
            signal: controller.signal,
            headers: {
                "Accept": "application/json",
                "User-Agent": "pvf-backend/1.0"
            }
        });

        if (!response.ok) {
            return res.status(502).json({
                error: "Upstream error",
                status: response.status
            });
        }

        /**
         * 8. Validate response type
         */
        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
            return res.status(502).json({ error: "Invalid upstream response type" });
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        if (err instanceof AbortError) {
            return res.status(504).json({ error: "Upstream request timed out" });
        }

        console.error("Backend fetch failed:", err);
        res.status(500).json({ error: "Backend fetch failed" });
    } finally {
        clearTimeout(timeout);
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
