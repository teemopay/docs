---
title: Create Payin
description: Merchant requests to create a collection order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Header Information

| Header Parameter | Description             |
| ---------------- |-------------------------|
| timestamp        | Request timestamp       |
| nonce            | Random value            |
| country          | Country code (e.g., BR) |
| app_code         | Application ID          |

### Supported Payment Methods (paymentType)

| Payment Method      | PaymentType (Parameter) |
| ------------------- | ----------------------- |
| PIX (Online bank transfer) | 401                 |

### Additional Information Fields Explanation

| Field Name         | Type   | Required | Description        |
| ------------------ | ------ | -------- | ------------------ |
| -                  | -      | -        | -                  |

### Request Parameters

| Field             | Type     | Required | Length | Description                                              |
| ----------------- | -------- | -------- | ------ |----------------------------------------------------------|
| merchantOrderNo   | String   | Yes      | 32     | Merchant order number                                    |
| paymentType       | Int      | Yes      |        | Payment Type: 401-PIX                                    |
| amount            | String   | Yes      | 20     | Payin amount (in Brazilian Real), up to 2 decimal places |
| expirationTime    | Long     | No       |        | Expiration time                                          |
| realName          | String   | No       | 64     | User's real name                                         |
| email             | String   | No       | 50     | User's email, must match the regex format                |
| phone             | String   | No       | 50     | Phone number                                             |
| idCardNumber      | String   | No       | 50     | ID card number                                           |
| sign              | String   | Yes      |        | Signature                                                |
| callbackUrl       | String   | No       | 200    | Callback URL                                             |

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
