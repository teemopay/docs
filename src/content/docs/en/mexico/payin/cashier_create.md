---
title: Create Cashier
description: Merchant creates a cashier order
---

### Request URL

| method | url                          |
|--------|------------------------------|
| POST   | /api/checkout/payment/create |

### Headers

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | MX                |
| appCode          | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-----------------|--------|----------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| paymentType     | Int    | no       |        | Payment method. 1:VA 4:PayCashOnce 5:PayCashRecurrent 6:OXXO                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| expirationTime  | String | no       |        | Old version: The default validity period is 1 day; the minimum is 10 minutes and the maximum is 20 days.Format explanation: Xm = minutes (e.g., 90m means 90 minutes), Xh = hours (e.g., 2h means 2 hours), Xd = days (e.g., 5d means 5 days). <br/><br/> New version: Expiration time, millisecond-level timestamp, e.g., 1735660800000. (Default: 1 day; Minimum: 10 minutes; Maximum: 7 days) <br/><br/>  <span style="color: red;"> The system will mandatorily adopt the new version on 2026-05-21. </span> |
| amount          | String | yes      | 20     | Amount, positive integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| phone           | String | no       | 10     | Phone number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| email           | String | no       | 50     | User email                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| callbackUrl     | String | no       | 200    | Callback URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| sign            | String | yes      |        | Signature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

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
|-----------------|--------|----------|--------|-----------------------------------------------|
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