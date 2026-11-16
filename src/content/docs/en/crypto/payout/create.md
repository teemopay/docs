---
title: Create a payout order
description: Create a payout order
---

### Request Url

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random string     |
| country          | BP                |
| app\_code        | Application ID    |


### Request Parameters


| Field           | Type   | Required | Max Length | Description                                       |
| --------------- | ------ | -------- | ---------- | ------------------------------------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number                             |
| amount          | String | yes      | 20         | Payout amount                                     |
| chain           | String | yes      | 50         | Chain name: e.g., trc20, erc20                    |
| address         | String | yes      |            | Receiving address                                 |
| callbackUrl     | String | no       | 200        | Callback URL; if omitted, merchant config is used |
| sign            | String | yes      |            | Signature                                         |


```json title= Sample Request 
{
  "merchantOrderNo": "OrderNoExample",
  "amount": "10.00",
  "chain": "trc20",
  "address": "123456789987654321",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters


| Field           | Type   | Required | Length | Description                                           |
| --------------- | ------ | -------- | ------ | ----------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                 |
| tradeNo         | String | yes      |        | Platform order number                                 |
| status          | Int    | yes      |        | `0` Pending (non-final status. The order creation request has been received and is awaiting risk review and approval)<br>`1` Processing (pending, non-final status. The order has entered the payout processing flow)<br>`3` Failed (final status. Order creation validation or preliminary approval failed. The payout can be re-initiated as needed) |
| amount          | String | yes      |        | Transaction amount                                    |


```json title= Sample Response
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "merchantOrderNo": "OrderNoExample",
    "status": 1,
    "tradeNo": "TF2501010001BP0000000000000000"
  }
}
```
