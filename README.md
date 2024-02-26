# YA-TS-Client

Typescript client generated for the [Yagna public API](https://github.com/golemfactory/ya-client) openapi specification. The client is generated using [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen).

## Generating a new version of the client

Clone this repository with submodules included:

```bash
git clone --recurse-submodules git@github.com:golemfactory/ya-ts-client.git
```

Install the dependencies:

```bash
npm install
```

Update the ya-client submodule to your desired version:

```bash
cd ya-client
git checkout <desired_version>
cd ..
```

Generate the client:

```bash
npm run generate
```

At this point the client should be generated and transpiled to javascript in the `dist` directory. The package is ready to be published to npm. Do not forget to update the version in `package.json` before publishing.
