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
| country          | MX                |
| appCode          | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                                                     |
| --------------- | ------ | -------- | --- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32  | Merchant order number                                                                                                                                                                           |
| paymentType     | Int    | no       |     | Payment method. 1:VA 4:PayCashOnce 5:PayCashRecurrent 6:OXXO                                                                                                                                    |
| expirationTime    | String | no       |     | The default is 1day; the shortest time is 10 minutes and the longest is 20 days; Xm: minutes (such as 90m for 90 minutes), Xh: hours (such as 2h for 2 hours), Xd: days (such as 5d for 5 days) |
| amount          | String | yes      | 20  | Amount, positive integer                                                                                                                                                                        |
| phone           | String | no       | 10  | Phone number                                                                                                                          |
| email           | String | no       | 50  | User email                                                                                                                                                                                      |
| callbackUrl     | String | no       | 200 | Callback URL                                                                                                                                                                                    |
| sign            | String | yes      |     | Signature                                                                                                                                                                                       |


```json title= request example 
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
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
        "tradeNo": "TS2501010001MX0000000000000000",
        "expirationTime": "2025-01-01 00:00:00",
        "checkoutLink": "https://mx-payin.teemopay.com/#/?tradeNo=TS2501010001MX0000000000000000",
        "merchantOrderNo": "OrderNoExample",
        "status": 0
    }
}
```