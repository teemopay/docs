---
title: Create Payout
description: Merchant requests to create a payout order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### Headers

| Header Parameter | Description      |
| ---------------- |------------------|
| timestamp        | Request timestamp |
| nonce            | Random value     |
| country          | PK |
| appCode         | Application ID   |

### Request Parameters

| Field           | Type   | Required | Max Length | Description                                           |
| --------------- | ------ | -------- | ---------- | ----------------------------------------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number                                 |
| amount          | String | yes      | 20         | Payout amount in PKR, must be an integer              |
| bankCode        | String | yes      | 50         | Bank code: use bankCode if 301, WalletCode if 302     |
| bankName        | String | yes      | 50         | Bank name, same as bank code                          |
| accountType     | Int    | yes      |            | Account type: 301 (BANK), 302 (E-Wallet)              |
| bankAccount     | String | yes      | 255        | Bank/Wallet account number                            |
| realName        | String | yes      | 255        | Customer name                                         |
| idCardNumber    | String | yes      | 13         | ID number (13 digits)                                 |
| idType          | String | yes      | 32         | Fixed value: CERT                                     |
| phone           | String | yes      | 10         | Phone number (10 digits)                              |
| email           | String | no       | 64         | Customer email                                        |
| userIBAN        | String | no       | 64         | International Bank Account Number (IBAN)              |
| callbackUrl     | String | no       | 200        | Callback URL, uses merchant's default if not provided |
| sign            | String | yes      |            | Signature                                             |


```json title= request example
{
  "merchantOrderNo": "2503231308020924",
  "amount": "1000",
  "bankCode": "EASYPAISA",
  "bankName": "EASYPAISA",
  "accountType": 302,
  "bankAccount": "3000000000",
  "realName": "TEEMO",
  "idCardNumber": "3000000000000",
  "idType": "CERT",
  "phone": "3000000000",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type   | Required | Max Length | Description                                           |
| --------------- | ------ | -------- | ---------- | ----------------------------------------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number                                 |
| tradeNo         | String | yes      |            | Platform order number                                 |
| status          | Int    | yes      |            | Payout status: 1 - Processing, 3 - Failed (can retry) |
| amount          | String | yes      |            | Transaction amount                                    |



```json title= response example
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
  "code": 200,
  "data": {
    "amount": "1000",
    "merchantOrderNo": "OrderNoExample",
    "status": 1,
    "tradeNo": "TF2501010001CPK0000000000000000"
}

}
```