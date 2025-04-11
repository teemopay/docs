---
title: Balance Query
description: Balance Query
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/merchant/balance |

### Request Parameters

| Field | Type   | Required | Length | Description |
| ----- | ------ | -------- | ------ | ----------- |
| sign  | String | yes      |        | Signature   |

```json title="Request Example"
{
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter    | Type   | Required | Length | Description        |
| ------------ | ------ | -------- | ------ | ------------------ |
| totalAmount  | String | yes      |        | Total Amount       |
| frozenAmount | String | yes      |        | Frozen Amount      |
| availAmount  | String | yes      |        | Available Amount   |

```json title="Response Example"
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
