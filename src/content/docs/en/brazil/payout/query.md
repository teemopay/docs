---
title: Payout Query
description: Merchant queries the status of a payout order
---

### Request URL

| method | url                      |
|--------|--------------------------|
| POST   | /api/pay/payout/query/v1 |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (BR) |
| app_code         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
|-----------------|--------|----------|--------|-----------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      |        | Signature             |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter         | Type   | Required | Length | Description                                                              |
|-------------------|--------|----------|--------|--------------------------------------------------------------------------|
| merchantOrderNo   | String | yes      | 32     | Merchant order number                                                    |
| tradeNo           | String | yes      |        | Platform order number                                                    |
| amount            | String | yes      |        | Payout amount                                                            |
| status            | Int    | yes      |        | Payout status, 2: Success 3: Failed                                      |
| serviceAmount     | String | yes      |        | Service fee = Fixed fee + Transaction amount * Service rate              |
| immService        | String | yes      |        | Fixed fee                                                                |
| serviceRate       | String | yes      |        | Service rate                                                             |
| totalRefundAmount | String | yes      |        | Total refund amount                                                      |
| refundDetails     | Array  | yes      |        | Refund details                                                           |
| - refundNo        | String | yes      |        | Refund number                                                            |
| - refundAmount    | String | yes      |        | Refund amount for this transaction                                       |
| - refundStatus    | String | yes      |        | Refund status 0 (Partial refund) 1 (Full refund)                         |
| - refundTime      | String | yes      |        | Refund time for this transaction                                         |
| errorCode         | number | yes      |        | Order failure error code                                                 |
| errorMessage      | String | yes      |        | Order failure error message                                              |
| completeTime      | String | yes      |        | Completion time in current country timezone, format: yyyy-MM-dd HH:mm:ss |

```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2405220001BR0000509326631881",
    "amount": "300.11",
    "status": 1,
    "serviceRate": "0.0500",
    "serviceAmount": "20.01",
    "immService": "5.00",
    "completeTime": null,
    "errorCode": null,
    "errorMessage": null
  },
  "msg": "success",
  "traceId": "2e0e38e3e9a24b60b4f57c6d2ced196a.115.17744291515713103"
}

```

```json title=Refund Example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2405220001BR0000509326631881",
    "errorMessage": "FINAL_FAILURE_MANUAL",
    "amount": "1000.00",
    "status": 4,
    "serviceRate": "0.0500",
    "serviceAmount": "55.00",
    "immService": "5.00",
    "completeTime": "2026-04-17 00:23:24",
    "errorCode": 1024,
    "cepUrl": null,
    "totalRefundAmount": "1000.00",
    "refundDetails": [
      {
        "refundNo": "R001-20260417002149463108",
        "refundAmount": "500.00",
        "refundStatus": 2,
        "refundTime": "2026-04-17 00:21:50"
      },
      {
        "refundNo": "R001-20260417002149463108123123",
        "refundAmount": "500.00",
        "refundStatus": 2,
        "refundTime": "2026-04-17 00:21:50"
      }
    ]
  },
  "msg": "success",
  "traceId": "dcf1aee524564c5485a655d09a02aa02.86.17766720253031143"
}

```

```json title="Order Not Found Response Example"
{
  "code": 400,
  "msg": "Order not found",
  "success": false
}
```