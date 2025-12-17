---
title: Create Cashier
description: Merchant creates a cashier order
---

### Request URL

| method | url                         |
|--------|-----------------------------|
| POST   | /api/checkout/payment/create |


### Headers

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | AR                |
| appCode          | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                        |
|-----------------|--------| -------- |--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | 是  | 32     | Merchant order number                                                                                                                                              |
| paymentType     | Int    | 否  |        | If no transmission occurs, the configured payment method will be returned; Payment methods: 【901 (QR), 902 (CVU), 903 (CHECKOUT), 905 (Rapipago), 906 (Pagofacil)】 |
| amount          | String | 是  | 20     | amount                                                                                                                                                             |
| expirationTime  | String | 否  | 20     | Expiration time, millisecond-level timestamp, e.g.: 1735660800000 [Default: one day, minimum: 10 minutes, maximum: seven days]                                                                                                                   |
| idType          | String | 是  | 50     | Personal identification type: DNI, CUIT, CUIL  【It is recommended to use CUIT】                                                                                                                                         |
| idCardNumber    | String | 是  | 11     | Personal Identification Number: DNI (8-digit number), CUIT (11-digit number), CUIL (11-digit number)                                                                                                                           |
| phone           | String | 否  | 10     | 10-digit number without area code                                                                                                                                                          |
| email           | String | 否  | 50     | Payee's email address; Must comply with regular expression rules                                                                                                                                                |
| realName        | String | 是  | 50     | Payee's name. Please capitalize all letters.                                                                                                                                                     |
| callbackUrl     | String | 否  | 200    | Revert the callback address (if not provided, use the callback address configured in the merchant's backend)）                                                                                                                                         |
| remark          | String | 否  | 200    | remark                                                                                                                                                               |
| sign            | String | 是  |        | signature                                                                                                                                                                 |

```json title= request example 
{
  "merchantOrderNo": "ceshi-test",
  "paymentType": 901,
  "amount": "1000",
  "expirationTime": "1765943486000",
  "idType": "CUIT",
  "idCardNumber": "31231233434",  // Fiction is only used for demonstration purposes.
  "phone": "3111111111",
  "email": "213@123.com",
  "realName": "张三",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter       | Type   | Required | Length | Description                                   |
| --------------- | ------ | -------- | ------ | --------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                         |
| tradeNo         | String | yes      |        | Platform order number                         |
| amount          | String | yes      |        | Order transaction amount                      |
| status          | Int    | yes      |        | Collection status: 0 = processing, 3 = failed |
| checkoutLink    | String | no       |        | Checkout page URL                             |
| expirationTime  | String | no       |        | Checkout page expiration time                 |
| errorMsg        | String | no       |        | Error message, returned when failed           |



```json title= response example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "ceshi-test",
    "tradeNo": "TS2509080002ARexample754",
    "amount": "100",
    "status": 0,
    "checkoutLink": "https://test-ar-payin.teemopay.com/#/?tradeNo=TS2509080002ARexample754",
    "expirationTime": "2025-09-17 13:53:45.959",
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "1e7142b1c2cf47479ccfdbb1ecba5242.94.17579264259380029"
}
```