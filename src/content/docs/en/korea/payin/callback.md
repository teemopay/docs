---
title: Payin Callback
description: Receive a payin result callback
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
| country          | Country code (e.g., KR)                |
| appCode          | Application ID    |

### Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                                                |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------------ |
| merchantOrderNo | String | Yes      | 32     | Merchant's order number                                                                    |
| tradeNo         | String | Yes      |        | Platform transaction number                                                                |
| paymentOrderNo  | String | Yes      | 30     | Platform Collection Transaction Serial Number for This Payment                                 |
| status          | Int    | Yes      |        | Order Status 【2: Successful;】                                                                            |
| paymentAmount   | String | Yes      |        | Actual Payment Amount for This Transaction                                                               |
| serviceAmount   | String | Yes      |        | Service Fee 【e.g.: 18.02】                                                                  |
| paymentInfo     | String | Yes      |        | Main Payment Information; returns the actual information used for payment                                      |
| paymentType     | Int    | Yes      |        | Payment method                                                                             |
| completeTime    | String | Yes      |        | Completion Time of This Transaction (in the current country's time zone, formatted as yyyy-MM-dd HH:mm:ss) |
| errorMessage    | String | No       |        | Error Message for Failed Orders                                                   |
| sign            | String | Yes      |        | Signature                                                                                  |


```json title= callback example
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001MX0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 2,
    "paymentAmount": "1000.00", 
    "serviceAmount": "15.00",
    "paymentInfo": "684180093000000000",
    "paymentType": 1,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": null,
    "sign": "TEEMO_SIGN"
}
```

### errorMsg Explanation:

| `errorMsg` Message                                                   | Description                    |
| -------------------------------------------------------------------- | ------------------------------ |
| Transaction amount exceeds limit, kindly retry within allowed range. | Requested amount exceeds limit |
| Channel request error, technicians will fix ASAP.                    | Channel under maintenance      |
| Unstable network, kindly retry later.                                | Channel/network is unstable    |
| Parameter validation error, kindly verify and retry.                 | Invalid request parameters     |



### Callback Response

| Field   | Type   | Required | Description                                                     |
| ------- | ------ | -------- | --------------------------------------------------------------- |
| SUCCESS | String | Yes      | Must return `"SUCCESS"`, otherwise the callback will be retried |

```json title= callback response
{
  SUCCESS
}
```


