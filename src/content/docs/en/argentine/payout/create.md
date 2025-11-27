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
| country          | Country code (AR)     |
| app_code         | Application ID        |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                                         |
| --------------- | ------ | -------- | ------ |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo  | String  | yes      | 32     | Merchant Order No.                                                                                                                                                                  |
| amount           | String  | yes      | 20     | Disbursement Amount [Currency: ARS (Argentine Peso)]                                                                                                                                |
| bankCode         | String  | no       | 50     | Bank Code [Refer to the bank code in the bank list]                                                                                                                                 |
| bankName         | String  | no       | 50     | Bank Name [Refer to the bank name in the bank list]                                                                                                                                 |
| accountType      | Integer | yes      |        | Account Type [901: AHORRO (Savings), 902: CORRIENTE (Current)]                                                                                                                      |
| bankAccount      | String  | yes      | 50     | Beneficiary's Bank Account [CVU or CBU, 22-digit number]                                                                                                                            |
| idCardNumber     | String  | yes      | 50     | Beneficiary's ID Card Number                                                                                                                                                        |
| realName         | String  | yes      | 40     | User's Full Name. No special characters allowed; uppercase is recommended. Length ≥ 2 letters. Strict verification is not required, but it must comply with normal name formatting. |
| idType           | String  | yes      | 50     | ID Type: DNI (Personal ID Card - 8 digits), CUIL (Social Security Number - 11 digits), CUIT (Tax ID Number - 11 digits), PA (Passport - Maximum 15 digits)                               |
| phone            | String  | no       | 10     | Phone Number                                                                                                                                                                        |
| email            | String  | no       | 64     | Email Address                                                                                                                                                                       |
| callbackUrl      | String  | no       | 200    | Disbursement Callback URL. If not provided, the merchant's pre-configured URL will be used.                                                                                         |
| sign             | String  | yes      |        | Signature                                                                                                                                                                           |

```json title=请求示例
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "accountType": 901,
    "bankAccount": "1234567890123456789012",
    "realName": "realName",
    "idCardNumber": "12345678",
    "idType": "DNI",
    "callbackUrl": "https://www.callbackexample.com",
    "sign": "YOUR_SIGN"
}
```

### Return Parameters

| Parameter       | Type   | Required | Length | Description                         |
| --------------- | ------ | -------- | ------ | ----------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number               |
| tradeNo         | String | yes      |        | Platform order number               |
| status          | Int    | yes      |        | Reimbursement status 【1: Payment in progress 3: Failure (can be re-initiated)】 |
| amount          | String | yes      |        | Transaction amount                  |

```json title=Return Example
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "status": 1,
  "sign": "TEEMO_SIGN"
}
```
