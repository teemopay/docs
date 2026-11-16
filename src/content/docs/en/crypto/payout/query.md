---
title: Payout Query
description: Payout Query
---


### Request URl

| Method | URL                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |


## Headers

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random string     |
| country          | BP                |
| app\_code        | Application code  |



### Request Parameters

| Field           | Type   | Required | Max Length | Description           |
| --------------- | ------ | -------- | ---------- | --------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number |
| sign            | String | yes      |            | Signature             |


```json title= Sample Request
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field              | Type    | Required | Length | Description                                          |
| ------------------ | ------- | -------- | ------ | ---------------------------------------------------- |
|    merchantOrderNo | String  | yes      | 32     | Merchant order number                                |
|    tradeNo         | String  | yes      |        | Platform order number                                |
|    amount          | String  | yes      |        | Payout amount                                        |
|    status          | Int     | yes      |        | `0` Init (equivalent to pending, non-final status. The order creation request has been received and is awaiting risk review and approval)<br>`1` Pending (pending, non-final status. The order has entered the payout processing flow)<br>`2` Successful (success, final status. The payout has been completed)<br>`3` Failed (failed, final status. Order creation validation or preliminary approval failed. The payout can be re-initiated as needed)<br>`4` Refunded (refunded, final status. The order has been fully refunded) |
| voucherUrl         | String  | yes      |        | Voucher address                                      |


```json title=Sample Response
{
  "code": 200,
  "data": {
    "amount": "1000.00",
    "merchantOrderNo": "OrderNoExample",
    "status": 1,
    "tradeNo": "TF2501010001MX0000000000000000"
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}

```
```json title= Sample order no exist
{
    "code": 400,
    "msg":"Order not found",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```

