---
title: Payment Callback
description: Merchant receives a payment result callback
---

### Callback URL

| method | url                            |
| ------ | ------------------------------ |
| POST   | Merchant provided callback URL |

### Header Information

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code      |
| appCode          | App code          |

### Payment Callback Parameters

| Field           | Type   | Required | Length | Description                                                                    |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------ |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                          |
| tradeNo         | String | yes      |        | Platform order number                                                          |
| paymentOrderNo  | String | yes      | 30     | Platform payment transaction number (different for each payment of same order) |
| status          | Int    | yes      |        | 2: Success                                                                     |
| paymentAmount   | String | yes      |        | Actual payment amount for this transaction                                     |
| serviceAmount   | String | yes      |        | Service fee e.g: 18.02                                                         |
| paymentInfo     | String | yes      |        | Main payment information, returns actual information used for payment          |
| paymentType     | Int    | yes      |        | Payment method                                                                 |
| sign            | String | yes      |        | Signature                                                                      |
