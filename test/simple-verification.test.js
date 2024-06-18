const { PaymentApi, MarketApi } = require("../dist");

describe("Simple verification of generated clients", () => {
  describe("Payment API", () => {
    test("I can get the allocations", async () => {
      const client = new PaymentApi.Client({
        BASE: "http://localhost:7465/payment-api/v1",
        HEADERS: {
          Authorization: "Bearer 3c64811789014fefae2e9feb2f760ee3",
        },
      });
      expect(client).toBeDefined();

      const response = await client.requestor.getAllocations();
      expect(response).toBeDefined();
    });
  });

  describe("Market API", () => {
    test("I can get the demands", async () => {
      const client = new MarketApi.Client({
        BASE: "http://localhost:7465/market-api/v1",
        HEADERS: {
          Authorization: "Bearer 3c64811789014fefae2e9feb2f760ee3",
        },
      });
      expect(client).toBeDefined();

      const response = await client.requestor.getDemands();

      const foo = await client.requestor.collectAgreementEvents()
      expect(response).toBeDefined();
    });
  });
});
