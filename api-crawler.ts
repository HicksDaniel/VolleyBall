import fs from "fs";


const BASE_URL = "https://provolleyball.com/api";

const DOC_PATHS = [
    "api",
    "api/",
    "api/index",
    "api/v1",
    "api/v2",

    "api/docs",
    "api/doc",
    "api/documentation",

    "api/swagger",
    "api/swagger.json",
    "api/swagger.yaml",

    "api/openapi",
    "api/openapi.json",
    "api/openapi.yaml",

    "api/schema",
    "api/routes",
    "api/endpoints",

    "api/.well-known",
    ".well-known/openapi.json",

    // Laravel / Symfony
    "api/_debug",
    "api/debug",
    "api/_routes",
    "api/routes.json",
    "api/laravel",
    "api/telescope",
    "api/horizon",

    // Generic
    "api/config",
    "api/meta",
    "api/status",
    "api/health",
    "api/version",

    // Legacy / accidental
    "swagger",
    "openapi.json",
    "v1/swagger",
    "v1/openapi",
    "v1/docs"
];

const WORDLIST = [
    "teams",
    "rosters",
    "players",
    "player-rosters",
    "schedule-events",
    "standings",
    "articles",
    "news",
    "seasons",
    "venues",
    "stats",
    "statistics",
    "games",
    "events",
    "media",
    "galleries",
    "logos"
];


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function extractKeys(obj: any, prefix = ""): string[] {
    if (typeof obj !== "object" || obj === null) return [];

    return Object.keys(obj).flatMap(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        return [
            fullKey,
            ...extractKeys(obj[key], fullKey)
        ];
    });
}

async function probeDocs() {
    console.log("\n📚 Probing documentation endpoints...\n");

    for (const path of DOC_PATHS) {
        const url = `https://provolleyball.com/${path}`;

        try {
            const res = await fetch(url, {
                headers: { "User-Agent": "api-doc-crawler" }
            });

            if (res.status !== 404) {
                const ct = res.headers.get("content-type");
                console.log(`📘 ${res.status} ${url} (${ct})`);
            }
        } catch {
            // intentionally ignore
        }

        await delay(200);
    }
}

async function probeEndpoint(path: string) {
    const url = `${BASE_URL}/${path}`;

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": "api-doc-crawler" }
        });

        if (res.status !== 404) {
            const contentType = res.headers.get("content-type");
            console.log(`✅ ${res.status} ${url} (${contentType})`);

            if (contentType?.includes("application/json")) {
                const json = await res.json();

                const keys = extractKeys(json);

                fs.mkdirSync("keys", { recursive: true });
                fs.writeFileSync(
                    `keys/${path}.keys.json`,
                    JSON.stringify([...new Set(keys)], null, 2)
                );
            }

            return {
                path,
                status: res.status,
                contentType
            };
        }
    } catch (err) {
        console.error(`❌ Error hitting ${url}`, err);
    }

    return null;
}



async function run() {
    // 1️⃣ Probe documentation first
    await probeDocs();

    console.log("\n🔎 Probing API endpoints...\n");

    const results: any[] = [];

    for (const word of WORDLIST) {
        const result = await probeEndpoint(word);
        if (result) results.push(result);



        await delay(300);
    }

    fs.writeFileSync(
        "discovered-endpoints.json",
        JSON.stringify(results, null, 2)
    );

    console.log("\n✨ Discovery complete");
}

// 🚀 Start crawler
run().catch(console.error);
