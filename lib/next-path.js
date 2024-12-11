import * as fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

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


export function getFileMetaData(folder) {

    const fileContent = fs.readFileSync(`${folder}/page.mdx`, 'utf-8');

    // Parse the file's frontmatter using gray-matter
    const { data } = matter(fileContent);
    // console.log(content)

    // Return the relevant metadata
    return {
        title: data.title || 'Untitled',
        published: data.published || 'Untitled',
        updated: data.updated || 'Untitled',
        author: data.author || 'Untitled',
        thumbnail: data.thumbnail || 'Untitled',
        description: data.description || 'Untitled',        
        keywords: data.keywords || 'Untitled',        
        isActive: data.isActive || false,
        folder,
    };

}

export function getMDXContent(directory) {
        // Read the file content
        // console.log(directory);
        const fileContent = fs.readFileSync(`${directory}/page.mdx`, 'utf-8');
        // console.log(fileContent);

        // Parse the file's frontmatter using gray-matter
        const { content } = matter(fileContent);

    return content;
}


export async function getBlogPostMetadata(directory, folderNames) {
    const articles = await Promise.all(
        folderNames.map(async (folder) => {
            try {
                const file = await import(`../${directory}${folder}/page.mdx`);
                const data = file.metadata;

                if (file && data) {
                    if (!folder || !data.title) {
                        throw new Error(`Missing some required metadata fields in: ${folder}`);
                    }

                    return {
                        title: data.title || 'Untitled',
                        published: data.published || 'Untitled',
                        updated: data.updated || 'Untitled',
                        author: data.author || 'Untitled',
                        thumbnail: data.thumbnail || 'Untitled',
                        isActive: data.isActive || false,
                        folder,
                    };
                } else {
                    // throw new Error(`Unable to find metadata for ${folder}.mdx`);
                }
            } catch (error) {
                return notFound();
            }
        })
    )
    return articles;
}
