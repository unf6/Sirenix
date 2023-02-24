'use strict';
const { glob } = require('glob');
const { promisify } = require('util');
const proGlob = promisify(glob);

async function loadFiles(dirName) {
  try {
    const Files = await proGlob(
      `${process.cwd().replace(/\\/g, '/')}/src/${dirName}/**/*.js`
    );
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
  } catch (error) {
    console.error(error),
      console.log(`[File Loader] Something went wrong while loading the files`);
  }
}

module.exports = { loadFiles };
