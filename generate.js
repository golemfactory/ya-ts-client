const jsonSchemaRefParser = require("json-schema-ref-parser");
const fs = require("fs");
const path = require("path");
const OpenAPI = require("@nicolas-chaulet/openapi-typescript-codegen");

/**
 * Find all spec files in the ya-client/specs directory
 */
function getAllSpecs() {
  const fileNames = [];
  const directoryPath = "./ya-client/specs/";
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      fileNames.push(filePath);
    }
  });

  return fileNames;
}

/**
 * Combine all spec files into a single spec
 */
async function getCombinedSpec() {
  const files = getAllSpecs();

  const combinedSpec = {
    openapi: "3.0.0",
    info: {
      title: "Yagna API Combined Spec",
      version: "1.0.0",
    },
    paths: {},
    components: {
      schemas: {},
      responses: {},
      parameters: {},
      examples: {},
      requestBodies: {},
      headers: {},
      securitySchemes: {},
      links: {},
      callbacks: {},
    },
  };

  for (const file of files) {
    const dereferencedSpec = await jsonSchemaRefParser.dereference(file);
    combinedSpec.paths = { ...combinedSpec.paths, ...dereferencedSpec.paths };

    for (let component in combinedSpec.components) {
      combinedSpec.components[component] = {
        ...combinedSpec.components[component],
        ...dereferencedSpec.components[component],
      };
    }
  }

  return combinedSpec;
}

/**
 * Generate the client
 */
async function generate() {
  const combinedSpec = await getCombinedSpec();
  OpenAPI.generate({
    input: combinedSpec,
    output: "./generated",
    clientName: "Yagna",
    httpClient: "fetch",
  });
}

generate();
