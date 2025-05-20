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
| --------------- | ------ | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                              |
| amount          | String | yes      | 20     | Payout amount (in Soles)                                                                           |
| phone           | String | no       | 9      | 9 digits starting with 9                                                                           |
| bankCode        | String | yes      | 50     | Bank code                                                                                          |
| bankName        | String | yes      | 50     | Bank name                                                                                          |
| accountType     | Int    | yes      |        | Account type 101-AHORRO(Savings) 102-CORRIENTE(Current)                                            |
| bankAccount     | String | yes      | 50     | Beneficiary account number                                                                         |
| realName        | String | yes      | 40     | Customer name                                                                                      |
| idCardNumber    | String | yes      | 50     | Beneficiary ID number                                                                              |
| idType          | String | yes      | 32     | DNI(8 digits; ID card), RUC(11 digits; Tax ID), CE(9 digits; Foreigner ID), PA(9 digits; Passport) |
| callbackUrl     | String | no       | 200    | Payout callback URL, if not provided, merchant configuration will be used                          |
| sign            | String | yes      |        | Signature                                                                                          |
