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
| country        | Country code (CO) |
| app_code       | App number        |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                  |
| --------------- | ------ |----------|--------|----------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                        |
| amount          | String | yes      | 20     | Payout amount (in Pesos)                                                                     |
| bankCode        | String | yes      | 50     | Bank code                                                                                    |
| bankName        | String | yes      | 50     | Bank name                                                                                    |
| accountType     | Int    | yes      |        | Account type 201-AHORRO(Savings) 202-CORRIENTE(Checking) 203- TRANSFIYA (Transfer Service)  For details, please see the account types in the bank list |
| bankAccount     | String | yes      | 50     | Recipient account number                                                                     |
| realName        | String | yes      | 40     | Customer name                                                                                |
| idCardNumber    | String | yes      | 50     | Recipient ID number                                                                          |
| idType          | String | yes      | 32     | CC(6-10 digits; Citizen ID), CE(6-10 digits), NIT(9 digits; Tax ID), PA(9 digits; Passport)  |
| callbackUrl     | String | no       | 200    | Payout callback URL, if not provided, merchant configuration will be used                    |
| sign            | String | yes      |        | Signature                                                                                    |

```json title="Request Example"
{
                "merchantOrderNo": "ds111ad111022911111111111131",
                "realName": "Carlos",
                "bankCode": "1",
                "bankName": "BCP",
                "accountType": 101,
                "bankAccount": "1234567890123456",
                "amount": "100000",
                "callbackUrl": "http://127.0.0.1:8075/sys/dictionary/test",
                "sign": "YOUR SIGN",
                "idType": "DNI",
                "phone": "13175025118",
                "idCardNumber": "12345678"
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
        "merchantOrderNo": "ds111ad111002911111111111131",
        "tradeNo": "TF2405220001CO0000048840060444",
        "amount": "100",
        "status": 1
    },
    "msg": "success",
    "success": true
}
```
