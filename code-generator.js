class CodeGenerator {

    /**
     * 
     * @param {Object} schema model schema object 
     * @param {Object} writer file writer object
     */
    constructor(schema, writer) {
        this.schema = schema;

        this.writer = writer;

        this.schemaName = `${this.schema.getName()}Schema`;

    }

    generate() {
        // this.header();
        this.imports();
        this.mainClassCode();
    }

    imports() {
        let writer = this.writer;
        this.schema.getImports().forEach(imprt => {
            writer.writeLine(`${imprt}`);
        });

        writer.writeLine("");
    }

    mainClassCode() {
        this.schemaSignature();
        this.writer.write(' = mongoose.Schema(')
        this.writer.indent();
        this.schemaObject();
        this.writer.outdent();
        this.writer.writeLine(')');
        this.schemaMethods();
        this.exportClass();

    }

    schemaSignature() {
        this.writer.write(`const ${this.schemaName}`);
    }

    exportClass() {
        this.writer.writeLine(`module.exports = mongoose.model('${this.schema.getName()}',${this.schemaName})`);
    }

    schemaObject() {
        let writer = this.writer;
        this.schema.getFieldGenerators.forEach(fieldGenerator => {
            writer.writeLine(`${fieldGenerator.getData()},`);
        });
    }

    schemaMethods() {
        let writer = this.writer;
        let schemaName = this.schemaName;
        this.schema.getMethodGenerators.forEach(methodGenerator => {
            let methodBody = methodGenerator.getBody();
            //write method function header
            writer.writeLine(`${schemaName}.methods.${methodGenerator.getName()} =  function(${methodGenerator.getParam.join(',')}){`);
            writer.indent();
            //write method doc
            writer.writeLine("/**")
            writer.writeLine(` * ${methodGenerator.getDescription()}`);
            writer.writeLine("*/")

            writer.writeLine("");
            //write method body
            methodBody !== null ? writer.writeLine(methodBody) : null;
            writer.outdent();
            write.writeLine('}')
        })
    }

}