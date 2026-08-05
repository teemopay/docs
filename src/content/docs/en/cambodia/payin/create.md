---
title: Create Payment
description: Merchant requests to create a payment order
---

### Request URL

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| app_code         | Application ID    |

### Supported Payment Methods (paymentType)

| Payment Method | PaymentType |
|----------------|-------------|
| KHQR           | 2001        |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                 |
|-----------------|--------|----------|--------|-------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                       |
| paymentType     | Int    | yes      |        | Payment method: 2001-KHQR                                   |
| amount          | String | yes      | 20     | Payment amount in Cambodian riel (KHR); integers only       |
| realName        | String | yes      | 64     | Payer's real first and last name                            |
| email           | String | yes      | 50     | Payer's real email address; must be in a valid email format |
| phone           | String | yes      | 50     | Phone number: 8-9 digits without country code;              |
| idCardNumber    | String | yes      | 50     | Platform identity reference, up to 50 characters;           |
| idType          | String | no       | 32     | ID type: NONE_KYC 、KYC                                      |
| sign            | String | yes      |        | Signature                                                   |
| callbackUrl     | String | no       | 200    | Callback URL                                                |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "paymentType": 2001,
  "amount": "10000",
  "realName": "TeemoPay",
  "email": "TeemoPay@example.com",
  "phone": "12345678",
  "idCardNumber": "UserReferenceExample",
  "idType": "NONE_KYC",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type       | Required | Length | Description                                                    |
|-----------------|------------|----------|--------|----------------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                          |
| tradeNo         | String     | yes      |        | Platform order number                                          |
| amount          | String     | yes      |        | Transaction amount                                             |
| paymentType     | Int        | yes      |        | Payment method                                                 |
| paymentInfo     | String     | yes      |        | Main payment information; the payment link returned upstream   |
| additionalInfo  | JSONObject | no       |        | Additional payment information, including the original QR data |
| status          | Int        | yes      |        | Order status: 2-Success, 3-Failed                              |
| errorMsg        | String     | no       |        | Error message, returned when payment fails                     |

```json title="Success Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001KH0000000000000000",
    "amount": "10000.00",
    "paymentType": 2001,
    "paymentInfo": "https://www.paymentLinkExample.com",
    "additionalInfo": {},
    "status": 2,
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299"
}
```

### Error Codes

| Error Code | Error Message                                                       | Handling Solution                              |
|------------|---------------------------------------------------------------------|------------------------------------------------|
| 412        | Please try again later                                              | Please try again later                         |
| 414        | *                                                                   | Correct the corresponding parameter            |
| 423        | This payment method is not supported                                | Check the documentation or contact us          |
| 426        | merchant order duplicate                                            | Use a different merchant order number          |
| 427        | The callback notification address for collection must not be empty. | Configure the payment callback URL             |
| 466        | Payment method fee rate not configured.                             | Contact us to configure the payment fee rate   |
| 473        | Merchant joint verification error: *                                | Contact us to check the merchant configuration |
| 500        | Business Error                                                      | Please contact us                              |

```json title="Error Response Example"
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
