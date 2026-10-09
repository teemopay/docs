---
title: Create Payout
description: Merchant requests to create a payout order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### Headers

| Header Parameter | Description |
|---|---|
| timestamp | Request timestamp |
| nonce | Random value |
| country | VN |
| appCode | Application ID |

## Supported Account Types (accountType)

| Account Type Name | AccountType |
|---|---:|
| BANK | 2101 |
| Wallet | 2102 |

### Request Parameters

| Field | Type | Required | Length | Description |
|---|---|---|---:|---|
| merchantOrderNo | String | yes | 32 | Merchant order number |
| accountType | Int | yes | | Account type, see the [account type list](#supported-account-types-accounttype) |
| amount | String | yes | 20 | Payout amount; Vietnamese dong (VND), integer supported |
| bankCode | String | yes | 50 | Bank code; see the [Bank List](/en/vietnam/payout/bank) |
| bankName | String | yes | 50 | Bank name; see the [Bank List](/en/vietnam/payout/bank) |
| bankAccount | String | yes | 32 | Recipient account: provide the user's real receiving account information |
| realName | String | yes | 255 | User name: provide the user's real first and last name |
| idCardNumber | String | yes | 32 | Identity document number |
| idType | Stirng | yes | 32 | Document type: BRBANK |
| sign | String | yes | | Signature |
| email | String | yes | 50 | Recipient email: provide the user's real email address |
| phone | String | yes | 50 | Phone number: 10 digits starting with 0 |
| callbackUrl | String | no | 200 | Callback URL |

```json title="Request Example"
{
  "merchantOrderNo": "PayoutOrderExample",
  "accountType": 2101,
  "amount": "30000",
  "bankCode": "1001",
  "bankName": "ABBANK",
  "bankAccount": "0123456789",
  "realName": "Nguyen Van A",
  "idCardNumber": "001234567890",
  "idType": "BRBANK",
  "sign": "YOUR_SIGN",
  "email": "user@example.com",
  "phone": "0900000000",
  "callbackUrl": "https://www.callbackexample.com"
}
```

### Response Parameters

| Parameter | Type | Required | Length | Description |
|---|---|---|---|---|
| merchantOrderNo | String | yes | 32 | Merchant order number |
| tradeNo | String | yes | | Platform order number |
| amount | String | yes | | Transaction amount |
| status | Int | yes | | Payout status: 1 = paying, 3 = failed |
| errorCode | number | yes | | Error code for a failed order |
| errorMessage | String | yes | | Error message for a failed order; see the description below |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "PayoutOrderExample",
    "tradeNo": "TF2501010001VN0000000000000000",
    "amount": "30000",
    "status": 1,
    "errorCode": null,
    "errorMessage": null
  },
  "msg": "success"
}
```
