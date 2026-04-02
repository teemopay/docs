---
title: Create Payout
description: Merchant requests to create a payout order
---

## Request

| Method | URL |
|--------|-----|
| POST | `/api/pay/payout/create/v1` |

## Request Headers

| Header | Description |
|--------|-------------|
| timestamp | Request timestamp |
| nonce | Random value |
| country | IN |
| app_code | Application code |

## Request Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| merchantOrderNo | String | Yes | 32 | Merchant order number |
| amount | String | Yes | 20 | Payout amount in INR (Indian Rupees) |
| accountType | Integer | Yes | — | Account type: `1001` = BANK_TRANSFER, `1002` = UPI |
| bankCode | String | No* | 50 | Bank IFSC code — **required when `accountType` is `1001`**. Uniquely identifies a bank branch in India. Format: first 4 characters are the bank code (letters, e.g., `ICIC` for ICICI Bank, `SBIN` for State Bank of India), 5th character is always `0` (reserved), last 6 characters are the branch code (usually digits, but may include letters). Example: `ICIC0000001` |
| bankAccount | String | Yes | 50 | Recipient account number |
| realName | String | Yes | 40 | User's full name. No special characters; recommended all uppercase; minimum 2 letters. Strict validation is not enforced, but must follow a normal name format |
| phone | String | Yes | 10 | User's mobile number — exactly 10 digits, must start with 6, 7, 8, or 9 |
| email | String | No | 64 | Email address |
| callbackUrl | String | No | 200 | Payout callback URL. If omitted, the URL configured in the merchant portal is used |
| sign | String | Yes | — | Signature |

**Request Example**
```json
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "accountType": 1001,
    "bankCode": "ICIC0000001",
    "bankAccount": "1234567890123456789012",
    "realName": "realName",
    "phone": "6123456789",
    "callbackUrl": "https://www.callbackexample.com",
    "sign": "YOUR_SIGN"
}
```

## Response Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| merchantOrderNo | String | Yes | Merchant order number |
| tradeNo | String | Yes | Platform order number |
| status | Integer | Yes | Payout status: `1` Processing, `3` Failed (can be re-initiated) |
| amount | String | Yes | Transaction amount |

**Success Response Example**
```json
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
    "code": 200,
    "data": {
        "amount": "1000.00",
        "merchantOrderNo": "OrderNoExample",
        "status": 1,
        "tradeNo": "TF2501010001AR0000000000000000"
    }
}
```

## Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| 412 | Please try again later | Retry later |
| 414 | * | Correct the corresponding parameter |
| 417 | Merchant account not found | Merchant account not found; contact us |
| 425 | Insufficient merchant balance | Insufficient balance in merchant account |
| 426 | merchant order duplicate | Change the merchant order number |
| 427 | The callback notification address for collection must not be empty. | No collection callback URL configured; please configure one |
| 432 | * | Mismatch between card number, bank code, and payment method; check and correct |
| 462 | This request failed due to blacklist blocking | Blacklisted; update parameters and retry |
| 473 | Merchant joint verification error: * | Merchant configuration error; contact us |
| 475 | The id card type is error | Invalid ID document type; check and correct |
| 476 | The id card number is error | Invalid ID document number; check and correct |
| 500 | Business Error | Contact us |

**Error Response Example**
```json
{
    "code": 425,
    "data": null,
    "msg": "Insufficient merchant balance",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
