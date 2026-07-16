---
title: Cashier Creation
description: Merchant creates a cashier
---

### Request URL

| method | url                          |
|--------|------------------------------|
| POST   | /api/checkout/payment/create |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | CO                |
| app_code         | App code          |

## Supported Payment Types (paymentType)

| Payment Method Name | PaymentType |
|---------------------|-------------|
| PSE                       | 201         |
| WALLET（NEQUI_PSE）         | 202         |
| EFECTY                    | 205         |
| DAVIPLATA (DAVIPLATA_PSE) | 207         |
| TRANSFIYA                 | 209         |
| MOVII (MOVIL_PSE)         | 210         |
| DALE (DALE_PSE)           | 211         |
| BREB_KEY                  | 212         |
| NEQUI_PUSH                | 213         |
| BREB_QR                   | 214         |
| DAVIPLATA_PUSH            | 215         |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                   |
|-----------------|--------|----------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                                                                                                         |
| paymentType     | Int    | No       |        | Payment type, see list above. If not passed, configured payment methods will be returned                                                      |
| amount          | String | Yes      | 20     | Amount                                                                                                                                        |
| expirationTime  | String | No       |        | Page expiration time 【Minimum 1 day, maximum 7 days in millisecond timestamp, e.g.: 1735660800000】                                            |
| idType          | String | No       | 32     | If passed, will be carried to the page; ID type: CC (6-10 digits; ID card), CE (6-10 digits), NIT (9 digits; Tax ID), PA (9 digits; Passport) |
| idCardNumber    | String | No       | 50     | If passed, will be carried to the page; ID number: CC 10 digits, CE 6-10 digits, NIT 9 digits, PA alphanumeric                                |
| realName        | String | No       | 64     | If passed, will be carried to the page; User name                                                                                             |
| phone           | String | No       | 50     | If passed, will be carried to the page; 10 digits starting with 3; for wallet payment, pass the wallet account                                |
| email           | String | No       | 50     | If passed, will be carried to the page; Payer email; must comply with regex expression                                                        |
| remark          | String | No       |        | If passed, will be carried to the page; Order remarks                                                                                         |
| bankCode        | String | No       |        | If passed, will be carried to the page; Payment bank (required when using PSE)                                                                |
| callbackUrl     | String | No       | 200    | Callback address (if not passed, the callback address configured in the merchant backend will be used)                                        |
| sign            | String | Yes      |        | Signature                                                                                                                                     |

```json title=Request Example
{
  "merchantOrderNo": "test-order",
  "paymentType": 201,
  "amount": "100",
  "idType": "CC",
  "idCardNumber": "1234567890",
  "realName": "Test User",
  "phone": "3111111111",
  "email": "user@example.com",
  "remark": "order remark",
  "bankCode": "1052",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter       | Type   | Required | Length | Description                               |
|-----------------|--------|----------|--------|-------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                     |
| tradeNo         | String | Yes      |        | Platform order number                     |
| amount          | String | Yes      |        | Order transaction amount                  |
| status          | Int    | Yes      |        | Collection status: 0-Processing, 3-Failed |
| checkoutLink    | String | Yes      |        | Cashier address                           |
| expirationTime  | String | Yes      |        | Cashier address expiration time           |
| errorMsg        | String | No       |        | Error message, returned on failure        |

```json title=Success Response Example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "test-order",
    "tradeNo": "TS2509080002COexample754",
    "amount": "100",
    "status": 0,
    "checkoutLink": "https://test-co-payin.teemopay.com/#/?tradeNo=TS2509080002COexample754",
    "expirationTime": "2025-09-17 13:53:45.959",
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "1e7142b1c2cf47479ccfdbb1ecba5242.94.17579264259380029"
}
```

### Error Codes

| Error Code | Error Message                                                       | Solution                                                                                             |
|------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| 412        | Please try again later                                              | Please try again later                                                                               |
| 414        | *                                                                   | Modify corresponding parameters                                                                      |
| 416        | Application not found                                               | app_code error, please modify                                                                        |
| 424        | This payment method is not configured                               | Collection method not configured, please contact us to configure the corresponding collection method |
| 426        | merchant order duplicate                                            | Please use a different merchant order number                                                         |
| 427        | The callback notification address for collection must not be empty. | Collection callback address not configured, please configure the collection callback address         |
| 445        | Amount must be an integer                                           | Amount must be an integer                                                                            |
| 460        | The current payment method is unavailable.                          | Current collection method unavailable, please change                                                 |
| 473        | Merchant joint verification error: *                                | Configuration error, please contact us                                                               |
| 500        | Business Error                                                      | Please contact us                                                                                    |

```json title=Error Response Example
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
