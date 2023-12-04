const express = require('express');
const archiver = require('archiver');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 2000;
const logsFilePath = path.join(__dirname, 'logs.txt');

// Middleware for logging errors
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        fs.appendFile(logsFilePath, `${new Date().toISOString()} - ${err.stack}\n`, (err) => {
            if (err) {
                console.error(`Error writing to logs file: ${err}`);
            }
        });
    }
    next(err);
});

// Middleware to allow /download only from localhost
const allowLocalhostOnly = (req, res, next) => {
    const remoteAddress = req.connection.remoteAddress;
    console.log(remoteAddress);
    if (remoteAddress === '::1' || remoteAddress === '127.0.0.1' || remoteAddress === '::ffff:127.0.0.1') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

app.use(express.static('files'));

const generatedArchives = {};

app.get('/download', allowLocalhostOnly, async (req, res, next) => {
    try {
        const fileNames = JSON.parse(req.query.files);
        if (!fileNames || !Array.isArray(fileNames) || fileNames.length === 0) {
            return res.status(400).send('Invalid or empty file list.');
        }

        // Check if archive with the same files already exists
        const existingArchiveId = findExistingArchive(fileNames);
        if (existingArchiveId) {
            const existingDownloadLink = `http://downloads.hairstyles-gta5.com/download/${existingArchiveId}`;
            return res.send(existingDownloadLink);
        }

        // Create a unique identifier for the archive
        const uniqueId = crypto.randomBytes(8).toString('hex');
        const archiveFileName = `archive_${uniqueId}.zip`;
        const archivePath = path.join(__dirname, 'files-to-download', archiveFileName);

        // Create the archive
        const archive = archiver('zip', { zlib: { level: 9 } });
        const output = fs.createWriteStream(archivePath);

        // Add files to the archive
        fileNames.forEach((fileName) => {
            const filePath = path.join(__dirname, 'files', fileName);
            archive.file(filePath, { name: fileName });
        });

        archive.pipe(output);
        output.on('finish', () => {
            // Store information about the generated archive
            generatedArchives[uniqueId] = fileNames;

            // Generate the download link
            const downloadLink = `http://downloads.hairstyles-gta5.com/download/${uniqueId}`;

            // Respond with the download link only
            res.send(downloadLink);
        });
        archive.finalize();
    } catch (error) {
        next(error);
    }
});

// Function to find an existing archive with the same files
function findExistingArchive(fileNames) {
    for (const [id, files] of Object.entries(generatedArchives)) {
        if (arraysEqual(files, fileNames)) {
            return id;
        }
    }
    return null;
}

// Function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

app.get('/download/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const archiveFileName = `archive_${id}.zip`;
        const archivePath = path.join(__dirname, 'files-to-download', archiveFileName);

        // Send the archive as a response
        res.download(archivePath, archiveFileName, (err) => {
            if (err) {
                next(err);
            } else {
                // Remove the archive after successful download
                fs.unlink(archivePath, (err) => {
                    if (err) {
                        console.error(`Error deleting archive file: ${err}`);
                    } else {
                        // Remove the information about the generated archive
                        delete generatedArchives[id];
                    }
                });
            }
        });
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}`);
});
