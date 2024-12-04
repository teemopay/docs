---
title: Cashier Query
description: Merchant queries the status of a cashier order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payment/query/v1 |

### Header Information

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (PK) |
| app_code         | App code          |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      |        | Signature             |
