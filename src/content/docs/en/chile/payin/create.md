---
title: Create Payment
description: Merchant requests to create a payment order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Header Information

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (CL) |
| app_code         | App number        |

## Supported Payment Types (paymentType)

| Payment Type Name   | PaymentType (Parameter) |
|---------------------|-------------------------|
| All-In-One Checkout | 601                     |
| WEBPAY              | 602                     |
| KHIPU               | 603                     |
| PAGO46              | 604                     |
| BANK_TRANSFER       | 605                     |
| WALLET              | 606                     |

All-In-One Checkout including:

KHIPU
WEBPAY
BANK TRANSFER
MACH
PAGO46



### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                              |
| --------------- | ------ | -------- | ------ |----------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                                                                    |
| paymentType     | Int    | Yes      |        | Payment type                                                                                             |
| realName        | String | Yes      | 50     | User name: uppercase, no special characters, within 50 characters                                        |
| email           | String | No       | 50     | User email: must match regex pattern                                                                     |
| amount          | String | Yes      | 20     | Payment amount (in pesos)                                                                                |
| expirationTime  | Long   | No       |        | Expiration time |
| phone           | String | No       | 20     | Phone number                                                                                             |
| callbackUrl     | String | No       | 200    | Payment callback URL, if not provided, merchant configuration will be used                               |
| sign            | String | Yes      |        | Signature                                                                                                |

```json title="Sample Request"
{
    "realName": "TeemoPay",
    "amount": "10000",
    "phone": "1234567890",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample",
    "email": "TeemoPay@example.com",
    "paymentType": 601,
    "sign": "YOUR_SIGN"
}
```

### Response Parameters


| Field           | Type       | Required | Length | Description                                                                  |
| --------------- | ---------- | -------- | ------ | ---------------------------------------------------------------------------- |
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                                        |
| tradeNo         | String     | yes      | 32     | Platform order number                                                        |
| amount          | String     | yes      | 32     | Transaction amount                                                           |
| paymentType     | Int        | yes      | 3      | Payment method                                                               |
| paymentInfo     | String     | yes      | 32     | Main payment information, e.g., payment reference number used for the payout |
| additionalInfo  | JSONObject | no       |        | Additional information                                                       |
| status          | Int        | yes      |        | Payout status: 1 = Success, 3 = Failed                                       |
| errorMsg        | String     | no       |        | Error message, returned only if the payout failed                            |



```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "10000",
    "tradeNo": "TS2501010001CO0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 601,
    "additionalInfo": {

    },
    "paymentInfo": "https://www.paymentLinkExample.com",
    "status": 1
  }
}
```