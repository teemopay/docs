# Collection (PayIn) Callback

## Callback Endpoint

| Method | URL |
|--------|-----|
| POST | Merchant-provided callback URL |

## Callback Headers

| Header | Description |
|--------|-------------|
| timestamp | Request timestamp |
| nonce | Random value |
| country | IN |
| appCode | Application code |

## Callback Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| merchantOrderNo | String | Yes | 32 | Merchant order number |
| tradeNo | String | Yes | — | Platform order number |
| paymentOrderNo | String | Yes | 30 | Platform single-payment transaction number |
| status | Int | Yes | — | Order status: `2` Success |
| paymentAmount | String | Yes | — | Actual amount paid in this transaction |
| serviceAmount | String | Yes | — | Service fee (e.g., 18.02) |
| paymentInfo | String | Yes | — | Primary payment information — the actual details used for the payment |
| paymentType | Int | Yes | — | Payment method |
| completeTime | String | Yes | — | Completion time of this transaction — local timezone, format: `yyyy-MM-dd HH:mm:ss` |
| errorMessage | String | No | — | Error message if order failed |
| sign | String | Yes | — | Signature |

**Callback Example**
```json
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001AR0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 2,
    "paymentAmount": "1000.00",
    "serviceAmount": "15.00",
    "paymentInfo": "K8xY3pQ7zW2dE9sR4fT1gH6jU8lM3nB5vC2xZ7qA9wS4eD1rF8tG3yH6uJ9iK2oL5pM8aN3bV7cX9dZ4...",
    "paymentType": 1001,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": null,
    "sign": "TEEMO_SIGN"
}
```

## Callback Response

The merchant must respond with the plain text `SUCCESS`. If this is not returned, the callback will be retried.

| Value | Type | Required | Description |
|-------|------|----------|-------------|
| SUCCESS | String | Yes | Must return `"SUCCESS"` to stop retry |

**Response Example**
```
SUCCESS
```
