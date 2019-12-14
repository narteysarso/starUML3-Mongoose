/**
 * @author Nartey Kodjo-Sarso
 * @version 1.0.0
 */

class FileWriter {
    /**
     * 
     * @param {string=} indentString 
     */
    constructor(indentString = '    ') {

        this.lines = [];

        this.indentString = indentString;

        this.indentations = [];
    }


    /**
     * Adds one indentation to line
     */
    indent() {
        this.indentations.push(this.indentString);
    }

    /**
     * Removes one indentation from line
     */
    outdent() {
        this.indentations.splice(this.indentations.length - 1, 1);
    }

    /**
     * Adds a line
     * @param {string} line 
     */
    addLine(line) {
        if (line) {
            this.lines.push(this.indentations.join('') + line);
        } else {
            this.lines.push('');
        }
    }

    /**
     * Returns all lines
     * @returns {string} 
     */
    getLines() {
        return this.lines.join('\n');
    }
}

exports.FileWriter = FileWriter;