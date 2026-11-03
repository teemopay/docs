---
title: Payment Callback
description: Merchant receives a payment result callback
---

### Callback URL

| method | url                            |
|--------|--------------------------------|
| POST   | Merchant provided callback URL |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | KH                |
| appCode          | Application code  |

### Callback Parameters

| Field           | Type   | Required | Length | Description                                                    |
|-----------------|--------|----------|--------|----------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                          |
| tradeNo         | String | yes      |        | Platform order number                                          |
| paymentOrderNo  | String | yes      | 30     | Platform transaction number for this payment                   |
| status          | Int    | yes      |        | 2-Success                                                      |
| paymentAmount   | String | yes      |        | Actual amount paid in this transaction                         |
| serviceAmount   | String | yes      |        | Service fee, e.g., 18.02                                       |
| paymentInfo     | String | yes      |        | Main payment information actually used for payment             |
| paymentType     | Int    | yes      |        | Payment method: 2001-KHQR or 2002-KHQR_USD                     |
| completeTime    | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss |
| errorMessage    | String | no       |        | Order failure error message                                    |
| sign            | String | yes      |        | Signature                                                      |

```json title="Success Callback Example"
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TS2501010001KH0000000000000000",
  "paymentOrderNo": "TSOPaymentOrderNoExample",
  "status": 2,
  "paymentAmount": "10000.00",
  "serviceAmount": "100.00",
  "paymentInfo": "https://www.paymentLinkExample.com",
  "paymentType": 2001,
  "completeTime": "2025-01-01 00:00:00",
  "errorMessage": null,
  "sign": "TEEMO_SIGN"
}
```

### Callback Response

| Field   | Type   | Required | Length | Description                                               |
|---------|--------|----------|--------|-----------------------------------------------------------|
| SUCCESS | String | yes      |        | Return `SUCCESS`; otherwise, the callback will be retried |

```text title="Response Example"
SUCCESS
```
