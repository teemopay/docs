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
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (PE) |
| app_code         | Apolication ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                        |
| --------------- | ------ | -------- | ------ |----------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                              |
| amount          | String | yes      | 20     | Payout amount (in Soles)                                                                           |
| phone           | String | no       | 9      | 9 digits starting with 9                                                                           |
| bankCode        | String | yes      | 50     | Bank code                                                                                          |
| bankName        | String | yes      | 50     | Bank name                                                                                          |
| accountType     | Int    | yes      |        | Account type 101-AHORRO(Savings) 102-CORRIENTE(Current)  103 - WALLET（YAPE）                        |
| bankAccount     | String | yes      | 50     | Beneficiary account number                                                                         |
| realName        | String | yes      | 40     | Customer name                                                                                      |
| idCardNumber    | String | yes      | 50     | Beneficiary ID number                                                                              |
| idType          | String | yes      | 32     | DNI(8 digits; ID card), RUC(11 digits; Tax ID), CE(9 digits; Foreigner ID), PA(9 digits; Passport) |
| callbackUrl     | String | no       | 200    | Payout callback URL, if not provided, merchant configuration will be used                          |
| sign            | String | yes      |        | Signature                                                                                          |



```json 
{
    "bankAccount": "1234567899276",
    "bankCode": "2",
    "bankName": "INTERBANK",
    "realName": "TEEMO",
    "amount": "100.00",
    "idType": "DNI",
    "phone": "123456789",
    "cciNumber": "12345678901203910293",
    "accountType": "101",
    "idCardNumber": "12345678",
    "sign": "YOUR_SIGN",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample"
}
```

### Response Parameters


| Field           | Type   | Required | Length | Description                                           |
| --------------- | ------ | -------- | ------ | ----------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                 |
| tradeNo         | String | yes      |        | Platform order number                                 |
| status          | Int    | yes      |        | Payout status: 1 = Processing, 3 = Failed (can retry) |
| amount          | String | yes      |        | Transaction amount                                    |


```json title=SUCCESS
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
    "code": 200,
    "data": {
        "amount": "100.00",
        "merchantOrderNo": "OrderNoExample",
        "status": 1,
        "tradeNo": "TF2501010001PE0000000000000000"
    }
}
```
```json title=FAIL
{
    "code": 425,
    "data": null,
    "msg": "Insufficient merchant balance",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```