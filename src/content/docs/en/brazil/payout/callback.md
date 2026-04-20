---
title: Payout Callback
description: Merchant receives a payout result callback
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
| country          | BR                |
| appCode          | Application ID    |

### Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                                                                                                             |
|-----------------|--------|----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                                                                   |
| tradeNo         | String | yes      |        | Platform order number                                                                                                                                   |
| amount          | String | yes      |        | Transaction amount                                                                                                                                      |
| serviceAmount   | String | yes      |        | Service fee e.g.: 18.02                                                                                                                                 |
| status          | Int    | yes      |        | Payment status: 2: Success 3: Failure 4: Refunded 5: Partially refunded                                                                                 |
| refundNo        | Int    | yes      |        | The refund order number for this time is "T00X-", where X represents the number of refunds. For example, the first refund would be 1. T001-TF2501010001 |
| refundAmount    | Int    | yes      |        | The amount of the current refund                                                                                                                        |
| refundStatus    | Int    | yes      |        | The current refund status: 0 (partial refund) 1 (full refund)）                                                                                          |
| refundTime      | Int    | yes      |        | The time for this refund                                                                                                                                |
| completeTime    | String | yes      |        | Completion time: In the current country's time zone, in the format of yyyy-MM-dd HH:mm:ss                                                               |
| errorCode       | number | yes      |        | Order failure status error code                                                                                                                         |
| errorMessage    | String | yes      |        | Order failure error message: 1000-Card error or limit 1001-Refunded 1002-Channel fluctuation 9999-Others                                                |
| sign            | String | yes      |        | Signature                                                                                                                                               |

```json title="Callback Example"
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "status": 2,
  "amount": "1000.00",
  "serviceAmount": "60.00",
  "sign": "TEEMO_SIGN"
}
```

```json title="Callback Example"
{
  "amount": "300",
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001BR0000000000000000",
  "completeTime": "2026-04-20 04:17:29",
  "status": 5,
  "serviceAmount": "0",
  "refundStatus": 2,
  "refundNo": "T002-TF2405220001BR0000527108668641",
  "refundAmount": "200",
  "refundTime": "2026-04-20 04:17:29",
  "errorMessage": null,
  "errorCode": null,
  "sign": ""
}
```

> Error Code Description:

| errorCode | errorMessage                                | Suggestion                                                                 |
|-----------|---------------------------------------------|----------------------------------------------------------------------------|
| 1000      | The account does not exist or is restricted | Suggest user to change card                                                |
| 1001      | Return                                      | Refunded, suggest to retry payout within 24 hours after receiving callback |
| 1002      | Channel server fluctuations                 | Channel fluctuation, suggest retry after 10 minutes                        |
| 9999      | Others                                      | Other issues, suggest canceling the order                                  |

### Callback Response

| Parameter | Type   | Required | Length | Description                                               |
|-----------|--------|----------|--------|-----------------------------------------------------------|
| SUCCESS   | String | yes      |        | Must return "SUCCESS" otherwise callback will be repeated |

```json title="Response Example"
SUCCESS
```
