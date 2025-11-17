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
| country          | Country code (e.g., AR) |
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
| paymentType                   | Integer   | Yes      |        | Payment Method 【901:QR】                                                                                         |
| transactionAmount             | String    | Yes      |        | Transaction amount                                                                               |
| amount                        | String    | Yes      |        | Amount received                                                                                  |
| status                        | String    | Yes      |        | Order Status 【1: Payment in Progress; 2: Payment Successful; 3: Payment Failed】                                                                          |
| serviceAmount                 | String    | Yes      |        | Service Fee 【e.g.: 18.02】                                                                         |
| paymentInfo                   | String    | Yes      |        | Main Payment Information; returns the actual information used for payment                                              |
| errorMessage                  | String    | No       |        | Error Message for Failed Orders                                                                       |
| statementList                 | Object[] | No       |        | Payment transaction records                                                                      |
| ├─ paymentSingleOrderNo       | String    | Yes      |        | Single transaction ID                                                                            |
| ├─ paymentStatementAmount     | String    | Yes      |        | Amount of this transaction                                                                       |
| ├─ paymentStatementStatus     | Integer   | Yes      |        | Single collection transaction status 【2: Collection successful 3: Payment failed】                                                     |
| ├─ paymentStatementStatusName | String    | Yes      |        | Transaction status name                                                                          |
| ├─ serviceAmount              | String    | Yes      |        | Service fee = fixed fee + transaction amount × service rate                                      |
| ├─ serviceRate                | String    | Yes      |        | Service rate                                                                                     |
| ├─ immService                 | String    | Yes      |        | Fixed service fee                                                                                |
| ├─ paymentType                | Integer   | Yes      |        | Actual payment method                                                                            |
| ├─ completeTime               | String    | Yes      |        | Completion time in current country timezone, format: yyyy-MM-dd HH:mm:ss                         |

```json title=返回示例
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000.00",
        "transactionAmount": "1000.00",
        "tradeNo": "TS2501010001AR0000000000000000",
        "paymentType": 901,
        "paymentInfo": "29900000000000",
        "status": 2,
        "serviceAmount": "15.00",
        "statementList": [
            {
                "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
                "paymentStatementAmount": "1000.00",
                "paymentStatementStatus": 2,
                "paymentStatementStatusName": "代收成功",
                "completeTime": "2025-01-01 00:00:00",
                "serviceAmount": "15.00",
                "serviceRate": "0.0100",
                "immService": "5.00",
                "paymentType": 901
            }
        ]
    },
    "msg": "success",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```