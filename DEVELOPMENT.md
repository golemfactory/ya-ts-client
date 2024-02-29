# Development related documentation

## Generating a new version of the clients

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

At this point the client should be generated and transpiled to javascript in the `dist` directory.

The package is ready to be published to npm. Do not forget to update the version in `package.json` before publishing.

## Regenerate docs

Once you generate the client, make sure you also generate the docs which will get published as online reference.

## Useful snippets

```bash
# Bump specific version part
npm version patch

# Bump the version part and keep it market as beta
npm version prerelease --preid beta

# Publish to main channel
npm publish

# Publish to beta
npm publish --tag beta
```