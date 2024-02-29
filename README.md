# Yagna TS Client

The `ya-ts-client` package provides low level API bindings in form of collection TypeScript clients generated from
the  [Yagna public API](https://github.com/golemfactory/ya-client) OpenApi specifications.

The primary and only purpose of this package is to provide that basic implementation. As a "core" library, it shouldn't need to be added as a dependency to any user code, only to other Golem Network related SDKs or libraries.

If you want to start building solutions using Golem Network, here are more suitable options:

* [Official JS SDK - @golem-sdk/golem-js](https://www.npmjs.com/package/@golem-sdk/golem-js) - which models the Decentralized Computation Marketplace logic
* [TaskExecutor - @golem-sdk/task-executor](https://www.npmjs.com/package/@golem-sdk/task-executor) - built on top of `@golem-sdk/golem-js` and provides a "task oriented" API for simple distributed computation scenarios

## Installation

```bash
npm install --save ya-ts-client
```

## Usage

The library exposes multiple API clients which are auto-generated from the official OpenApi specifications.

```ts
/**
 * Example of usage of the Payment API
 */
const client = new Payment.ApiClient({
  BASE: "http://localhost:7465/payment-api/v1",
  HEADERS: {
    Authorization: "Bearer your-app-key",
  },
});

const response = await client.requestor.getAllocations();
```

The documentation of the generated API is [hosted on GitHub pages](https://golemfactory.github.io/ya-ts-client/).

## See also

- [Official Golem JS SDK repo](https://github.com/golemfactory/golem-js)
- [Documentation for JS Creators](https://docs.golem.network/docs/creators/javascript)
