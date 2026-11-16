---
title: Payout Query
description: Merchant query the status of a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

### Header Information

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (PE) |
| appCode         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      |        | Signature             |


```json
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```


### Response Parameters

| Field           | Type   | Required | Length | Description                                                                 |
| --------------- | ------ | -------- | ------ | --------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                        |
| tradeNo         | String | yes      |        | Platform order number                                                        |
| amount          | String | yes      |        | Payout amount                                                                |
| status          | Int    | yes      |        | `0` Init (equivalent to pending, non-final status. The order creation request has been received and is awaiting risk review and approval)<br>`1` Pending (pending, non-final status. The order has entered the payout processing flow)<br>`2` Successful (success, final status. The payout has been completed)<br>`3` Failed (failed, final status. Order creation validation or preliminary approval failed. The payout can be re-initiated as needed)<br>`4` Refunded (refunded, final status. The order has been fully refunded) |
| serviceAmount   | String | yes      |        | Service fee = Fixed amount + (Transaction amount × Service rate)             |
| immService      | String | yes      |        | Fixed service amount                                                         |
| serviceRate     | String | yes      |        | Service rate                                                                 |
| voucherUrl      | String | yes      |        | Voucher address                                                              |
| errorCode       | Number | yes      |        | Error code for payout failure                                                |
| errorMessage    | String | yes      |        | Error message for payout failure                                             |
| completeTime    | String | yes      |        | Completion time in local timezone, format `yyyy-MM-dd HH:mm:ss`              |



```json 
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "tradeNo": "TF2501010001PE0000000000000000",
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
```json title=Order not found
{
    "code": 400,
    "msg":"Order not found",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```