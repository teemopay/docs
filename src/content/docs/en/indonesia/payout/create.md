---
title: Create a payout order
description: Create a payout order
---

### Request URL

| Method | URL                         |
| ------ | --------------------------- |
| POST   | `/api/pay/payout/create/v1` |


### Headers

| Header Parameter | Description       |
| --------------- | ----------------- |
| timestamp       | Request timestamp |
| nonce           | Random string     |
| country         | Country ID        |
| app_code        | Application code  |



### Request Parameters


| Field           | Type   | Required | Length | Description                                                                  |
| --------------- | ------ | -------- | ------ | ---------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                        |
| amount          | String | yes      | 20     | Payout amount (in IDR), integer only                                         |
| bankCode        | String | yes      | 50     | Bank code                                                                    |
| bankName        | String | yes      | 50     | Bank name                                                                    |
| accountType     | Int    | yes      |        | 501: BankTransfer                                                            |
| bankAccount     | String | yes      | 255    | Beneficiary account number                                                   |
| realName        | String | yes      | 255    | Account holder's name                                                        |
| phone           | String | yes      | 10-13  | Phone number starting with "08", 10 to 13 digits                             |
| email           | String | yes      | 64     | User email address                                                           |
| callbackUrl     | String | no       | 200    | Callback URL for payout result; if not provided, defaults to merchant config |
| sign            | String | yes      |        | Signature                                                                    |



```json
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "TeemoPay",
  "bankCode": "1",
  "bankName": "BANK",
  "accountType": 101,
  "bankAccount": "1234567890123456",
  "amount": "100000",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN",
  "idType": "DNI",
  "phone": "081234567890",
  "idCardNumber": "12345678"
}
```

### Response Parameters


| Field           | Type   | Required | Length | Description                                           |
| --------------- | ------ | -------- | ------ | ----------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                 |
| tradeNo         | String | yes      |        | Platform order number                                 |
| status          | Int    | yes      |        | Payout status: 1 = Processing, 3 = Failed (can retry) |
| amount          | String | yes      |        | Transaction amount                                    |


```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001ID0000000000000000",
    "amount": "100",
    "status": 1
  },
  "msg": "success",
  "success": true
}
```
