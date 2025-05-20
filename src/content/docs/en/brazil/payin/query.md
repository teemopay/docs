---
title: Payment Query
description: Merchant queries the status of a payment order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payment/query/v1 |

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

| Parameter                     | Type   | Required | Length | Description                                                                                                              |
| ---------------------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| merchantOrderNo              | String | yes      | 32     | Merchant order number                                                                                                    |
| tradeNo                      | String | yes      |        | Platform order number                                                                                                    |
| paymentType                  | Int    | yes      |        | Payment type |
| transactionAmount            | String | yes      |        | Order transaction amount                                                                                                 |
| amount                       | String | yes      |        | Payment amount                                                                                                           |
| status                       | String | yes      |        | 2-Success 3-Failed 4-Refund                                                                                              |
| remark                       | String | no       |        | Remarks                                                                                                                  |
| statementList                | Object | no       |        | Payment transaction information                                                                                          |
| -- paymentSingleOrderNo      | String | yes      |        | Single payment transaction number                                                                                        |
| -- paymentStatementAmount    | String | yes      |        | Single payment amount                                                                                                    |
| -- paymentStatementStatus    | Int    | yes      |        | Single payment transaction status: 2-Payment Success 3-Payment Failed 4-Refund                                            |
| -- paymentStatementStatusName| String | yes      |        | Transaction status name                                                                                                  |
| -- message                   | String | no       |        | Transaction message                                                                                                      |
| sign                         | String | yes      |        | Signature                                                                                                                |

```json title="Response Example"
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "paymentType": 1,
  "amount": "100",
  "status": "2",
  "remark": "Payment remarks",
  "statementList": [
    {
      "paymentSingleOrderNo": "OrderNoExample",
      "paymentStatementAmount": "100",
      "paymentStatementStatus": "2",
      "paymentStatementStatusName": "Payment Success",
      "message": "Payment Successful"
    }
  ],
  "sign": "TEEMO_SIGN",
  "success": true
}
