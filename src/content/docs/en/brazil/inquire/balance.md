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
  "totalAmount": "1009962.02",
  "frozenAmount": "33161.70",
  "availAmount": "976800.32"
}
