---
title: Payout Callback
description: Callback
---

### Callback Url

| Method | URL                                   |
| ------ | ------------------------------------- |
| POST   | Callback URL provided by the merchant |


### Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | BP                |
| appCode          | Application ID    |


### Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                                              |
| --------------- | ------ | -------- | ------ | ---------------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant's order number                                                                  |
| tradeNo         | String | yes      |        | Platform's transaction ID                                                                |
| amount          | String | yes      |        | Transaction amount                                                                       |
| serviceAmount   | String | yes      |        | Service fee, e.g., "18.02"                                                               |
| ~~remark~~      | String | yes      |        | Remark – currently fixed as "", **removed on 2025-05-06**                                |
| status          | Int    | yes      |        | Payout status: 2 = Success, 3 = Failure, 4 = Refunded                                    |
| errorCode       | Number | yes      |        | Error code for failed transactions                                                       |
| errorMessage    | String | yes      |        | Error message, see details below                                                         |
| completeTime    | String | yes      |        | Completion time in local timezone, format: `yyyy-MM-dd HH:mm:ss` *(added on 2025-05-06)* |
| sign            | String | yes      |        | Signature                                                                                |



```json title= Example: Successful Callback
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001BP0000000000000000",
  "amount": "1000.00",
  "serviceAmount": "25.50",
  "status": 2,
  "errorCode": null,
  "errorMessage": null,
  "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"
}

```


```json title= Failed Callback

{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001BP0000000000000000",
  "amount": null,
  "serviceAmount": null,
  "status": 3,
  "errorCode": 9999,
  "errorMessage": "Others",
  "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"
}

```

```json title= Refund Callback

{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001BP0000000000000000",
  "amount": "1000.00",
  "serviceAmount": "25.50",
  "status": 4,
  "errorCode": 1000,
  "errorMessage": "The account does not exist or is restricted",
  "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"
}


```

#### Error Code Reference:：

| errorCode | errorMessage                                | Suggestion                                                              |
| --------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| 1000      | The account does not exist or is restricted | Ask the user to change the bank card                                    |
| 1001      | Return                                      | Refunded – you may re-initiate within 24 hours after receiving callback |
| 1002      | Channel server fluctuations                 | Retry after 10 minutes                                                  |
| 9999      | Others                                      | Cancel the order                                                        |


### Callback Response

| Parameter | Type   | Required | Length | Description                            |
| --------- | ------ | -------- | ------ | -------------------------------------- |
| SUCCESS   | String | yes      |        | Must return `"SUCCESS"` to avoid retry |


```json title= Sample Response
SUCCESS
```
