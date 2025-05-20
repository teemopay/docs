---
title: Payment Callback
description: Merchant receives a payment result callback
---

### Callback URL

| method | url                            |
| ------ | ------------------------------ |
| POST   | Merchant provided callback URL |

### Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country CO        |
| appCode          | Application ID    |

### Payin Callback

| Parameter       | Type   | Required | Length | Description                                                                                               |
| --------------- | ------ | -------- | ------ | --------------------------------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant's order number                                                                                   |
| tradeNo         | String | yes      |        | Platform's order number                                                                                   |
| paymentOrderNo  | String | yes      | 30     | Platform's unique payment transaction number for this collection                                          |
| status          | Int    | yes      |        | Status code (2: Success)                                                                                  |
| paymentAmount   | String | yes      |        | Actual payment amount for this transaction                                                                |
| serviceAmount   | String | yes      |        | Service fee, e.g., 18.02                                                                                  |
| paymentInfo     | String | yes      |        | Primary payment information, i.e., actual information used for the payment                                |
| paymentType     | Int    | yes      |        | Payment method                                                                                            |
| completeTime    | String | yes      |        | Completion time of the transaction (local time zone), format: yyyy-MM-dd HH\:mm\:ss (Added on 2025-05-06) |
| errorMessage    | String | no       |        | Error message if the transaction failed                                                                   |
| sign            | String | yes      |        | Signature                                                                                                 |


```json title= Request Example
{

  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TS2501010001CO0000000000000000",
  "paymentOrderNo": "TSOPaymentOrderNoExample",
  "status": 2,
  "paymentAmount": "1000.00",
  "serviceAmount": "10.00",
  "paymentInfo": "https://www.paymentLinkExample.com",
  "paymentType": 204,
  "completeTime": "2025-01-01 00:00:00",
  "errorMessage": null,
  "sign": "TEEMO_SIGN"

}
```


### Callback Response 

| Field   | Type   | Required | Description                                             |
| ------- | ------ | -------- | ------------------------------------------------------- |
| SUCCESS | String | yes      | Must return `"SUCCESS"` or the callback will be retried |

```json title= Request Example
{
  SUCCESS

}
```

