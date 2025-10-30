const request = require("supertest");
const app = require("../server");

describe("Wallet Endpoints", () => {
  let testUserId = "test_wallet_user";

  beforeAll(async () => {
    // Register test user
    await request(app).post("/api/register").send({
      userId: testUserId,
      phone: "+1234567890",
    });
  });

  describe("GET /api/wallet/:userId", () => {
    it("should get wallet details", async () => {
      const res = await request(app).get(`/api/wallet/${testUserId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.wallet).toBeDefined();
      expect(res.body.wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(res.body.wallet.balance).toBeDefined();
    });

    it("should return 404 for non-existent user", async () => {
      const res = await request(app).get("/api/wallet/non_existent_user");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
