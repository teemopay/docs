---
title: Create Cashier
description: Merchant creates a cashier order
---

### Request URL

| method | url                          |
| ------ | ---------------------------- |
| POST   | /api/checkout/payment/create |

### Header Information

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (PK) |
| app_code         | App code          |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                            |
| --------------- | ------ | -------- | ------ | ---------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                  |
| idCardNumber    | String | no       | 13     | Customer ID card number (13 digits)                                    |
| amount          | String | yes      | 20     | Amount (positive integer)                                              |
| phone           | String | no       | 10/11  | Phone number (10 digits starting with 3 or 11 digits starting with 03) |
| email           | String | no       | 50     | User email                                                             |
| callbackUrl     | String | no       | 200    | Callback URL                                                           |
| sign            | String | yes      |        | Signature                                                              |
