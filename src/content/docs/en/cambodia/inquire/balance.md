---
title: Balance Query
description: Balance Query
---

### Request URL

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/merchant/balance |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| app_code         | Application ID    |

### Request Parameters

| Field | Type   | Required | Length | Description |
|-------|--------|----------|--------|-------------|
| sign  | String | yes      |        | Signature   |

```json title="Request Example"
{
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field        | Type   | Required | Length | Description      |
|--------------|--------|----------|--------|------------------|
| totalAmount  | String | yes      |        | Total amount     |
| frozenAmount | String | yes      |        | Frozen amount    |
| availAmount  | String | yes      |        | Available amount |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "totalAmount": "120000.00",
    "frozenAmount": "20000.00",
    "availAmount": "100000.00"
  },
  "msg": "success",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```

### Error Codes

| Error Code | Error Message                  | Handling Solution                        |
|------------|--------------------------------|------------------------------------------|
| 412        | Please try again later         | Please try again later                   |
| 414        | *                              | Correct the corresponding parameter      |
| 416        | Application not found          | Check and correct the `app_code`          |
| 417        | Merchant account not found     | Contact us to check the merchant account |
| 500        | Business Error                 | Please contact us                        |

```json title="Error Response Example"
{
  "code": 416,
  "data": null,
  "msg": "Application not found",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
