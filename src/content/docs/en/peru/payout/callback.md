---
title: Payout Callback
description: Merchant receives a payout result callback
---

### Callback URL

| method | url                            |
| ------ | ------------------------------ |
| POST   | Merchant provided callback URL |

### Header Information

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | PE                |
| appCode          | Apllication ID    |

### Callback Parameters

| Field           | Type   | Required | Length | Description                                                                                              |
| --------------- | ------ | -------- | ------ | -------------------------------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                    |
| tradeNo         | String | yes      |        | Platform order number                                                                                    |
| amount          | String | yes      |        | Transaction amount                                                                                       |
| serviceAmount   | String | yes      |        | Service fee e.g: 18.02                                                                                   |
| remark          | String | yes      |        | Remark                                                                                                   |
| status          | String | yes      |        | 2-Payout success 3-Payout failed 4-Refunded                                                              |
| errorCode       | number | yes      |        | Order failure status error code                                                                          |
| errorMessage    | String | yes      |        | Order failure error message: 1000-Card error or limit 1001-Refunded 1002-Channel fluctuation 9999-Others |
| sign            | String | yes      |        | Signature                                                                                                |

### Callback Response

| Parameter | Type   | Required | Length | Description                                   |
| --------- | ------ | -------- | ------ | --------------------------------------------- |
| SUCCESS   | String | Yes      |        | Must return `"SUCCESS"`, otherwise will retry |

```json title= Callback Response
{
  SUCCESS
}
```