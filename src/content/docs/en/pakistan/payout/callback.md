---
title: Payout Callback
description: Merchant receives a payout result callback
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
| country          | PK                |
| appCode          | Application ID    |


### Callback Parameters

| Field           | Type   | Required | Length | Description                                                                           |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------- |
| merchantOrderNo | String | Yes      | 32     | Merchant's order number                                                               |
| tradeNo         | String | Yes      |        | Platform order number                                                                 |
| amount          | String | Yes      |        | Transaction amount                                                                    |
| serviceAmount   | String | Yes      |        | Service fee, e.g., 18.02                                                              |
| ~~remark~~      | String | Yes      |        | Remarks (fixed as "") (Removed on 2025-05-06)                                         |
| status          | Int    | Yes      |        | Payout status: `2` for success, `3` for failure                                       |
| errorCode       | Number | Yes      |        | Error code in case of failure                                                         |
| errorMessage    | String | Yes      |        | Error message in case of failure (see below for explanation)                          |
| completeTime    | String | Yes      |        | Completion time in local timezone, format `yyyy-MM-dd HH:mm:ss` (Added on 2025-05-06) |
| sign            | String | Yes      |        | Signature                                                                             |


```json title= Success Callback Example
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001PK0000000000000000",
  "amount": "1000.00",
  "serviceAmount": "25.50",
  "status": 2,
  "errorCode": null,
  "errorMessage": null,
  "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"
}

```



```json title= Failure Callback Example
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001PK0000000000000000",
  "amount": null,
  "serviceAmount": null,
  "status": 3,
  "errorCode": 1004,
  "errorMessage": "Wallet limit exceeded, kindly contact user to upgrade or restore limit.",
  "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"
}


```

### Error Message Explanation


| Error Code | Error Message                                                                                                                 | Description                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1003       | Multiple failures within 30 minutes. Kindly refer to the previous reason, contact the user to change the card or retry later. | Based on recent two failure reasons, consider changing card or retrying |
| 1004       | Wallet limit exceeded, kindly contact user to upgrade or restore limit.                                                       | Daily/monthly/yearly wallet limit exceeded                              |
| 1005       | Transaction amount exceeds limit, kindly retry within allowed range.                                                          | Amount limit: 100 - 50000                                               |
| 1006       | Wallet account frozen, kindly contact user to change card and retry.                                                          | Wallet is frozen, dormant, or temporarily controlled                    |
| 1007       | Wallet account abnormal, kindly contact user to verify account and retry.                                                     | Wallet error: wrong card/CNIC, inactive, or not verified                |
| 1008       | Request field error, kindly verify and retry.                                                                                 | Incorrect technical parameter, not per documentation                    |
| 1009       | Channel request error, technicians will fix ASAP.                                                                             | System under maintenance                                                |
| 1010       | Unstable network, kindly retry later.                                                                                         | Network fluctuations                                                    |
| 1011       | Parameter validation error, kindly verify and retry.                                                                          | Incorrect technical parameter, not per documentation                    |
| 1012       | Payment method error, kindly select the right way and try again.                                                              | Wrong payment method: wallet vs bank account                            |
| 1013       | Invalid receiver information, kindly verify and retry.                                                                        | Invalid user details                                                    |
| 1014       | Account inexist or CNIC mismatch, kindly verify or register wallet then retry.                                                | Wallet info incorrect, account not activated or verified                |
| 1015       | Insufficient balance, kindly contact user to recharge and retry.                                                              | Not enough funds                                                        |
| 9999       | Others                                                                                                                        | Unknown issues due to insufficient info from bank side                  |

### Callback Response

| Field   | Type   | Required | Length | Description                                           |
| ------- | ------ | -------- | ------ | ----------------------------------------------------- |
| SUCCESS | String | Yes      |        | Must return `"SUCCESS"`, otherwise it will be retried |


```json title= response example
{
  SUCCESS
}

```