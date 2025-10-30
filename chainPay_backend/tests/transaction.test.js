const request = require("supertest");
const app = require("../server");

describe("Transaction Endpoints", () => {
  let testUserId = "test_tx_user";

  beforeAll(async () => {
    await request(app).post("/api/register").send({
      userId: testUserId,
      phone: "+1234567890",
    });
  });

  describe("POST /api/send", () => {
    it("should send payment successfully", async () => {
      const res = await request(app).post("/api/send").send({
        userId: testUserId,
        recipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
        amount: "10.00",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.txHash).toBeDefined();
    });

    it("should reject invalid recipient address", async () => {
      const res = await request(app).post("/api/send").send({
        userId: testUserId,
        recipient: "invalid_address",
        amount: "10.00",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject invalid amount", async () => {
      const res = await request(app).post("/api/send").send({
        userId: testUserId,
        recipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
        amount: "-10.00",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/transactions/:userId", () => {
    it("should get transaction history", async () => {
      const res = await request(app).get(`/api/transactions/${testUserId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.transactions)).toBe(true);
    });
  });
});
