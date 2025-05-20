---
title: Payout Callback
description: Receive a payout result callback
---


### Callback URL

| method | url                            |
| ------ | ------------------------------ |
| POST   | Merchant provided callback URL |

### Header

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | MX                |
| appCode          | Application ID    |

### Callback Parameters


| Parameter       | Type   | Required | Length | Description                                                                           |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------- |
| merchantOrderNo | String | Yes      | 32     | Merchant's order number                                                               |
| tradeNo         | String | Yes      |        | Platform's order number                                                               |
| amount          | String | Yes      |        | Transaction amount                                                                    |
| serviceAmount   | String | Yes      |        | Service fee (e.g., 18.02)                                                             |
| ~~remark~~      | String | Yes      |        | Remark — currently fixed as "" (To be removed after 2025-05-06)                       |
| status          | Int    | Yes      |        | Payout status: 2 = Success, 3 = Failure                                               |
| errorCode       | Number | Yes      |        | Error code for failed transaction                                                     |
| errorMessage    | String | Yes      |        | Error message (see table below)                                                       |
| completeTime    | String | Yes      |        | Completion time in local time zone, format: yyyy-MM-dd HH\:mm\:ss (New on 2025-05-06) |
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

### Error Message Description

| errorCode | errorMessage                                                                                                                  | Notes                                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1003      | Multiple failures within 30 minutes. Kindly refer to the previous reason, contact the user to change the card or retry later. | "Previous reason" refers to the reason for the last two failures. Decide whether to retry or change card accordingly. |
| 1004      | Wallet limit exceeded, kindly contact user to upgrade or restore limit.                                                       | Daily/monthly/yearly wallet limit exceeded (EP/JZ)                                                                    |
| 1005      | Transaction amount exceeds limit, kindly retry within allowed range.                                                          | Amount limit exceeded (e.g., range is 100–50000)                                                                      |
| 1006      | Wallet account frozen, kindly contact user to change card and retry.                                                          | Wallet restricted by risk control (frozen, dormant, temporary hold)                                                   |
| 1007      | Wallet account abnormal, kindly contact user to verify account and retry.                                                     | Incorrect wallet info (e.g., wrong card number or CNIC, unverified)                                                   |
| 1008      | Request field error, kindly verify and retry.                                                                                 | Technical parameter error, not as per documentation                                                                   |
| 1009      | Channel request error, technicians will fix ASAP.                                                                             | System under maintenance                                                                                              |
| 1010      | Unstable network, kindly retry later.                                                                                         | Network fluctuation                                                                                                   |
| 1011      | Parameter validation error, kindly verify and retry.                                                                          | Technical parameter error, not as per documentation                                                                   |
| 1012      | Payment method error, kindly select the right way and try again.                                                              | Distinguish between wallet and bank account                                                                           |
| 1013      | Invalid receiver information, kindly verify and retry.                                                                        | Invalid user input                                                                                                    |
| 1014      | Account inexist or CNIC mismatch, kindly verify or register wallet then retry.                                                | Incorrect wallet info (e.g., wrong card number or CNIC, unverified)                                                   |
| 1015      | Insufficient balance, kindly contact user to recharge and retry.                                                              | Not enough balance                                                                                                    |
| 9999      | Others                                                                                                                        | Unknown issue due to insufficient info from the bank                                                                  |

### Callback Response

| Parameter | Type   | Required | Length | Description                                   |
| --------- | ------ | -------- | ------ | --------------------------------------------- |
| SUCCESS   | String | Yes      |        | Must return `"SUCCESS"`, otherwise will retry |

```json title= Callback Response
{
  SUCCESS
}
```