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


| Field                 | Type      | Required | Length | Description                                                              |
| --------------------- | --------- | -------- | ------ |--------------------------------------------------------------------------|
| merchantOrderNo       | String    | Yes      | 32     | Merchant order ID                                                        |
| tradeNo               | String    | Yes      |        | Platform order ID                                                        |
| paymentType           | Integer   | Yes      |        | Payment method: fixed as 0                                               |
| transactionAmount     | String    | Yes      |        | Transaction amount                                                       |
| amount                | String    | Yes      |        | Amount received                                                          |
| status                | String    | Yes      |        | 2 - Success, 3 - Failed                                                  |
| serviceAmount         | String    | Yes      |        | Service fee, e.g., 18.02                                                 |
| paymentInfo           | String    | Yes      |        | Main payment info, e.g., payment URL or identifier                       |
| errorMessage          | String    | No       |        | Error message if failed                                                  |
| statementList         | Object\[] | No       |        | Payment transaction records                                              |
| ├─ paymentSingleOrderNo | String    | Yes      |        | Single transaction ID                                                    |
| ├─ paymentStatementAmount | String    | Yes      |        | Amount of this transaction                                               |
| ├─ paymentStatementStatus | Integer   | Yes      |        | Transaction status: 2 - Success, 3 - Failed                              |
| ├─ paymentStatementStatusName | String    | Yes      |        | Transaction status name                                                  |
| ├─ serviceAmount      | String    | Yes      |        | Service fee = fixed fee + transaction amount × service rate              |
| ├─ serviceRate        | String    | Yes      |        | Service rate                                                             |
| ├─ immService         | String    | Yes      |        | Fixed service fee                                                        |
| ├─ paymentType        | Integer   | Yes      |        | Actual payment method                                                    |
| ├─ completeTime       | String    | Yes      |        | Completion time in current country timezone, format: yyyy-MM-dd HH:mm:ss |
| ├─ payerBankCode        | String | yes |    | payer bank code                                                          |
| ├─ payerName            | String | yes |    | payer name                                                               |
| ├─ payerAccount         | String | yes |    | payer account                                                            |
| ├─ identifier           | String | yes |    | identifier                                                                    |

```json title= response example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": "1500.00",
    "transactionAmount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "paymentType": 1,
    "paymentInfo": "684180093000000000",
    "status": 2,
    "serviceAmount": "30.00",
    "statementList": [{
      "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
      "paymentStatementAmount": "500.00",
      "paymentStatementStatus": 2,
      "paymentStatementStatusName": "代收成功",
      "completeTime": "2025-01-01 00:00:00",
      "serviceAmount": "10.00",
      "serviceRate": "0.0100",
      "immService": "5.00",
      "paymentType": 1,
      "payerBankCode": "90684",
      "payerName": "Test User Name",
      "payerAccount": "684180118094272991",
      "identifier": "TE00060z462ztlvnyh8g7"
    },
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample2",
        "paymentStatementAmount": "500.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "代收成功",
        "completeTime": "2025-01-01 01:00:00",
        "serviceAmount": "10.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 1,
        "payerBankCode": "90684",
        "payerName": "Test User Name",
        "payerAccount": "684180118037658938",
        "identifier": "TE000ahp328l2y7in3qtx"
      },
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample3",
        "paymentStatementAmount": "500.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "代收成功",
        "completeTime": "2025-01-01 02:00:00",
        "serviceAmount": "10.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 1,
        "payerBankCode": "90684",
        "payerName": "Test User Name",
        "payerAccount": "684180118037658925",
        "identifier": "TE000bhiv619ftngdn60g"
      }
    ]
  },
  "msg": "success",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```