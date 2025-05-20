---
title: Payout Query
description: Merchant queries the status of a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

### Header Information

| Header Parameter | Description       |
| --------------- |-------------------|
| timestamp      | Request timestamp |
| nonce          | Random value      |
| country        | Country code (BR) |
| app_code       | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign           | String | yes      |        | Signature            |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter          | Type    | Required | Length | Description                                                       |
| ----------------- | ------- | -------- | ------ | ----------------------------------------------------------------- |
| code              | Integer | yes      |        | Request response code                                              |
| msg               | String  | yes      |        | Response message                                                   |
| data              | Object  | yes      |        | Response data                                                      |
| -- merchantOrderNo| String  | yes      | 32     | Merchant order number                                              |
| -- tradeNo        | String  | yes      |        | Platform order number                                              |
| -- amount         | String  | yes      |        | Payout amount                                                      |
| -- remark         | String  | yes      |        | Remarks                                                            |
| -- status         | Int     | yes      |        | 1-Processing 2-Payout Success 3-Payout Failed 4-Refund             |
| -- sign           | String  | yes      |        | Signature                                                          |

```json title="Response Example"
{
  "code": 200,
  "msg": "success",
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF201806251011",
    "remark": "Payout remarks",
    "status": 1,
    "sign": "TEEMO_SIGN"
  },
  "success": true
}
```

```json title="Order Not Found Response Example"
{
  "code": 400,
  "msg": "Order not found",
  "success": false
}
