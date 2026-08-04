---
title: Payment Query
description: Merchant queries the status of a payment order
---

### Request URL

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/payment/query/v1 |

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

| Field                          | Type   | Required | Length | Description                                                         |
|--------------------------------|--------|----------|--------|---------------------------------------------------------------------|
| merchantOrderNo                | String | yes      | 32     | Merchant order number                                               |
| tradeNo                        | String | yes      |        | Platform order number                                               |
| paymentType                    | Int    | yes      |        | Payment method                                                      |
| transactionAmount              | String | yes      |        | Order transaction amount                                            |
| amount                         | String | yes      |        | Payment amount                                                      |
| status                         | Int    | yes      |        | Order status: 1-Processing, 2-Success, 3-Failed                     |
| serviceAmount                  | String | yes      |        | Service fee, e.g., 18.02                                            |
| paymentInfo                    | String | yes      |        | Main payment information actually used for payment                  |
| errorMessage                   | String | no       |        | Order failure error message                                         |
| statementList                  | Object | no       |        | Payment transaction information                                     |
| -- paymentSingleOrderNo        | String | yes      |        | Single payment transaction number                                   |
| -- paymentStatementAmount      | String | yes      |        | Single payment amount                                               |
| -- paymentStatementStatus      | Int    | yes      |        | Single transaction status: 2-Success, 3-Failed                     |
| -- paymentStatementStatusName  | String | yes      |        | Transaction status name                                             |
| -- serviceAmount               | String | yes      |        | Service fee = fixed fee + transaction amount × service fee rate     |
| -- serviceRate                 | String | yes      |        | Service fee rate                                                    |
| -- immService                  | String | yes      |        | Fixed fee                                                           |
| -- paymentType                 | Int    | yes      |        | Actual payment method                                               |
| -- completeTime                | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss      |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001KH0000000000000000",
    "paymentType": 2001,
    "transactionAmount": "10000.00",
    "amount": "10000.00",
    "status": 2,
    "serviceAmount": "105.00",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "errorMessage": null,
    "statementList": [
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample",
        "paymentStatementAmount": "10000.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "Payment Success",
        "serviceAmount": "105.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 2001,
        "completeTime": "2025-01-01 00:00:00"
      }
    ]
  },
  "msg": "success",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```

### Error Codes

| Error Code | Error Message                    | Handling Solution                         |
|------------|----------------------------------|-------------------------------------------|
| 412        | Please try again later           | Please try again later                    |
| 414        | *                                | Correct the corresponding parameter       |
| 416        | Application not found            | Check and correct the `app_code`           |
| 434        | Merchant order not exist         | Check the submitted merchant order number |
| 500        | Business Error                   | Please contact us                         |

```json title="Error Response Example"
{
  "code": 416,
  "data": null,
  "msg": "Application not found",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
