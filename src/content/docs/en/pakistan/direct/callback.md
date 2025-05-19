---
title: Payin Callback
description: Merchant receives a collection result callback
---

### Callback URL

| method | url                            |
| ------ | ------------------------------ |
| POST   | Merchant provided callback URL |

### Headers

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | PK                |
| appCode          | Application ID   |



### Payin Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                                                             |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                   |
| tradeNo         | String | yes      |        | Platform order number                                                                                   |
| paymentOrderNo  | String | yes      | 30     | Platform’s current payin payment transaction number                                                     |
| status          | Int    | yes      |        | 2: success, 3: failure                                                                                  |
| paymentAmount   | String | yes      |        | Actual payment amount for this transaction                                                              |
| serviceAmount   | String | yes      |        | Service fee, e.g. 18.02                                                                                 |
| paymentInfo     | String | yes      |        | Main payment information, showing the actual info used for payment                                      |
| paymentType     | Int    | yes      |        | Actual payment method: 303: easypaisa, 304: jazzcash, 305: bankTransfer                                 |
| completeTime    | String | yes      |        | Completion time of this transaction in local timezone, format: yyyy-MM-dd HH\:mm\:ss (Added 2025-05-06) |
| errorMessage    | String | no       |        | Error message when order fails                                                                          |
| sign            | String | yes      |        | Signature                                                                                               |




```json title= Success Callback Example
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001PK0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 2,
    "paymentAmount": "1000.00", 
    "serviceAmount": "10.00",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "paymentType": 304,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": null,
    "sign": "TEEMO_SIGN"
}
```



```json title= Failure Callback Example

{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001PK0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 3,
    "paymentAmount": "1000.00",
    "serviceAmount": "0.00",
    "paymentInfo": "jazzcash",
    "paymentType": 304,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": "Unstable network, kindly retry later.",
    "sign": "TEEMO_SIGN"
}
```


### Error Message Descriptions

| errorMessage                                                                   | Explanation                                                                     |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Wallet limit exceeded, kindly contact user to upgrade or restore limit.        | EP/JZ daily/monthly/yearly limit exceeded                                       |
| Transaction amount exceeds limit, kindly retry within allowed range.           | Requested amount 100-50000 exceeded limit                                       |
| Wallet account frozen, kindly contact user to change card and retry.           | User wallet is under risk control (frozen, dormant, temporary restriction)      |
| Wallet account abnormal, kindly contact user to verify account and retry.      | User wallet info error (wrong card number or CNIC, not activated, not verified) |
| Request field error, kindly verify and retry.                                  | Incorrect upload of technical parameters, not per documentation                 |
| Channel request error, technicians will fix ASAP.                              | Maintenance                                                                     |
| Unstable network, kindly retry later.                                          | Network fluctuation                                                             |
| User canceled the payment on wallet.                                           | Order submitted but user did not complete wallet payment                        |
| Account inexist or CNIC mismatch, kindly verify or register wallet then retry. | User wallet info error (wrong card number or CNIC, not activated, not verified) |
| Parameter validation error, kindly verify and retry.                           | Incorrect upload of technical parameters, not per documentation                 |
| Insufficient balance, kindly contact user to recharge and retry.               | Insufficient balance                                                            |
| Others                                                                         | Other unknown reasons due to insufficient information from bank                 |



### Callback Response

| Field   | Type   | Required | Description                                               |
| ------- | ------ | -------- | --------------------------------------------------------- |
| SUCCESS | String | yes      | Must return "SUCCESS", otherwise callback will be retried |


```json title= response example
SUCCESS
```