import { HelperOptions } from 'handlebars';

export default function page(this: Object, { fn, hash }: HelperOptions): string {
    return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/src/style.css">
        <title>${hash.title}</title>
    </head>
    <body>
        ${fn(this)}
    </body>
    </html>
    `;
}