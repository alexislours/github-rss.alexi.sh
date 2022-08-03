import {DOMParser} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import {LANGUAGES, TIME_PERIODS} from "./src/app.constants.ts";

const DELAY = 600;

type Repository = {
    name: string,
    description: string,
}

const REPOSITORIES: any = {};

LANGUAGES.forEach((language: {id: string, label: string}) => {
    REPOSITORIES[language.id] = {}
    TIME_PERIODS.forEach((timePeriod: {id: string, label: string}) => {
        REPOSITORIES[language.id][timePeriod.id] = []
    })
})

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchRepositories = async (language: string, timePeriod: string) => {
    const repositories: Repository[] = [];
    const url = `https://github.com/trending${language ? '/' + language : ''}${`?since=${timePeriod}`}`;
    console.log(`Fetching ${url}`);
    const body = await fetch(url).then(res => res.text());
    const document = new DOMParser().parseFromString(body, "text/html");
    if (!document.querySelector('.Box')) {
        throw new Error(`GitHub is down or hit rate limit`);
    }
    if (document.querySelector(".Box-row")) {
        document.querySelectorAll(".Box-row").forEach((row) => {
            repositories.push({
                name: row.querySelector('h1 > a').innerText.replace(/\s/g, ''),
                description: row.querySelector('p')?.innerText.trim() || '',
            });
        });
        console.log(`Found ${repositories.length} repositories`);
        REPOSITORIES[language][timePeriod] = repositories;
        await sleep(1000);
    } else {
        console.log(`No repositories found for ${language} ${timePeriod}`);
        REPOSITORIES[language][timePeriod] = [];
        await sleep(300);
    }
}

const fetchAll = async () => {
    for (let i = 0; i < LANGUAGES.length; i++) {
        for (let j = 0; j < TIME_PERIODS.length; j++) {
            await fetchRepositories(LANGUAGES[i].id, TIME_PERIODS[j].id);
        }
    }
}

await fetchAll();
await Deno.writeTextFile("./feeds.json", JSON.stringify(REPOSITORIES, null, 2));