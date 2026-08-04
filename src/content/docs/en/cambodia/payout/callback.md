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
| country          | KH                |
| appCode          | Application code  |

### Callback Parameters

| Field           | Type   | Required | Length | Description                                                    |
|-----------------|--------|----------|--------|----------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                          |
| tradeNo         | String | yes      |        | Platform order number                                          |
| amount          | String | yes      |        | Transaction amount                                             |
| serviceAmount   | String | yes      |        | Service fee, e.g., 18.02                                       |
| status          | Int    | yes      |        | Payout status: 2-Success, 3-Failed                             |
| errorCode       | number | yes      |        | Order failure status error code                                |
| errorMessage    | String | yes      |        | Order failure error message; see the description below         |
| completeTime    | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss |
| sign            | String | yes      |        | Signature                                                      |

```json title="Success Callback Example"
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001KH0000000000000000",
  "amount": "10000.00",
  "serviceAmount": "105.00",
  "status": 2,
  "errorCode": null,
  "errorMessage": null,
  "completeTime": "2025-01-01 00:00:00",
  "sign": "TEEMO_SIGN"
}
```

> Error Code Description:

| errorCode | errorMessage                                | Suggestion                                                                 |
|-----------|---------------------------------------------|----------------------------------------------------------------------------|
| 1000      | The account does not exist or is restricted | Ask the user to use a different account                                    |
| 1001      | Return                                      | Refunded; retry within 24 hours after receiving the notification           |
| 1002      | Channel server fluctuations                 | Channel fluctuation; retry after 10 minutes                                 |
| 1006      | User account frozen, kindly contact user to change card and retry. | The user's account is restricted                         |
| 1007      | Abnormal user account, kindly contact user to verify account and retry. | The user's account information is invalid              |
| 1010      | Unstable network, kindly retry later.       | Channel fluctuation                                                        |
| 9999      | Others                                      | Other issue; cancel the order                                               |

### Callback Response

| Field   | Type   | Required | Length | Description                                             |
|---------|--------|----------|--------|---------------------------------------------------------|
| SUCCESS | String | yes      |        | Return `SUCCESS`; otherwise, the callback will be retried |

```text title="Response Example"
SUCCESS
```
