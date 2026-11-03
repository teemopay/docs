---
title: Create Payin
description: Merchant requests to create a collection order
---

### Request URL

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### Header Information

| Header Parameter | Description             |
|------------------|-------------------------|
| timestamp        | Request timestamp       |
| nonce            | Random value            |
| country          | Country code (e.g., BR) |
| appCode          | Application ID          |

### Supported Payment Methods (paymentType)

| Payment Method             | PaymentType (Parameter) |
|----------------------------|-------------------------|
| PIX (Online bank transfer) | 401                     |

### Additional Information Fields Explanation

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| -          | -    | -        | -           |

### Request Parameters

| Field           | Type   | Required | Length | Description                                              |
|-----------------|--------|----------|--------|----------------------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                    |
| paymentType     | Int    | Yes      |        | Payment Type: 401-PIX                                    |
| amount          | String | Yes      | 20     | Payin amount (in Brazilian Real), up to 2 decimal places |
| expirationTime  | Long   | No       |        | Expiration time                                          |
| realName        | String | No       | 64     | User's real name                                         |
| email           | String | No       | 50     | User's email, must match the regex format                |
| phone           | String | No       | 50     | Phone number                                             |
| status          | Int    | yes      | -      | Order Status 【1: Payment in Progress; 3: Payment Failed】 |
| idCardNumber    | String | No       | 50     | ID card number                                           |
| sign            | String | Yes      |        | Signature                                                |
| callbackUrl     | String | No       | 200    | Callback URL                                             |

```json
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "TeemoPay",
  "amount": "100.1",
  "callbackUrl": "https://www.callbackexample.com",
  "paymentType": 401,
  "email": "TeemoPay@example.com",
  "phone": "11987654321",
  "idCardNumber": "1234567890",
  "sign": "YOUR_SIGN",
  "expirationTime": 1717092000000
}
```

### Response Parameters

| Field           | Type       | Required | Length | Description                                                                                                         |
|-----------------|------------|----------|--------|---------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                                                                               |
| tradeNo         | String     | yes      | 32     | Platform order number                                                                                               |
| amount          | String     | yes      | 32     | Transaction amount                                                                                                  |
| paymentType     | Int        | yes      | 10     | Payment Method 【401: -PIX】                                                                                          |
| paymentInfo     | String     | yes      | 32     | Main payment information. The returned data is the actual information used for payment, such as the payment number. |
| additionalInfo  | JSONObject | no       | -      | Additional Information                                                                                              |
| -- paymentLink  | String     | no       | -      | Payment link information                                                                                            |
| status          | Int        | yes      | -      | Order Status 【1: Payment in Progress; 3: Payment Failed】                                                            |
| errorMsg        | String     | no       | -      | Error Message 【Returned when payment fails】                                                                         |

### additionalInfo (Additional Field) Field Description

| Field       | Type   | Required | Description                       |
|-------------|--------|----------|-----------------------------------|
| paymentLink | String | N        | Extended payment link information |

### Response Examples

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001AR0000000000000000",
    "additionalInfo": null,
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "PaymentInfoExample",
    "paymentType": 901,
    "status": 1
  }
}
```

### Validation Error Codes

| Error Code | Error Message                                                       | Handling Solution                                             |
|------------|---------------------------------------------------------------------|---------------------------------------------------------------|
| 412        | Please try again later                                              | Please try again later                                        |
| 414        | *                                                                   | Please change the corresponding parameter                     |
| 423        | This payment method is not supported                                | Payment method not supported, please check docs or contact us |
| 426        | merchant order duplicate                                            | Please change merchant order number                           |
| 427        | The callback notification address for collection must not be empty. | Please configure collection callback URL                      |
| 443        | ID number must not be null                                          | ID number cannot be empty                                     |
| 466        | Payment method fee rate not configured.                             | Merchant fee rate configuration error, please contact us      |
| 473        | Merchant joint verification error: *                                | Merchant configuration error, please contact us               |
| 474        | The id card number must be 11 digits.                               | ID number must be 11 digits                                   |
| 500        | Business Error                                                      | Please contact us                                             |

```json title=Response Example
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```
