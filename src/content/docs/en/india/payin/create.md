---
title: Create Payment
description: Merchant requests to create a payment order
---

## Request

| Method | URL |
|--------|-----|
| POST | `/api/pay/payment/create/v1` |

## Request Headers

| Header | Description |
|--------|-------------|
| timestamp | Request timestamp |
| nonce | Random value |
| country | IN |
| app_code | Application code |

## Payment Methods (paymentType)

| Payment Method | paymentType Value |
|----------------|-------------------|
| Aggregated Page | 1001 |
| QR Code | 1002 |
| PHONEPE | 1003 |
| PAYTM | 1004 |

## Request Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| merchantOrderNo | String | Yes | 32 | Merchant order number |
| paymentType | Integer | Yes | — | Payment method: `1001` (Aggregated Page), `1002` (QR), `1003` (PHONEPE), `1004` (PAYTM) |
| realName | String | Yes | 64 | User's full name (recommended: all uppercase) |
| email | String | Yes | 50 | User's email address (must match standard email format) |
| amount | String | Yes | 20 | Collection amount in INR (Indian Rupees) |
| expirationTime | Long | No | — | Expiry time — minimum 1 day, maximum 7 days; millisecond timestamp (e.g., `1735660800000`) |
| phone | String | Yes | 20 | User's mobile number — 10 digits, must start with 6, 7, 8, or 9 |
| callbackUrl | String | No | 200 | Collection callback URL. If omitted, the URL configured in the merchant portal is used |
| sign | String | Yes | — | Signature |

**Request Example**
```json
{
  "realName": "TeemoPay",
  "merchantName": "MerchantNameExample",
  "amount": "1000",
  "phone": "6234567890",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "OrderNoExample",
  "email": "TeemoPay@example.com",
  "paymentType": 1001,
  "sign": "YOUR_SIGN"
}
```

## Response Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| merchantOrderNo | String | Yes | 32 | Merchant order number |
| tradeNo | String | Yes | 32 | Platform order number |
| amount | String | Yes | 32 | Transaction amount |
| paymentType | Int | Yes | 10 | Payment method: `1001` (Aggregated Page), `1002` (QR), `1003` (PHONEPE), `1004` (PAYTM) |
| paymentInfo | String | Yes | 32 | Primary payment information — e.g., payment code or QR string |
| additionalInfo | JSONObject | No | — | Supplementary payment information |
| status | Int | Yes | — | Order status: `1` Processing, `3` Failed |
| errorMsg | String | No | — | Error message (returned on failure) |

**Response Example**
```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2405220001AR0000430564883184",
    "additionalInfo": null,
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "K8xY3pQ7zW2dE9sR4fT1gH6jU8lM3nB5vC2xZ7qA9wS4eD1rF8tG3yH6uJ9...",
    "paymentType": 1001,
    "status": 1
  }
}
```

## Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| 412 | Please try again later | Retry later |
| 414 | * | Correct the corresponding parameter |
| 423 | This payment method is not supported | Payment method not supported; check the docs or contact us to enable it |
| 426 | merchant order duplicate | Change the merchant order number |
| 427 | The callback notification address for collection must not be empty. | Configure a collection callback URL |
| 443 | ID number must not be null | ID number cannot be empty |
| 466 | Payment method fee rate not configured. | Collection fee rate not configured; contact us |
| 473 | Merchant joint verification error: * | Merchant configuration error; contact us |
| 474 | The id card number must be 11 digits. | ID number must be 11 digits |
| 500 | Business Error | Contact us |

**Error Response Example**
```json
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```

## Channel Error Messages

| errorMsg | Description |
|----------|-------------|
| Transaction amount exceeds limit, kindly retry within allowed range. | Requested amount is out of range |
| Channel request error, technicians will fix ASAP. | Channel under maintenance |
| Unstable network, kindly retry later. | Channel network instability |
| Parameter validation error, kindly verify and retry. | Invalid parameter submitted |

**Channel Error Response Example**
```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": null,
    "tradeNo": "TS2405220001AR0000430564883184",
    "paymentType": 1001,
    "paymentInfo": null,
    "additionalInfo": null,
    "status": 3,
    "errorMsg": "Transaction amount exceeds limit, kindly retry within allowed range."
  },
  "msg": "success",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```
