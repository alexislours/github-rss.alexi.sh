const data = JSON.parse(Deno.readTextFileSync('./feeds.json'));
import {LANGUAGES, TIME_PERIODS} from "./src/app.constants.ts";

const XMLEncode = (str: string) => {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

Object.keys(data).forEach((language) => {
    Object.keys(data[language]).forEach((timePeriod) => {
        const langLabel = LANGUAGES.find(l => l.id === language)?.label || '';
        const timeLabel = TIME_PERIODS.find(t => t.id === timePeriod)?.label || '';
        let langId;
        if (language === '') langId = 'all';
        let RSS = `<rss version="2.0">
    <channel>
        <title>${XMLEncode(`GitHub Trending ${langLabel} - ${timeLabel}`)}</title>
        <description>${XMLEncode(`Daily Trending ${langLabel} repositories on GitHub`)}</description>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <link>https://github-rss.alexi.sh</link>`
        data[language][timePeriod].forEach((repo) => {
            RSS += `
    <item>
        <title>${XMLEncode(`${repo.name}`)}</title>
        <description>${XMLEncode(`${repo.description}`)}</description>
        <link>${XMLEncode(`https://github.com/${repo.name}`)}</link>
    </item>`
        });
        RSS += `
    </channel>
</rss>`
        Deno.writeTextFile(`./static/feeds/${timePeriod}/${decodeURIComponent(langId) ?? decodeURIComponent(language)}.xml`, RSS);
    });
});