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
| PaymentLink         | 501                     |

### `additionalInfo` (Additional Fields) Description

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| -          | -    | -        | -           |

### Request Parameters

| Field            | Type   | Required | Length | Description                               |
|------------------|--------|----------|--------|-------------------------------------------|
| merchantOrderNo  | String | yes      | 32     | Merchant order number                     |
| paymentType      | Int    | yes      |        | Payment type: 501                         |
| amount           | String | yes      | 20     | Collection amount (in IDR), integer only  |
| realName         | String | yes      | 64     | User's full name                          |
| email            | String | yes      | 50     | User's email (must match regex format)    |
| phone            | String | yes      |        | Phone number, starts with 08, 10–13 digits|
| sign             | String | yes      |        | Signature                                 |
| callbackUrl      | String | no       | 200    | Callback URL                              |

#### Sample Request

```json
{
  "merchantOrderNo": "C27412415HkF6U9SnXRrxitBWD647lw7",
  "realName": "aaaaaa",
  "amount": "100.1",
  "callbackUrl": "http://test.domin.com",
  "paymentType": 401,
  "email": "1QWWQWQ2891@qq.com",
  "phone": "123456789",
  "idCardNumber": "1234567890",
  "sign": "YOUR SIGN",
  "expirationTime": 1717092000000
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
  "code": 200,
  "data": {
    "amount": "100",
    "tradeNo": "TS2405220001MX0000048362685411",
    "merchantOrderNo": "C31412415HkF6U9SnXRrxitBWD647lw7",
    "paymentType": 204,
    "additionalInfo": {},
    "paymentInfo": "Xsdsadsadsad.com",
    "status": 1
  },
  "success": true
}

```