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
| country        | Country code (CL) |
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
|  merchantOrderNo| String  | yes      | 32     | Merchant order number                                              |
|  tradeNo        | String  | yes      |        | Platform order number                                              |
|  amount         | String  | yes      |        | Payout amount                                                      |
|  status         | Int     | yes      |        | 1-Processing 2-Payout Success 3-Payout Failed 4-Refund             |

```json title="Response Example"
{
  "code": 200,
  "msg": "success",
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001CL0000000000000000",
    "status": 1,
    "amount":"1000.00"
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
