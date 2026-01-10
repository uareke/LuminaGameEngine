
import fs from 'fs';

try {
    const html = fs.readFileSync('dist/index.html', 'utf8');
    console.log('--- INDEX.HTML CONTENT START ---');
    console.log(html);
    console.log('--- INDEX.HTML CONTENT END ---');

    // Check for base tag
    if (html.includes('<base')) {
        console.log('WARNING: Found <base> tag!');
    }

    // Check for script src
    const scriptMatch = html.match(/<script[^>]+src=["']([^"']+)["']/);
    if (scriptMatch) {
        console.log('Script source:', scriptMatch[1]);
        if (scriptMatch[1].startsWith('/lumina/')) {
            console.log('PASS: Script path is EXPLICIT SUBDIRECTORY');
        } else {
            console.log('FAIL: Script path is NOT /lumina/');
        }
    }

    // Check for css link
    const cssMatch = html.match(/<link[^>]+href=["']([^"']+)["']/);
    if (cssMatch) {
        console.log('CSS source:', cssMatch[1]);
        if (cssMatch[1].startsWith('/')) {
            console.log('FAIL: CSS path is ABSOLUTE');
        } else {
            console.log('PASS: CSS path is RELATIVE');
        }
    }

} catch (e) {
    console.error('Error reading index.html:', e.message);
}
