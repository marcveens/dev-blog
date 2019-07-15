import * as fs from 'fs';
import * as frontmatter from 'gray-matter';
import * as glob from 'glob';
import * as dayjs from 'dayjs';

type PageAttributes = {
    slug: string;
    published: boolean;
};

type SitemapEntry = {
    url: string;
    lastModified: string;
    published: boolean;
};

type Sitemap = SitemapEntry[];


const pageFiles = './content/blog/**/*.md';
const routingTableFileName = './public/sitemap.xml';


function getAllFilesFrom(path: string, callback: (err: Error | null, matches: string[]) => void) {
    glob(path, callback);
}

function getSitemapEntryFromFile(file: string): Promise<SitemapEntry> {
    return new Promise((resolve, reject) => {
        const stats = fs.statSync(file);
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject(err);

            const pageAttributes = frontmatter(data).data as PageAttributes;

            resolve({
                url: pageAttributes.slug,
                lastModified: dayjs(stats.mtime).format('YYYY-MM-DD'),
                published: pageAttributes.published
            });
        });
    });
}

function processSitemap(sitemapRecords: Sitemap) {
    const fileContent = 
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapRecords.filter(x => x.published).map(s => 
    `<url>
        <loc>https://www.marcveens.nl/${s.url}</loc>
        <lastmod>${s.lastModified}</lastmod>
    </url>`
    ).toString().replace(/\,/g, '')}
</urlset>`;

    fs.writeFile(routingTableFileName, fileContent, (err) => {
        if (err) console.log(err);

        console.log(`Sitemap succesfully generated (${sitemapRecords.length} entries)`);
    });
}

getAllFilesFrom(pageFiles, (err, files) => {
    const readFilePromises = [];

    files.forEach(file => readFilePromises.push(getSitemapEntryFromFile(file)));

    Promise.all(readFilePromises).then(processSitemap);
});