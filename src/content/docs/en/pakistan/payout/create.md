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
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (PK) |
| app_code         | App code          |

### Request Parameters

| Field           | Type   | Required | Length | Description                                               |
| --------------- | ------ | -------- | ------ | --------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                     |
| amount          | String | yes      | 20     | Payout amount in Pakistani Rupees (must be integer)       |
| bankCode        | String | yes      | 50     | Bank code (use bankCode for 301, WalletCode for 302)      |
| bankName        | String | yes      | 50     | Bank name (same as bank code field)                       |
| accountType     | Int    | yes      |        | Account type: 301(BANK) 302(E-Wallet)                     |
| bankAccount     | String | yes      | 255    | Bank/Wallet account                                       |
| realName        | String | yes      | 255    | Customer name                                             |
| idCardNumber    | String | yes      | 13     | ID number (13 digits)                                     |
| idType          | String | yes      | 32     | Fixed value: CERT                                         |
| phone           | String | yes      | 10     | User phone number (10 digits)                             |
| email           | String | no       | 64     | User email                                                |
| userIBAN        | String | no       | 64     | International Bank Account Number                         |
| callbackUrl     | String | no       | 200    | Payout callback URL, if not provided uses merchant config |
| sign            | String | yes      |        | Signature                                                 |
