import * as fs from "fs";
import path from "path";

export function folderPaths(directory) {
    // Define the directory path
    const directoryPath = path.join(process.cwd(), directory);

    const paths = getFolderPaths(directoryPath).map((paths) => {
        return paths.split(directory)[1]
    })
    
    return paths;
}

// Function to recursively read directory contents
function getFolderPaths(dir, folderList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            // Add the folder path to the list
            folderList.push(filePath);
            // Recursively call the function if it's a directory
            getFolderPaths(filePath, folderList);
        }
    });

    return folderList;
}

export async function getBlogPostMetadata(directory, folderNames) {
    const articles = await Promise.all(
        folderNames.map(
            (folder) =>
                new Promise((resolve) => {
                    // Construct the full file path
                    const filePath = path.join(directory, folder, 'page.mdx');

                    // Read the file using fs.readFile with a callback
                    fs.readFile(filePath, 'utf-8', (err, fileContent) => {
                        if (err) {
                            console.error(`Error reading file "${filePath}":`, err.message);
                            resolve(null); // Resolve as null if there's an error
                            return;
                        }

                        try {
                            // Extract the metadata object
                            const metadataMatch = fileContent.match(
                                /export\s+const\s+metadata\s+=\s+({[\s\S]*?});/
                            );

                            if (!metadataMatch) {
                                throw new Error(`Metadata not found in file: ${filePath}`);
                            }

                            // Safely parse the metadata object
                            const metadata = Function(
                                `"use strict"; return (${metadataMatch[1]});`
                            )();

                            // Validate required metadata fields
                            if (!folder || !metadata.title) {
                                throw new Error(
                                    `Missing some required metadata fields in: ${folder}`
                                );
                            }

                            resolve({
                                title: metadata.title || 'Untitled',
                                published: metadata.published || 'Untitled',
                                updated: metadata.updated || 'Untitled',
                                author: metadata.author || 'Untitled',
                                thumbnail: metadata.thumbnail || 'Untitled',
                                description: metadata.description || '',
                                keywords: metadata.keywords || [],
                                isActive: metadata.isActive || false,
                                folder,
                            });
                        } catch (error) {
                            console.error(
                                `Error processing file "${filePath}":`,
                                error.message
                            );
                            resolve(null); // Resolve as null if there's an error
                        }
                    });
                })
        )
    );

    // Filter out any null values (errors)
    return articles.filter(Boolean);
}
