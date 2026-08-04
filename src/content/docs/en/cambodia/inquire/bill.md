---
title: Order List
description: Order List
---

### Request URL

| method | url                            |
|--------|--------------------------------|
| POST   | /api/pay/transaction/queryList |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| app_code         | Application ID    |

### Notes

1. Provides real-time transaction queries for the past 180 days. Each query should cover no more than one calendar month.
2. Some payout systems may return a refund after an earlier success. When `queryList` returns `status == 4` (refund), treat the funds as reversed and reconcile the record against the original order instead of processing it as a new order.

### Request Parameters

| Field     | Type    | Required | Length | Description                                                                    |
|-----------|---------|----------|--------|--------------------------------------------------------------------------------|
| pageIndex | String  | no       |        | Cursor; omit on the first page and include it on subsequent pages              |
| pageSize  | Integer | no       |        | Number of records; default 500, maximum 1000                                    |
| type      | String  | yes      |        | Business type: PAYIN or PAYOUT; query one type at a time                        |
| status    | Integer | no       |        | Status: 1-Processing, 2-Success, 3-Failed, 4-Refund, 5-Partial refund           |
| beginTime | String  | yes      |        | Start time in `yyyy-MM-dd HH:mm:ss.SSS`; within the past 90 days                |
| endTime   | String  | yes      |        | End time in `yyyy-MM-dd HH:mm:ss.SSS`; the query range must not exceed 31 days  |
| sign      | String  | yes      |        | Signature                                                                      |

```json title="Request Example"
{
  "pageIndex": "",
  "pageSize": 500,
  "type": "PAYIN",
  "status": 2,
  "beginTime": "2026-03-01 00:00:00.000",
  "endTime": "2026-03-01 23:59:59.999",
  "sign": "YOUR_SIGN"
}
```

```json title="Cursor Request Example"
{
  "pageIndex": "KgntH8WpwV0lKKYXQr8MY1EgdicDUz/V4l8nCk4QRty3",
  "pageSize": 500,
  "type": "PAYIN",
  "status": 2,
  "beginTime": "2026-03-01 00:00:00.000",
  "endTime": "2026-03-01 23:59:59.999",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field                      | Type   | Required | Length | Description                                                              |
|----------------------------|--------|----------|--------|--------------------------------------------------------------------------|
| pageIndex                  | String | yes      |        | Cursor                                                                   |
| records                    | List   | yes      |        | Order records                                                            |
| - type                     | String | yes      |        | Business type: PAYIN or PAYOUT                                           |
| - merchantOrderNo          | String | yes      |        | Merchant order number                                                    |
| - tradeNo                  | String | yes      |        | Platform order number                                                    |
| - amount                   | String | yes      |        | Original order amount                                                    |
| - transactionAmount       | String | yes      |        | Actual transaction amount before fees; `0.00` for failed transactions    |
| - serviceAmount           | String | yes      |        | Total service fee: fixed fee + percentage fee                            |
| - status                  | String | yes      |        | Status: 1-Processing, 2-Success, 3-Failed, 4-Refund, 5-Partial refund    |
| - settleStatus            | String | yes      |        | Settlement status: 0-Unsettled, 1-Settled                                |
| - createTime              | String | yes      |        | Creation time in local timezone, format: yyyy-MM-dd HH:mm:ss              |
| - completeTime            | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss            |
| - settleTime              | String | yes      |        | Settlement time in local timezone, format: yyyy-MM-dd HH:mm:ss            |
| - failReason              | String | yes      |        | Failure reason                                                           |
| - paymentList             | List   | yes      |        | PAYIN only; empty or omitted when `type=PAYOUT`                            |
| • paymentSingleOrderNo    | String | yes      |        | Single payment notification transaction number                           |
| • paymentStatementAmount  | String | yes      |        | Amount received in the individual transaction                            |
| • settleTime              | String | yes      |        | Settlement time for the individual transaction                           |
| • settleStatus            | String | yes      |        | Settlement status: 0-Unsettled, 1-Settled                                |
| • completeTime            | String | yes      |        | Completion time for the individual transaction                           |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "records": [
      {
        "type": "PAYIN",
        "merchantOrderNo": "OrderNoExample",
        "tradeNo": "TS2501010001KH0000000000000000",
        "amount": "10000.00",
        "transactionAmount": "10000.00",
        "serviceAmount": "105.00",
        "status": 2,
        "settleStatus": 0,
        "failReason": null,
        "createTime": "2026-03-01 03:00:47",
        "completeTime": "2026-03-01 03:01:08",
        "settleTime": null,
        "paymentList": [
          {
            "paymentSingleOrderNo": "TSOPaymentOrderNoExample",
            "paymentStatementAmount": "10000.00",
            "settleStatus": 0,
            "settleTime": null,
            "completeTime": "2026-03-01 03:01:08"
          }
        ]
      }
    ],
    "pageIndex": "HniK3YZucTudM/kfEpQCLtFVnFaBlcv1K0MG+phCUd2EfYIt"
  },
  "msg": "success",
  "traceId": "8da08d717dbf46a5becdb3776f67640c.113.17773658218864081"
}
```

### Error Codes

| Error Code | Error Message                                                                                           | Handling Solution                                  |
|------------|---------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| 500        | Business Error                                                                                          | Please contact us                                  |
| 600        | type field invalid parameter value                                                                      | Check the `type` field                             |
| 601        | Data older than 90 days cannot be queried via API. Please use the portal to export historical reports.  | Check `beginTime` or export from the portal        |
| 602        | Query range exceeds 31 days. Please query data month by month.                                          | Reduce the query range to 31 days or less          |
| 603        | The time cannot be later than the current time.                                                         | Check `beginTime`                                  |
| 604        | The start time of the application period cannot be later than the end time.                             | Ensure the start time is not later than the end    |
| 605        | status field invalid parameter value                                                                    | Check the `status` field                           |
| 606        | PageIndex parsing failed                                                                                | Check the pagination cursor                        |

```json title="Error Response Example"
{
  "code": 416,
  "data": null,
  "msg": "Application not found",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
