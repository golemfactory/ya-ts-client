const jsonSchemaRefParser = require("json-schema-ref-parser");
const OpenAPI = require("openapi-typescript-codegen");
const { execSync } = require("child_process");
const { mkdir, mkdirSync } = require("node:fs");

async function generateApiModule(specFile, moduleDir, moduleName) {
  console.log(
    "Generating %s in module %s from spec file %s",
    moduleName,
    moduleDir,
    specFile,
  );

  const oas = await jsonSchemaRefParser.dereference(specFile);

  await OpenAPI.generate({
    input: oas,
    output: `./generated/${moduleDir}`,
    clientName: "Client",
    httpClient: "fetch",
    useUnionTypes: true,
    postfixModels: "DTO",
  });

  const exportedName = `${moduleName}Api`

  // Export the client via the main index.ts file
  execSync(
    `echo 'export * as ${exportedName} from "./${moduleDir}"' >> ./generated/index.ts`,
  );

  // Export the FetchHttpRequest implementation to re-use in other places of the SDK, where the official specs/bindings are not necessary
  // #FIXME: We need to have proper bindings to these endpoints, and once golem-js is not using this borrowed implementation, we can remove this line
  execSync(
    `echo 'export { FetchHttpRequest } from "./core/FetchHttpRequest"' >> ./generated/${moduleDir}/index.ts`,
  );
}

(async () => {
  mkdirSync("./generated");

  await generateApiModule("ya-client/specs/market-api.yaml", "market-api", "Market");
  await generateApiModule(
    "ya-client/specs/activity-api.yaml",
    "activity-api",
    "Activity",
  );
  await generateApiModule("ya-client/specs/payment-api.yaml", "payment-api", "Payment");
  await generateApiModule("ya-client/specs/net-api.yaml", "net-api", "Net");
  // Note: This API is going to be removed, and we shouldn't generateApiModule clients for this
  // await generateApiModule("ya-client/specs/net-api-v2.yaml", "net-api-v2", "NetV2");
  await generateApiModule("ya-client/specs/gsb-api.yaml", "gsb-api", "Gsb");
})();

// Note: Don't try it - asyncapi :)
// generateApiModule("ya-client/specs/gsb-api-messages.yaml", "gsb-api-messages", "GsbApiMessagesClient");
