---
title: Payment Callback
description: Merchant receives a payment result callback
---

### Callback URL

| method | url                            |
| ------ | ------------------------------ |
| POST   | Merchant provided callback URL |

### Header Information

| Header Parameter | Description               |
| ---------------- |---------------------------|
| timestamp        | Request timestamp         |
| nonce            | Random value              |
| country          | Country Country code (CL) |
| appCode          | Application ID            |

### Payment Callback

| Parameter       | Type   | Required | Length | Description                                      |
| --------------- | ------ | -------- | ------ | ------------------------------------------------ |
| merchantOrderNo | String | yes      | 32     | Merchant order number                            |
| tradeNo         | String | yes      |        | Platform order number                            |
| paymentOrderNo  | String | yes      | 30     | Platform payment transaction number              |
| status          | Int    | yes      |        | 2: Success                                       |
| paymentAmount   | String | yes      |        | Actual payment amount for this transaction       |
| serviceAmount   | String | yes      |        | Service fee e.g.: 18.02                          |
| paymentInfo     | String | yes      |        | Main payment information used for actual payment |
| paymentType     | Int    | yes      |        | Payment type                                     |
| sign            | String | yes      |        | Signature                                        |



```json title= Request Example
{

  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TS2501010001CO0000000000000000",
  "paymentOrderNo": "TSOPaymentOrderNoExample",
  "status": 2,
  "paymentAmount": "1000.00",
  "serviceAmount": "10.00",
  "paymentInfo": "https://www.paymentLinkExample.com",
  "paymentType": 601,
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