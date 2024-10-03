const fs = require('fs');
const path = require('path');

const destinationPath = path.join(__dirname, '../dist/main/assets');

if (fs.existsSync(destinationPath)) {
    fs.rmSync(destinationPath, { recursive: true });
    fs.mkdirSync(destinationPath);
} else {
    fs.mkdirSync(destinationPath);
}

const source = path.join(__dirname, '../src/main/assets');
const destination = destinationPath; // Используем destinationPath напрямую

function copyFolderSync(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const items = fs.readdirSync(source, { withFileTypes: true });

    for (let item of items) {
        const sourcePath = path.join(source, item.name);
        const destinationPath = path.join(destination, item.name);

        if (item.isDirectory()) {
            copyFolderSync(sourcePath, destinationPath);
        } else {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
}

copyFolderSync(source, destination);
console.log(`Copied folder from ${source} to ${destination}`);