/**
 * @author Nartey Kodjo- Sarso
 * @version 1.0.0
 */

const fs = require("fs");

class FileManager {
    /**
     * @constructor
     * 
     * @param {!string} basePath Path to the root directory
     * @param {Object} options 
     */
    constructor(basePath, options) {

        this.basePath = basePath;

        this.options = options;

        this.modelsFullPath = basePath + '/models';
    }


    /**
     * Returns the path to the root directory
     * @returns {string} 
     */
    getBasePath() {
        return this.basePath;
    }

    /**
     * Returns the full path to models directory
     * @returns {string}
     */
    getModelsFullPath() {
        return this.modelsFullPath;
    }

    /**
     * Creates models folder
     * 
     * @param {requestCallback} onPrepared callback after models folder is created
     * @param {requestCallback} onPreparedCancel callback if models folder creation is cancelled
     */
    prepareModelsFolder(onPrepared, onPreparedCancel) {
        if (fs.existsSync(this.modelsFullPath)) {
            let confirmOverwrite = app.dialogs.showConfirmDialog("A folder with same name exists. Do you want to overwrite?");
            if (confirmOverwrite != "OK")
                return onPreparedCancel();

            this.deleteRecursiveFolder(this.modelsFullPath);
        }

        fs.mkdirSync(this.modelsFullPath);

        onPrepared();

    }


    /**
     * Recursively deletes a directory
     * 
     * @param {string} folderPath A path to a directory
     */
    deleteRecursiveFolder(folderPath) {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(path).forEach((file, index) => {
                let curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory())
                    deleteRecursiveFolder(curPath)
                else
                    fs.unlinkSync(curPath)
            });
            fs.rmdirSync(path)
        }
    }
}

exports.FileManager = FileManager;