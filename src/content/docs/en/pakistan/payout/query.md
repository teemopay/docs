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
| appCode         | Application ID    |


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
| status          | Int    | yes      |            | `0` Init (equivalent to pending, non-final status. The order creation request has been received and is awaiting risk review and approval)<br>`1` Pending (pending, non-final status. The order has entered the payout processing flow)<br>`2` Successful (success, final status. The payout has been completed)<br>`3` Failed (failed, final status. Order creation validation or preliminary approval failed. The payout can be re-initiated as needed) |
| serviceAmount   | String | yes      |            | Service fee = fixed fee + (transaction amount \* service rate) (Added 20250506)    |
| immService      | String | yes      |            | Fixed fee amount (Added 20250506)                                                  |
| serviceRate     | String | yes      |            | Service rate (Added 20250506)                                                      |
| voucherUrl      | String | yes      |            | Voucher address                                                                  |
| errorCode       | number | yes      |            | Error code for failed order (Added 20250506)                                       |
| errorMessage    | String | yes      |            | Error message for failed order (Added 20250506)                                    |
| completeTime    | String | yes      |            | Completion time in local time zone, format: yyyy-MM-dd HH:mm:ss (Added 20250506) |


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
