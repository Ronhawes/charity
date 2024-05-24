const path = require("path");

const fs = require("fs");

function relaxDirectory(start_path = null) {
  let currentPath = start_path || __dirname;

  // Traverse up the directory tree until we find a directory containing node_modules
  while (true) {
    const nodeModulesPath = path.join(currentPath, "node_modules");
    if (
      fs.existsSync(nodeModulesPath) &&
      fs.statSync(nodeModulesPath).isDirectory()
    ) {
      // Found the root directory containing node_modules
      return path.join(currentPath, "Media/Relax");
    }

    // Move up one directory
    const parentPath = path.dirname(currentPath);
    // Prevent infinite loop by checking if we've reached the root directory
    if (parentPath === currentPath) {
      return false;
    }
    currentPath = parentPath;
  }
}

function relaxReadDirectory(start_path) {
  let home = relaxDirectory(start_path);

  if (!home) return false;

  return path.join(home, "Media/RelaxRead");
}

module.exports = { relaxDirectory, relaxReadDirectory };
