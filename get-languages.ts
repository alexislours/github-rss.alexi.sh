import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const SELECTOR = "#languages-menuitems > div > a"

const url = `https://github.com/trending`;
const body = await fetch(url)
    .then(res => res.text());
const document = new DOMParser().parseFromString(
    body,
    "text/html"
);

const LANGUAGES = document.querySelectorAll(SELECTOR)

let result: {id: string, label: string}[] = []

result.push({id: '', label: 'All Languages'})

LANGUAGES.forEach((language) => {
    result.push({
        id: language.getAttribute("href")
                    .replace(
                        "/trending/",
                        ""
                    )
                    .replace(
                        "?since=daily",
                        ""
                    ),
        label: language.innerText.trim()
    })
})

let initialCount = result.length;
result = result.filter((language, index, self) => {
    return index === self.findIndex((l) => (
        l.id === language.id
    ))
})

console.log(`Found ${initialCount - result.length} duplicates, ${result.length} unique languages.`)

const results = `export const TIME_PERIODS: {id: string, label: string}[] = [
    {
        id: 'daily',
        label: 'Daily'
    },
    {
        id: 'weekly',
        label: 'Weekly'
    },
    {
        id: 'monthly',
        label: 'Monthly'
    }
]

export const LANGUAGES: {id: string, label: string}[] = ${JSON.stringify(
    result,
    null,
    2
)};`

await Deno.writeTextFile(
    "./src/app.constants.ts",
    results
);

