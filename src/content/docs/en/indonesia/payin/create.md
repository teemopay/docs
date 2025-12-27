---
title: Create a Payin Order
description: Merchant requests to create a collection (pay-in) order  
---

### Request URL

| Method | URL                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### Headers

| Header Parameter | Description             |
|------------------|-------------------------|
| timestamp        | Request timestamp       |
| nonce            | Random value            |
| country          | Country code (e.g., ID) |
| app_code         | Application ID           |

### Supported Payment Types (paymentType)

| Payment Method Name | PaymentType (Parameter) |
|---------------------|-------------------------|
| PaymentLink | 501(Cashier counter, featuring all available payment methods, including E-Wallet, VA, and QRIS.) |
| E-Wallet | 502(Cashier counter, payment method including electronic wallets, Dana, etc.)            |
| VA | 503 (Cashier counter, including payment methods such as Va and BNI.)              |
| QRIS | 504 (Cashier counter, with QRIS payment method included)                 |
| QRIS-Direct | 505 (QRIS direct connection payment method)                      |
| VA-Direct | 506 (VA direct payment method)                        |


## Support the expansion list (channel) of payment methods
| 支付方式 | channel          |
|------|------------------|
| 503  | BRI,MANDIRI,CIMB |
| 502  | DANA,LINKAJA     |
| 506  | BRI,MANDIRI,CIMB     |

### `additionalInfo` (Additional Fields) Description

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| -          | -    | -        | -           |

### Request Parameters

| Field            | Type   | Required | Length | Description                                                                 |
|------------------|--------|----------|--------|-----------------------------------------------------------------------------|
| merchantOrderNo  | String | yes      | 32     | Merchant order number                                                       |
| paymentType      | Int    | yes      |        | Payment type: 501,502,503,504,505,506                                       |
| amount           | String | yes      | 20     | Collection amount (in IDR), integer only                                    |
| realName         | String | yes      | 64     | User's full name                                                            |
| email            | String | yes      | 50     | User's email (must match regex format)                                      |
| phone            | String | yes      |        | Phone number, starts with 08, 10–13 digits                                  |
| channel         | String | no  |      |Payment method extension field. When the specific payment method is 502, 503, or 506, it must be filled in. For details, please refer to the 【List of Supported Payment Method Extensions】 |
| sign             | String | yes      |        | Signature                                                                   |
| callbackUrl      | String | no       | 200    | Callback URL                                                                |
| redirectUrl      | String | no       | 255    | When results are available, the customer can be redirected to that address. |

#### Sample Request

```json
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "TeemoPay",
  "amount": "60000",
  "callbackUrl": "https://www.callbackexample.com",
  "paymentType": 502,
  "email": "TeemoPay@example.com",
  "channel": "DANA",
  "phone": "0800000000",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type       | Required | Length | Description                                      |
| --------------- | ---------- | -------- | ------ | ------------------------------------------------ |
| merchantOrderNo | String     | yes      | 32     | Merchant order number                            |
| tradeNo         | String     | yes      | 32     | Platform order number                            |
| amount          | String     | yes      | 32     | Transaction amount                               |
| paymentType     | Int        | yes      | 3      | Payment type                                     |
| paymentInfo     | String     | yes      | 32     | Main payment info (e.g., payment code or number) |
| additionalInfo  | JSONObject | no       |        | Additional (extended) information                |
| status          | Int        | yes      |        | Collection status: 1 = Success, 3 = Failed       |
| errorMsg        | String     | no       |        | Error message (returned only when failed)        |




#### Sample Response

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "60000.00",
    "tradeNo": "TS2501010001ID0000000000000000",
    "additionalInfo": {

    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "paymentType": 502,
    "status": 1
  }
}

```