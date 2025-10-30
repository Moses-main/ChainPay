# PayAI API Documentation

Base URL: `http://localhost:3001/api`

## Authentication

Currently uses userId-based authentication. JWT tokens coming soon.

## Endpoints

### POST /register

Register a new user and create wallet.

**Request:**

```json
{
  "userId": "string",
  "phone": "string" // E.164 format
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "wallet": {
    "address": "0x...",
    "balance": "0.00"
  }
}
```

### GET /wallet/:userId

Get wallet details for a user.

**Response:**

```json
{
  "success": true,
  "wallet": {
    "address": "0x...",
    "balance": "150.00",
    "currency": "USDC"
  }
}
```

### POST /send

Send USDC payment.

**Request:**

```json
{
  "userId": "string",
  "recipient": "string", // 0x address
  "amount": "number"
}
```

**Response:**

```json
{
  "success": true,
  "txHash": "0x...",
  "message": "Successfully sent..."
}
```

### POST /chat

Interact with AI agent.

**Request:**

```json
{
  "userId": "string",
  "message": "string"
}
```

**Response:**

```json
{
  "response": "string",
  "action": "wallet|send|history|null",
  "data": {}
}
```

### GET /transactions/:userId

Get transaction history.

**Query Params:**

- `limit` (optional): Number of transactions (default: 10)

**Response:**

```json
{
  "success": true,
  "transactions": [...]
}
```
