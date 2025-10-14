---
title: Payout Query
description: Query a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

## Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KR) |
| app_code         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      | -      | Signature             |


### Response Parameters


| 参数              | 类型     | 必需  | 长度  | 描述                                             |
|-----------------|--------|-----|-----|------------------------------------------------|
| merchantOrderNo | String | yes | 32  | Merchant Order Number                          |
| tradeNo         | String | yes |     | Platform Order Number                          |
| amount          | String | yes |     | Disbursement Amount                            |
| status          | Int    | yes |     | Disbursement Status: 2 - Successful; 3 - Failed                                           |
| serviceAmount   | String | yes |     | Service Fee = Fixed Service Amount + Transaction Amount × Service Rate                   |
| immService      | String | yes |     | Fixed Service Amount                                         |
| serviceRate     | String | yes |     | Service Rate                                       |
| errorCode       | number | yes |     | Error Code for Failed Order Status                                  |
| errorMessage    | String | yes |     | Error Message for Failed Order                                      |
| completeTime    | String | yes |     | Completion Time (in the current country's time zone, formatted as yyyy-MM-dd HH:mm:ss)              |


```json title = "Return example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001MX0000000000000000",
    "amount": "1000.00",
    "status": 2,
    "serviceAmount": "15.00",
    "immService": "5.00",
    "serviceRate": "0.010",
    "errorCode": null,
    "errorMessage": null,
    "completeTime": "2025-05-01 00:00:00"
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```

```json title= "Example of Response for Non-Existent Order"
{
    "code": 400,
    "msg":"Order not found",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```