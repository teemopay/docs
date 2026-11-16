---
title: Payout Query
description: Query a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

## Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (ID)  |
| appCode         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign            | String | yes      | -      | Signature             |


### Response Parameters

| Field | Type | Required | Length | Description |
| ----- | ---- | -------- | ------ | ----------- |
| status | Int | yes | | `0` Init (equivalent to pending, non-final status. The order creation request has been received and is awaiting risk review and approval)<br>`1` Pending (pending, non-final status. The order has entered the payout processing flow)<br>`2` Successful (success, final status. The payout has been completed)<br>`3` Failed (failed, final status. Order creation validation or preliminary approval failed. The payout can be re-initiated as needed)<br>`4` Refunded (refunded, final status. The order has been fully refunded) |
| voucherUrl | String | yes | | Voucher address |

```json title = ""
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001ID0000000000000000",
    "additionalInfo": {

    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "684180093000000000",
    "paymentType": 1,
    "status": 1
  }
}
```