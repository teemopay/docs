---
title: Payout Callback
description: Received a Callback
---

### Callback Url

| Method | URL                                   |
| ------ | ------------------------------------- |
| POST   | Callback URL provided by the merchant |


### Headers

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random string     |
| country          | ID                |
| appCode          | Application code  |


### Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                    |
| --------------- | ------ | -------- | ------ | -------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant's order number                                        |
| tradeNo         | String | yes      |        | Platform's order number                                        |
| amount          | String | yes      |        | Transaction amount                                             |
| serviceAmount   | String | yes      |        | Service fee, e.g., 18.02                                       |
| remark          | String | yes      |        | Remarks                                                        |
| status          | String | yes      |        | Payout status: 2 = Success, 3 = Failure                        |
| errorCode       | Number | yes      |        | Error code if the transaction failed                           |
| errorMessage    | String | yes      |        | Error message for failed transactions (see explanations below) |
| sign            | String | yes      |        | Signature                                                      |



```json
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "remark": "Payout remark",
  "status": 2,
  "amount": "1000.00",
  "serviceAmount": "60.00",
  "sign": "TEEMO_SIGN"
}

```

### Error Code Explanations:

| errorCode | errorMessage                                | Recommendation                                               |
| --------- | ------------------------------------------- | ------------------------------------------------------------ |
| 1000      | The account does not exist or is restricted | Recommend the user to change to another card                 |
| 1001      | Return                                      | Refunded. Retry payout within 24 hours of receiving callback |
| 1002      | Channel server fluctuations                 | Retry after 10 minutes                                       |
| 9999      | Others                                      | Other issues. Recommend canceling the order                  |


### Callback Response


| Parameter | Type   | Required | Length | Description                                             |
| --------- | ------ | -------- | ------ | ------------------------------------------------------- |
| SUCCESS   | String | yes      |        | Must return `"SUCCESS"` or the callback will be retried |


```json
SUCCESS
```
