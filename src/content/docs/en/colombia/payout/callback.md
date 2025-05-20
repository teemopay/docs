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
|-----------------|-------------------|
| timestamp       | Request timestamp |
| nonce          | Random value      |
| country        | CO                 |
| appCode        | Application code  |

### Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                                                |
| -------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------------ |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                      |
| tradeNo        | String | yes      |        | Platform order number                                                                      |
| amount         | String | yes      |        | Transaction amount                                                                         |
| serviceAmount  | String | yes      |        | Service fee e.g.: 18.02                                                                    |
| remark         | String | yes      |        | Remarks                                                                                    |
| status         | String | Int      |        | 2-Payout Success 3-Payout Failed 4-Refunded                                               |
| errorCode      | number | yes      |        | Order failure status error code                                                           |
| errorMessage   | String | yes      |        | Order failure error message: 1000-Card error or limit 1001-Refunded 1002-Channel fluctuation 9999-Others |
| sign           | String | yes      |        | Signature                                                                                 |

```json title="Callback Example"
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "remark": "Payout remarks",
  "status": 2,
  "amount":"1000.00",
  "serviceAmount":"60.00",
  "sign": "TEEMO_SIGN"
}
```

> Error Code Description:

| errorCode | errorMessage                                | Suggestion                                                                                |
| --------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1000      | The account does not exist or is restricted | Suggest user to change card                                                              |
| 1001      | Return                                      | Refunded, suggest to retry payout within 24 hours after receiving callback               |
| 1002      | Channel server fluctuations                 | Channel fluctuation, suggest retry after 10 minutes                                      |
| 9999      | Others                                      | Other issues, suggest canceling the order                                                |

### Callback Response

| Parameter | Type   | Required | Length | Description                                                          |
| --------- | ------ | -------- | ------ | -------------------------------------------------------------------- |
| SUCCESS   | String | yes      |        | Must return "SUCCESS" otherwise callback will be repeated            |

```json title="Response Example"
SUCCESS
```
