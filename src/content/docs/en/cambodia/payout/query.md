---
title: Payout Query
description: Merchant queries the status of a payout order
---

### Request URL

| method | url                      |
|--------|--------------------------|
| POST   | /api/pay/payout/query/v1 |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| app_code         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
|-----------------|--------|----------|--------|-----------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      |        | Signature             |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type   | Required | Length | Description                                                         |
|-----------------|--------|----------|--------|---------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                               |
| tradeNo         | String | yes      |        | Platform order number                                               |
| amount          | String | yes      |        | Payout amount                                                       |
| status          | Int    | yes      |        | Payout status: 2-Success, 3-Failed                                  |
| serviceAmount   | String | yes      |        | Service fee = fixed fee + transaction amount × service fee rate     |
| immService      | String | yes      |        | Fixed fee                                                           |
| serviceRate     | String | yes      |        | Service fee rate                                                    |
| errorCode       | number | yes      |        | Order failure status error code                                     |
| errorMessage    | String | yes      |        | Order failure error message                                         |
| completeTime    | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss      |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001KH0000000000000000",
    "amount": "10000.00",
    "status": 2,
    "serviceAmount": "105.00",
    "immService": "5.00",
    "serviceRate": "0.0100",
    "errorCode": null,
    "errorMessage": null,
    "completeTime": "2025-01-01 00:00:00"
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```

### Error Codes

| Error Code | Error Message                    | Handling Solution                         |
|------------|----------------------------------|-------------------------------------------|
| 412        | Please try again later           | Please try again later                    |
| 414        | *                                | Correct the corresponding parameter       |
| 416        | Application not found            | Check and correct the `app_code`           |
| 417        | Merchant account not found       | Contact us to check the merchant account  |
| 418        | Merchant account is closed       | Contact us to check the merchant account  |
| 434        | Merchant order not exist         | Check the submitted merchant order number |
| 500        | Business Error                   | Please contact us                         |

```json title="Error Response Example"
{
  "code": 417,
  "data": null,
  "msg": "Merchant account not found",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
