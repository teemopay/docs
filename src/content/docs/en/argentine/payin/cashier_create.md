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

| Field           | Type   | Required | Length | Description                                                                                                                                                      |
|-----------------|--------| -------- |--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                                                                                                                            |
| paymentType     | Int    | No       |        | If not passed, configured payment methods will be returned; Payment methods: 【901 (QR), 902 (CVU), 905 (Rapipago), 906 (Pagofacil)】                            |
| amount          | String | Yes      | 20     | Amount (Integer only). Example: 1000. <br/> <br/> <span style="color: red;">Amount Reduction Scenario: The amount must be a multiple of 100, otherwise the system will block the submission.<br/>Examples: 100, 200, 300, 400<br/>Invalid examples: 101, 110, 210</span>                                   |
| expirationTime  | String | No       | 20     | Expiration time, millisecond-level timestamp, e.g.: 1735660800000 [Default: one day, minimum: 10 minutes, maximum: seven days]. <br/> <br/> <span style="color: red;">Amount Reduction Scenario: The expiration time will be set to 15 minutes after submission.</span> |
| idType          | String | Yes      | 50     | Personal identification type: DNI, CUIT, CUIL, USER_REF. 【It is recommended to use CUIT】                                                                                                                                       |
| idCardNumber    | String | Yes      | 11     | Personal Identification Number: DNI (7 or 8 digits), CUIT (11 digits, the first digit must be 2 or 3), CUIL (11 digits), USER_REF(1-50 alphanumeric characters)                                                                                                                      |
| phone           | String | No       | 10     | 10-digit number without area code                                                                                                                                                        |
| email           | String | No       | 50     | Payer's email address; Must comply with regular expression rules                                                                                                                                              |
| realName        | String | Yes      | 50     | Payer's name. Please capitalize all letters.                                                                                                                                                   |
| callbackUrl     | String | No       | 200    | Collection callback URL (if not provided, use the callback URL configured in the merchant's backend)                                                                                                                                       |
| remark          | String | No       | 200    | Remark                                                                                                                                                             |
| sign            | String | Yes      |        | Signature                                                                                                                                                               |

```json title= request example 
{
  "merchantOrderNo": "ceshi-test",
  "paymentType": 901,
  "amount": "1000",
  "expirationTime": "1765943486000",
  "idType": "CUIT",
  "idCardNumber": "31231233434",
  "phone": "3111111111",
  "email": "213@123.com",
  "realName": "ZHANG SAN",
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
| checkoutLink    | String | yes      |        | Checkout page URL                             |
| expirationTime  | String | yes      |        | Checkout page expiration time                 |
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

### Error Codes

| Error Code | Error Message                                                                                                                                                           | Handling Solution                                           |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| 412        | Please try again later                                                                                                                                                  | Please try again later                                      |
| 414        | *                                                                                                                                                                       | Please change the corresponding parameter                   |
| 416        | Application not found                                                                                                                                                   | app_code error, please change                               |
| 424        | This payment method is not configured                                                                                                                                   | Payment method not configured, please contact us            |
| 426        | merchant order duplicate                                                                                                                                                | Please change merchant order number                         |
| 427        | The callback notification address for collection must not be empty.                                                                                                     | Collection callback URL not configured, please configure    |
| 438        | Phone number is error                                                                                                                                                   | Please check and change phone number                        |
| 460        | The current payment method is unavailable.                                                                                                                              | Current payment method unavailable, please change           |
| 473        | Merchant joint verification error: *                                                                                                                                    | Configuration error, please contact us                      |
| 478        | Invalid format for expireTime                                                                                                                                           | Use UTC timestamp                                           |
| 479        | The id type is error (Example: DNI, CUIT, CUIL. It is recommended to use CUIT.)                                                                                         | Use one of (DNI, CUIT, CUIL), 【It is recommended to use CUIT】 |
| 480        | ID card number error (DNI: must be 7–8 digits in length; CUIL: must be 11 digits in length; CUIT: must be 11 digits in length, with the first digit restricted to 2 or 3) | DNI (7 or 8 digits), CUIT (11 digits, first digit must be 2 or 3), CUIL (11 digits) |
| 500        | Business Error                                                                                                                                                          | Please contact us                                           |

```json title= response example
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
