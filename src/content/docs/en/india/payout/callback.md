---
title: Payout Callback
description: Merchant receives a payout result callback
---

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
| amount | String | Yes | — | Transaction amount |
| serviceAmount | String | Yes | — | Service fee (e.g., 18.02) |
| status | Int | Yes | — | Payout status: `2` Success, `3` Failed, `4` Refund |
| errorCode | Number | Yes | — | Error code when order fails |
| errorMessage | String | Yes | — | Error message when order fails (see table below) |
| completeTime | String | Yes | — | Completion time — local timezone, format: `yyyy-MM-dd HH:mm:ss` |
| sign | String | Yes | — | Signature |

**Success Callback Example**
```json
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001AR0000000000000000",
    "amount": "1000.00",
    "serviceAmount": "10.50",
    "status": 2,
    "errorCode": null,
    "errorMessage": null,
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
}
```

**Failure Callback Example**
```json
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001AR0000000000000000",
    "amount": null,
    "serviceAmount": null,
    "status": 3,
    "errorCode": 9999,
    "errorMessage": "Others",
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
}
```

**Refund Callback Example**
```json
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001AR0000000000000000",
    "amount": "1000.00",
    "serviceAmount": "10.50",
    "status": 4,
    "errorCode": 1000,
    "errorMessage": "The account does not exist or is restricted",
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
}
```

## Error Code Reference

| errorCode | errorMessage | Notes |
|-----------|-------------|-------|
| 1000 | The account does not exist or is restricted | Recommend asking the user to change their card |
| 1001 | Return | Refunded; if the original payout was initiated within the last 24 hours, you may re-initiate |
| 1002 | Channel server fluctuations | Channel instability; retry after 10 minutes |
| 1004 | Wallet limit exceeded, kindly contact user to upgrade or restore limit. | Recipient account has exceeded daily/monthly/yearly limits |
| 1005 | Transaction amount exceeds limit, kindly retry within allowed range. | Requested amount is out of range |
| 1007 | Abnormal user account, kindly contact user to verify account and retry. | User information is incorrect |
| 1010 | Unstable network, kindly retry later. | Channel network instability |
| 1011 | Parameter validation error, kindly verify and retry. | Technical parameter error; does not meet documentation requirements |
| 1012 | Payment method error, kindly select the right way and try again. | Payment method mismatch; distinguish between wallet account and bank account |
| 1016 | Refund by the recipient or the recipient's bank, kindly contact user to verify account | Payment rejected by bank; ask user to update their account and retry |
| 9999 | Others | Unknown error |

## Callback Response

The merchant must respond with the plain text `SUCCESS`. If this is not returned, the callback will be retried.

| Value | Type | Required | Description |
|-------|------|----------|-------------|
| SUCCESS | String | Yes | Must return `"SUCCESS"` to stop retry |

**Response Example**
```
SUCCESS
```
