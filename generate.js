const jsonSchemaRefParser = require("json-schema-ref-parser");
const OpenAPI = require("openapi-typescript-codegen");
const { execSync } = require("child_process");
const { mkdir, mkdirSync } = require("node:fs");

async function generate(file, module, moduleName) {
  console.log(
    "Generating %s in module %s from spec file %s",
    moduleName,
    module,
    file,
  );

  const oas = await jsonSchemaRefParser.dereference(file);

  await OpenAPI.generate({
    input: oas,
    output: `./generated/${module}`,
    clientName: "ApiClient",
    httpClient: "fetch",
  });

  execSync(
    `echo 'export * as ${moduleName} from "./${module}"' >> ./generated/index.ts`,
  );
}

(async () => {
  mkdirSync("./generated");

  await generate("ya-client/specs/market-api.yaml", "market-api", "Market");
  await generate(
    "ya-client/specs/activity-api.yaml",
    "activity-api",
    "Activity",
  );
  await generate("ya-client/specs/payment-api.yaml", "payment-api", "Payment");
  await generate("ya-client/specs/net-api.yaml", "net-api", "Net");
  await generate("ya-client/specs/net-api-v2.yaml", "net-api-v2", "NetV2");
  await generate("ya-client/specs/gsb-api.yaml", "gsb-api", "Gsb");
})();

// Note: Don't try it - asyncapi :)
// generate("ya-client/specs/gsb-api-messages.yaml", "gsb-api-messages", "GsbApiMessagesClient");
