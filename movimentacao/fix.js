const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'GeradorScript.js');
console.log('Fixing:', targetFile);

try {
    const data = fs.readFileSync(targetFile, 'utf8');
    const lines = data.split(/\r?\n/);

    console.log('Total Lines:', lines.length);

    // We want to keep lines up to index 4050 (line 4051 in 1-based editor view)
    // Line 4050 is '}'
    // Discard everything after.

    if (lines.length > 4050) {
        // Keep 0 to 4051 (creates array of size 4051, indices 0..4050)
        const fixedLines = lines.slice(0, 4051);

        // Ensure last valid line is '}'
        // (Just to be safe, we append the export anyway)

        const fixedContent = fixedLines.join('\n') + '\n\nexport default GeradorScript;';

        fs.writeFileSync(targetFile, fixedContent, 'utf8');
        console.log('File fixed successfully!');
    } else {
        console.log('File is smaller than expected, skipping truncation.');
    }
} catch (e) {
    console.error('Error fixing file:', e);
}
