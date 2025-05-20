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
| code               | Integer | yes      |        | Response code                                        |
| msg                | String  | yes      |        | Response message                                     |
| data               | Object  | yes      |        | Response data                                        |
| └─ merchantOrderNo | String  | yes      | 32     | Merchant order number                                |
| └─ tradeNo         | String  | yes      |        | Platform order number                                |
| └─ amount          | String  | yes      |        | Payout amount                                        |
| └─ remark          | String  | yes      |        | Remarks                                              |
| └─ status          | Int     | yes      |        | Payout status: 2 = Success, 3 = Failed, 4 = Refunded |
| └─ sign            | String  | yes      |        | Signature                                            |


```json title=Sample Response
{
  "code": 200,
  "data": {
    "amount": "1000.00",
    "merchantOrderNo": "OrderNoExample",
    "sign": "TEEMO_SIGN",
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

