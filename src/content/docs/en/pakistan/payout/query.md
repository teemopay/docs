---
title: Payout Query
description: Merchant query the status of a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

### Headers


| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | PK                |
| app_code         | Application ID    |


### Request Parameters

| Field           | Type   | Required | Max Length | Description           |
| --------------- | ------ | -------- | ---------- | --------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number |
| sign            | String | yes      |            | Signature             |


```json title= request example
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}

```

### Response Parameters

| Field           | Type   | Required | Max Length | Description                                                                        |
| --------------- | ------ | -------- | ---------- | ---------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number                                                              |
| tradeNo         | String | yes      |            | Platform order number                                                              |
| amount          | String | yes      |            | Payout amount                                                                      |
| status          | Int    | yes      |            | Payout status: 2 - Success, 3 - Failed                                             |
| serviceAmount   | String | yes      |            | Service fee = fixed fee + (transaction amount \* service rate) (Added 20250506)    |
| immService      | String | yes      |            | Fixed fee amount (Added 20250506)                                                  |
| serviceRate     | String | yes      |            | Service rate (Added 20250506)                                                      |
| errorCode       | number | yes      |            | Error code for failed order (Added 20250506)                                       |
| errorMessage    | String | yes      |            | Error message for failed order (Added 20250506)                                    |
| completeTime    | String | yes      |            | Completion time in local time zone, format: yyyy-MM-dd HH\:mm\:ss (Added 20250506) |
| ~~sign~~        | String | yes      |            | Signature (Removed on 20250506)                                                    |


```json title= query Success example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001PK0000000000000000",
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
```json title= query Failure example
{

  "code": 400,
  "msg":"Order not found",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"

}

```
