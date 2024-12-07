// npm i fs path
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



