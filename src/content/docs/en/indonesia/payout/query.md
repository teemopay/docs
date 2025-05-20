---
title: Payout Query
description: Query a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

## Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (ID)  |
| app_code         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      | -      | Signature             |


```json title = ""
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001ID0000000000000000",
    "additionalInfo": {

    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "684180093000000000",
    "paymentType": 1,
    "status": 1
  }
}
```