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
| country          | Country code (KR)     |
| app_code         | Application ID        |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                   |
| --------------- | ------ | -------- | ------ | ----------------------------------------------------------------------------- |
| merchantOrderNo | String  | yes | 32   | Merchant Order Number                                                |
| amount          | String  | yes | 20   | Payment Amount (for Disbursement) 【Integer, Unit: KRW (Korean Won)】                                |
| bankCode        | String  | yes | 50   | Bank Code 【Refer to the bank code in the bank list】                                |
| bankName        | String  | yes | 50   | Bank Name 【Refer to the bank name in the bank list】                                |
| accountType     | Integer | yes |      | Account Type 【801: BANK_TRANSFER】                             |
| bankAccount     | String  | yes | 50   | Beneficiary's Bank Account Number                                               |
| realName        | String  | yes | 40   | User's Real Name. No special characters allowed; uppercase is recommended. Must be at least 2 characters long. Strict verification is not required, but it must conform to normal name format. |
| idType    | String  | yes | 50   | Beneficiary Type: RRN (Individual); CO (Enterprise）                           |
| callbackUrl     | String  | no  | 200  | Disbursement Callback URL. If not provided, the merchant's configured URL will be used.                               |
| sign            | String  | yes |      | Signature                                                   |

```json title=Request Example
{
  "merchantOrderNo": "OrderNoExample",
  "amount": "1000",
  "bankCode": "088",
  "bankName": "Shinhan Bank",
  "accountType": 801,
  "bankAccount": "12345678998765",
  "realName": "realName",
  "idType": "RRN",
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
