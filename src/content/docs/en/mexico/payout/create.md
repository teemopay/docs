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

### matters need attention

1. There are scenarios where the batch payment orders may fail to be successfully converted. The common reasons are that the account number for receiving payment is correctly formatted but does not exist or the status of the receiving account is abnormal. This situation typically triggers two callbacks within five minutes after the order is created. Such cases will first notify the merchant of the successful status, and then notify the merchant of the refund status. The merchant must handle this logic correctly.
2. When the account type is a debit card, the account length must be 16 digits; and the first 6 digits of bankAccount should refer to the bin list corresponding to the bankCode in the debit card list. If the debit card list does not have the bankCode, the platform will not verify the bankAccount.


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
