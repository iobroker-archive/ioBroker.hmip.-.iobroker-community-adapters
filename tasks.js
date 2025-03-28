const { deleteFoldersRecursive, copyFiles, npmInstall, buildReact } = require('@iobroker/build-tools');

const srcAdmin = `${__dirname}/src-admin/`;

function admin0Clean() {
    deleteFoldersRecursive(`${__dirname}/admin/custom`);
    deleteFoldersRecursive(`${__dirname}/src-admin/build`);
}

function copyAllFiles() {
    copyFiles(['src-admin/build/customComponents.js'], 'admin/custom/');
    copyFiles(['src-admin/build/assets/**/*'], 'admin/custom/assets/');
    copyFiles(['src-admin/src/i18n/*.json'], 'admin/custom/i18n');
}

if (process.argv.find(arg => arg.replace(/^--/, '') === '0-clean')) {
    admin0Clean();
} else if (process.argv.find(arg => arg.replace(/^--/, '') === '1-npm')) {
    npmInstall(srcAdmin).catch(e => console.error(`Cannot install: ${e}`));
} else if (process.argv.find(arg => arg.replace(/^--/, '') === '2-compile')) {
    buildReact(srcAdmin, { rootDir: __dirname, vite: true }).catch(e => console.error(`Cannot compile: ${e}`));
} else if (process.argv.find(arg => arg.replace(/^--/, '') === '3-copy')) {
    copyAllFiles();
} else {
    admin0Clean();

    npmInstall(srcAdmin).then(async () => {
        await buildReact(srcAdmin, { rootDir: __dirname, vite: true });
        copyAllFiles();
    });
}
