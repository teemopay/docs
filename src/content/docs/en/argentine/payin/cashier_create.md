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
|-----------------|--------| -------- | ------ |--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | 是  | 32  | Merchant order number                                                                                                                                              |
| paymentType     | Int    | 否  |     | If no transmission occurs, the configured payment method will be returned; Payment methods: 【901 (QR), 902 (CVU), 903 (CHECKOUT), 905 (Rapipago), 906 (Pagofacil)】 |
| amount          | String | 是  | 20  | amount                                                                                                                                                             |
| expirationTime  | String | 否  | 20  | Expiration time, millisecond-level timestamp, e.g.: 1735660800000 [Default: one day, minimum: 10 minutes, maximum: seven days]                                                                                                                   |
| idType          | String | 是  |     | Personal identification type: DNI, CUIT, CUIL                                                                                                                                         |
| idCardNumber    | String | 是  | 11  | Personal Identification Number: DNI (8-digit number), CUIT (11-digit number), CUIL (11-digit number)                                                                                                                           |
| phone           | String | 否  | 10  | 10-digit number without area code                                                                                                                                                          |
| email           | String | 否  | 50  | Payee's email address; Must comply with regular expression rules                                                                                                                                                |
| realName        | String | 是  | 50  | Payee's name. Please capitalize all letters.                                                                                                                                                     |
| callbackUrl     | String | 否  | 200 | Revert the callback address (if not provided, use the callback address configured in the merchant's backend)）                                                                                                                                         |
| remark          | String | 否  | 200 | remark                                                                                                                                                               |
| sign            | String | 是  |     | signature                                                                                                                                                                 |

```json title= request example 
{
  "merchantOrderNo": "ceshi-test",
  "paymentType": 901,
  "amount": "1000",
  "expirationTime": "1765943486000",
  "idType": "DNI",
  "idCardNumber": "312312334",  // Fiction is only used for demonstration purposes.
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
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
    "code": 200,
    "data": {
        "amount": "1000.00",
        "tradeNo": "TS2501010001PK0000000000000000",
        "expirationTime": "2025-01-01 00:00:00",
        "checkoutLink": "https://pk-payin.teemopay.com/#/?tradeNo=TS2501010001PK0000000000000000",
        "merchantOrderNo": "OrderNoExample",
        "status": 0
    }
}
```