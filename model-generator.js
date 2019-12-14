class SchemaGenerator {
  /**
   *
   * @param {string} name The name of the schema
   */
  constructor(name) {
    this.name = name;

    this.imports = [];

    this.fieldGenerators = [];

    this.methodGenerators = [];
  }

  /**
   * Returns schema name
   *
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * Adds a dependency/import
   *
   * @param {string} name 
   * @param {string} packageName 
   */
  addImport(name, packageName) {
    this.imports.push(`const ${name} = required('${packageName}');`);
  }

  /**
   * Returns all dependencies/imports
   * @returns {Array}
   */
  getImports() {
    return this.imports;
  }

  /**
   * Adds FieldGenerator()
   * @param {requireCallback} fieldGenerator A field generator method
   */
  addFieldGenerators(fieldGenerator) {
    this.fieldGenerators.push(fieldGenerator);
  }

  /**
   * Returns all field generators
   * @returns {Array} field generators
   */
  getFieldGenerators() {
    return this.fieldGenerators;
  }
}

class FieldGenerator {
  /**
   *
   * @param {string} name Schema property key
   */
  constructor(name) {
    this.name = name;

    this.keyValuePairs = [];
  }

  /**
   *Returns the name of the field
   *@Return {string}
   */
  getName() {
    return this.name;
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   */
  makeKeyValuePair(key, value = null) {
    this.keyValuePairs.push(value ? `${key} : ${value}` : `${key}`);
  }

  getData() {
    return this.keyValuePairs.length > 1 ?
      `${this.name} : {${this.keyValuePairs.join(", \n")}}` :
      `${this.name}: ${sthis.keyValuePairs[0]}`;
  }
}

class methodGenerator {
  /**
   *
   * @param {string} name The name of the method
   */
  constructor(name, description = "") {
    this.name = name;

    this.description = description;

    this.params = [];

    this.body = null;
  }

  /**
   * Returns method name
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * Returns method description
   * @returns {string}
   */
  getDescription() {
    return this.description;
  }

  /**
   *Adds a parameter for methods
   * @param {string} parameterName
   */
  addParameter(parameterName) {
    this.params.push(parameterName);
  }

  /**
   * An array of method parameters
   * @returns {Array}
   */
  getParameters() {
    return this.params;
  }

  /**
   *Sets the method body
   * @param {string} body method body
   */
  setBody(body) {
    this.body = body;
  }

  /**
   * Returns method body
   * @returns {string}
   */
  getBody() {
    return this.body;
  }
}