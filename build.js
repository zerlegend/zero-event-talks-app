const fs = require('fs').promises;
const path = require('path');

async function build() {
    try {
        // Create dist directory if it doesn't exist
        await fs.mkdir('dist', { recursive: true });

        // Read the source files
        const html = await fs.readFile('src/index.html', 'utf-8');
        const css = await fs.readFile('src/style.css', 'utf-8');
        const js = await fs.readFile('src/script.js', 'utf-8');
        const talksData = await fs.readFile('talks.json', 'utf-8');

        // Inject the talks data into the JavaScript
        const finalJs = js.replace('const talks = [];', `const talks = ${talksData};`);

        // Inject CSS and JavaScript into the HTML
        let finalHtml = html.replace('</head>', `<style>${css}</style></head>`);
        finalHtml = finalHtml.replace('</body>', `<script>${finalJs}</script></body>`);

        // Write the final HTML file
        await fs.writeFile('dist/index.html', finalHtml);

        console.log('Build successful! Your single-page website is ready in dist/index.html');

    } catch (error) {
        console.error('Build failed:', error);
    }
}

build();
