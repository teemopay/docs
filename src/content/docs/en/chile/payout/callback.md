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
| country        | Country code (CL) |
| appCode        | Application ID    |

### Callback Parameters

| Parameter       | Type   | Required | Length | Description                                                                                |
| -------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------------ |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                      |
| tradeNo        | String | yes      |        | Platform order number                                                                      |
| amount         | String | yes      |        | Transaction amount                                                                         |
| serviceAmount  | String | yes      |        | Service fee e.g.: 18.02                                                                    |
| status         | String | Int      |        | 2-Payout Success 3-Payout Failed 4-Refunded                                               |
| errorCode      | number | yes      |        | Order failure status error code                                                           |
| errorMessage   | String | yes      |        | Order failure error message: 1000-Card error or limit 1001-Refunded 1002-Channel fluctuation 9999-Others |
| completeTime    | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss |
| sign           | String | yes      |        | Signature                                                                                 |

```json title="Callback Example"
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001CL0000000000000000",
  "status": 2,
  "amount":"1000.00",
  "serviceAmount":"60.00",
   "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"
}
```

> Error Code Description:

| errorCode | errorMessage                                                                                                                                  | Suggestion                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1000      | The account does not exist or is restricted                                                                                                   | Suggest the user change the card                                                                                            |
| 1001      | Return                                                                                                                                        | Already refunded. After receiving the callback, you may retry the disbursement within 24 hours of the original request time |
| 1002      | Channel server fluctuations                                                                                                                   | Channel fluctuation. Suggest retrying after 10 minutes                                                                      |
| 1018      | Invalid account number (may be due to mismatch with ID number, presence of special characters, or incorrect length), kindly verify and retry. | Invalid account (may be due to mismatch with ID, special characters, or incorrect length)                                   |
| 1019      | Invalid RUT, kindly verify and retry.                                                                                                         | Invalid RUT                                                                                                                 |
| 1020      | Unsupported bank. Please select a different bank and try again.                                                                               | Unsupported bank                                                                                                            |
| 1021      | Invalid document ID (may be due to incorrect length, format, or mismatch with user's information), kindly verify and retry.                   | Invalid ID (may be due to incorrect length, format, or mismatch with user's information)                                    |
| 1022      | Account number does not match the account type, kindly verify and retry.                                                                      | Account number does not match account type                                                                                  |
| 9999      | Others                                                                                                                                        | Others. Suggest cancelling the order                                                                                        |

### Callback Response

| Parameter | Type   | Required | Length | Description                                                          |
| --------- | ------ | -------- | ------ | -------------------------------------------------------------------- |
| SUCCESS   | String | yes      |        | Must return "SUCCESS" otherwise callback will be repeated            |

```json title="Response Example"
SUCCESS
```
