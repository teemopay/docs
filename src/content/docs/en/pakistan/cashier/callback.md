---
title: Collection Callback
description: Merchant receives a collection result callback
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
| appCode          | Application code  |

### Collection Callback Parameters

| Parameter       | Type   | Required | Length | Description                                              |
| --------------- | ------ | -------- | ------ | -------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                    |
| tradeNo         | String | yes      |        | Platform order number                                    |
| paymentOrderNo  | String | yes      | 30     | Platform collection payment serial number                |
| status          | Int    | yes      |        | 2:Success 3:Failed                                       |
| paymentAmount   | String | yes      |        | Actual payment amount                                    |
| serviceAmount   | String | yes      |        | Service fee e.g: 18.02                                   |
| paymentInfo     | String | yes      |        | Main payment information, returns actual payment details |
| paymentType     | Int    | yes      |        | Actual payment method 303:easypaisa, 304:jazzcash        |
| sign            | String | yes      |        | Signature                                                |
