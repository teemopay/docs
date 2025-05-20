---
title: Payin Query
description: Merchant queries the status of order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payment/query/v1 |

### Headers

| Header Parameter | Description             |
|------------------|-------------------------|
| timestamp        | Request timestamp       |
| nonce            | Random string           |
| country          | Country code (e.g., MX) |
| app_code         | Application ID          |

### Request Parameters


| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | Yes      | 32     | Merchant order number |
| sign            | String | Yes      |        | Signature             |


```json title= request example
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters


| Field                         | Type      | Required | Length | Description                                                                                      |
| ----------------------------- | --------- | -------- | ------ |--------------------------------------------------------------------------------------------------|
| merchantOrderNo               | String    | Yes      | 32     | Merchant order ID                                                                                |
| tradeNo                       | String    | Yes      |        | Platform order ID                                                                                |
| paymentType                   | Integer   | Yes      |        | Payment method: fixed as 0                                                                       |
| transactionAmount             | String    | Yes      |        | Transaction amount                                                                               |
| amount                        | String    | Yes      |        | Amount received                                                                                  |
| status                        | String    | Yes      |        | 2 - Success, 3 - Failed                                                                          |
| serviceAmount                 | String    | Yes      |        | Service fee, e.g., 18.02 (Added on 2025-05-06)                                                   |
| paymentInfo                   | String    | Yes      |        | Main payment info, e.g., payment URL or identifier (Added on 2025-05-06)                         |
| errorMessage                  | String    | No       |        | Error message if failed (Added on 2025-05-06)                                                    |
| ~~remark~~                    | String    | No       |        | Remark (Removed on 2025-05-06)                                                                   |
| statementList                 | Object\[] | No       |        | Payment transaction records                                                                      |
| ├─ paymentSingleOrderNo       | String    | Yes      |        | Single transaction ID                                                                            |
| ├─ paymentStatementAmount     | String    | Yes      |        | Amount of this transaction                                                                       |
| ├─ paymentStatementStatus     | Integer   | Yes      |        | Transaction status: 2 - Success, 3 - Failed                                                      |
| ├─ paymentStatementStatusName | String    | Yes      |        | Transaction status name                                                                          |
| ├─ serviceAmount              | String    | Yes      |        | Service fee = fixed fee + transaction amount × service rate (Added on 2025-05-06)                |
| ├─ serviceRate                | String    | Yes      |        | Service rate (Added on 2025-05-06)                                                               |
| ├─ immService                 | String    | Yes      |        | Fixed service fee (Added on 2025-05-06)                                                          |
| ├─ paymentType                | Integer   | Yes      |        | Actual payment method (Added on 2025-05-06)                                                      |
| ├─ completeTime               | String    | Yes      |        | Completion time in current country timezone, format: yyyy-MM-dd HH\:mm\:ss (Added on 2025-05-06) |
| ~~sign~~                      | String    | Yes      |        | Signature (Removed on 2025-05-06)                                                                |

```json title= response example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001PK0000000000000000",
    "paymentType": 6,
    "transactionAmount": "1000.00",
    "amount": "1000.00",
    "status": 2,
    "serviceAmount": "15.00",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "errorMessage": null,
    "statementList": [
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
        "paymentStatementAmount": "1000.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "Collection Success",
        "serviceAmount": "15.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 6,
        "completeTime": "2025-01-01 00:00:00"
      }
    ]
  },
  "msg": "success",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```