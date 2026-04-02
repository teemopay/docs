---
title: Payout Query
description: Merchant queries the status of a payout order
---

## Request

| Method | URL |
|--------|-----|
| POST | `/api/pay/payout/query/v1` |

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
| sign | String | Yes | — | Signature |

**Request Example**
```json
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

## Response Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| merchantOrderNo | String | Yes | Merchant order number |
| tradeNo | String | Yes | Platform order number |
| amount | String | Yes | Payout amount |
| status | Int | Yes | Payout status: `1` Processing, `2` Success, `3` Failed |
| serviceAmount | String | Yes | Service fee = fixed fee + transaction amount × service rate |
| immService | String | Yes | Fixed fee |
| serviceRate | String | Yes | Service rate |
| errorCode | Number | Yes | Error code when order fails |
| errorMessage | String | Yes | Error message when order fails |
| completeTime | String | Yes | Completion time — local timezone, format: `yyyy-MM-dd HH:mm:ss` |

**Response Example**
```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001AR0000000000000000",
    "amount": "1000.00",
    "status": 2,
    "serviceAmount": "15.00",
    "immService": "5.00",
    "serviceRate": "0.010",
    "errorCode": null,
    "errorMessage": null,
    "completeTime": "2025-05-01 00:00:00"
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```

## Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| 412 | Please try again later | Retry later |
| 414 | * | Correct the corresponding parameter |
| 416 | Application not found | Invalid `app_code`, please update |
| 417 | Merchant account not found | Merchant account not found; contact us |
| 418 | Merchant account is closed | Merchant account is closed; contact us |
| 434 | Merchant order not exist | Check the submitted order number |
| 500 | Business Error | Contact us |

**Error Response Example**
```json
{
    "code": 416,
    "data": null,
    "msg": "Application not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
