---
title: Balance Inquiry
description: Balance Inquiry
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/merchant/balance |


### Headers
| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | PK                |
| appCode          | Application ID    |


### Request Parameters

| Field | Type   | Required | Length | Description |
| ----- | ------ | -------- | ------ | ----------- |
| sign  | String | yes      |        | Signature   |


```json title= request example
{
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field        | Type   | Required | Length | Description      |
| ------------ | ------ | -------- | ------ | ---------------- |
| totalAmount  | String | Yes      |        | Total amount     |
| frozenAmount | String | Yes      |        | Frozen amount    |
| availAmount  | String | Yes      |        | Available amount |

```json title= request example
{
  "code": 200,
  "data": {
    "totalAmount": "12000.00",
    "frozenAmount": "2000.00",
    "availAmount": "10000.00"
  },
  "msg": "success",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}

```