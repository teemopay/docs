---
title: Create Payout
description: Merchant requests to create a payout order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### Header Information

| Header Parameter | Description       |
|-----------------|-------------------|
| timestamp       | Request timestamp |
| nonce          | Random value      |
| country        | Country code (CL) |
| app_code       | Application ID    |

### Request Parameters

| Field           | Type     | Required | Length | Description |
| --------------- | -------- | -------- | ------ | ----------- |
| merchantOrderNo | String   | Yes      | 32     | Merchant order number |
| amount          | String   | Yes      | 20     | Payout amount (in pesos). Only integers are supported. |
| bankCode        | String   | Yes      | 50     | Bank code |
| bankName        | String   | Yes      | 50     | Bank name |
| accountType     | Int      | Yes      | —      | Account type. See account types in the bank list for details. |
| bankAccount     | String   | Yes      | 50     | Beneficiary account number |
| realName        | String   | Yes      | 40     | User full name with no special characters; uppercase is recommended. |
| idCardNumber    | String   | Yes      | 50     | Beneficiary ID number |
| idType          | String   | Yes      | 32     | ID type. See ID types in the ID list for details. |
| phone           | String   | Yes      | 9      | 9-digit user phone number, excluding area code (e.g. 9 XXXX XXXX) |
| email           | String   | Yes      | 64     | User email address |
| callbackUrl     | String   | No       | 200    | Payout callback URL. If not provided, merchant-configured URL will be used. |
| sign            | String   | Yes      | —      | Signature |

```json title="Request Example"
{
    "bankAccount": "3000000000",
    "bankCode": "",
    "bankName": "BANCO ESTADO",
    "amount": "10000",
    "idType": "CC",
    "accountType": 201,
    "merchantOrderNo": "OrderNoExample",
    "realName": "TEEMO",
    "phone": "923456789",
    "idCardNumber": "0234567890",
    "callbackUrl": "https://www.callbackexample.com",
    "email": "TeemoPay@example.com",
    "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter       | Type   | Required | Length | Description                                    |
| --------------- | ------ | -------- | ------ | ---------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                          |
| tradeNo        | String | yes      |        | Platform order number                          |
| status         | Int    | yes      |        | 1-Processing 3-Failed(can be initiated again)  |
| amount         | String | yes      |        | Transaction amount                             |

```json title="Response Example"
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "tradeNo": "TF2501010001CL0000000000000000",
         "amount":"1000.00",
        "status": 1
    },
    "msg": "success",
    "success": true
}
```
