---
title: Create a payout order
description: Create a payout order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### Header Information

| Header Parameter | Parameter Description |
| ---------------- |-----------------------|
| timestamp        | Request timestamp     |
| nonce            | Random value          |
| country          | Country code (MX)     |
| app_code         | Application ID        |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                   |
| --------------- | ------ | -------- | ------ | ----------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                         |
| amount          | String | yes      | 20     | Payout amount (in pesos)                                                      |
| bankCode        | String | yes      | 50     | Bank code                                                                     |
| bankName        | String | yes      | 50     | Bank name                                                                     |
| accountType     | Int    | yes      |        | Account type 3-Debit card 40-CLABE                                            |
| bankAccount     | String | yes      | 50     | Recipient account number                                                      |
| realName        | String | yes      | 40     | Customer name                                                                 |
| idCardNumber    | String | yes      | 50     | Recipient ID number                                                           |
| callbackUrl     | String | no       | 200    | Payout callback URL, if not provided, the merchant configuration will be used |
| sign            | String | yes      |        | Signature                                                                     |

```json title=Request Example
{
  "outTradeNo": "OrderNoExample",
  "amount": "100",
  "bankCode": "646",
  "bankName": "STP",
  "accountType": 3,
  "bankAccount": "1234567890",
  "realName": "John Doe",
  "idCardNumber": "1234567890",
  "callbackUrl": "https://merchant.com/api/payout/callback",
  "sign": "YOUR_SIGN"
}
```

### Return Parameters

| Parameter       | Type   | Required | Length | Description                         |
| --------------- | ------ | -------- | ------ | ----------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number               |
| tradeNo         | String | yes      |        | Platform order number               |
| status          | Int    | yes      |        | 1-Pending 3-Failed (can be retried) |
| amount          | String | yes      |        | Transaction amount                  |

```json title=Return Example
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "status": 1,
  "sign": "TEEMO_SIGN"
}
```
