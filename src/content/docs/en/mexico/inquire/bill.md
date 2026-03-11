---
title: Order List
description: Order List
---

### Request URL

| method | url                            |
|--------|--------------------------------|
| POST   | /api/pay/transaction/queryList |

### Header Information

| header parameter | description |
|----------------|-------------|
| timestamp | Request timestamp |
| nonce | Random value |
| country | MX |
| app_code | App code |

### Notes

1. Provides real-time transaction query for the past 90 days. Pull efficiency: A single query takes a natural month (e.g., 00:00:00 on the 1st to 23:59:59 on the 31st) as the interval.
2. Status coverage logic: For payout business, some country systems may have the possibility of "success first then refund". When processing the data returned by queryList, merchants should treat status == 4 (refund) as the order funds have been reversed. Do not treat it as a new order, but associate it with the original business order for status reconciliation.

### Request Parameters

| Field        | Type      | Required | Length | Description                                                                |
|-------------|---------|---------|--------|---------------------------------------------------------------------------|
| pageIndex | String  | no      |        | Cursor: No need to pass for the first page request; must be passed for non-first pages to locate the pagination start position.                              |
| pageSize  | Integer | no      |        | Query quantity: Default 500, maximum 1000.                                             |
| type      | String  | yes     |        | Business type: PAYIN, PAYOUT, only one type can be queried at a time                                     |
| status    | Integer | no      |        | Status: 1: Processing  2: Success  3: Failed 4: Refund                                     |
| beginTime | String  | yes     |        | Start time: Format: yyyy-MM-dd HH:mm:ss.SSS. Constraint: No earlier than 90 days before the current date, no later than the current time      |
| endTime   | String  | yes     |        | End time: Format: yyyy-MM-dd HH:mm:ss.SSS. Constraint: endTime - beginTime ≤ 31 days |
| sign      | String  | yes     |        | Signature                                                                |

```json title=Request Example
{
  "pageIndex": "",
  "pageSize": 500,
  "type": "PAYIN",
  "status": "1",
  "beginTime": "2026-03-01 00:00:00.000",
  "endTime": "2026-03-01 23:59:59.999",
  "sign": "YOUR_SIGN"
}
```

```json title=Cursor Request Example
{
  "pageIndex": "KgntH8WpwV0lKKYXQr8MY1EgdicDUz/V4l8nCk4QRty3",
  "pageSize": 500,
  "type": "PAYIN",
  "status": "1",
  "beginTime": "2026-03-01 00:00:00.000",
  "endTime": "2026-03-01 23:59:59.999",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter                  | Type     | Required | Length | Description                                  |
|---------------------------|--------|---------|--------|---------------------------------------------|
| pageIndex           | String | yes     |        | Cursor                                  |
| records             | List   | yes     |        |                                     |
| — type              | String | yes     |        | type: PAYIN  PAYOUT         |
| — merchantOrderNo   | String | yes     |        | Merchant order number                                |
| — tradeNo           | String | yes     |        | Platform order number                                |
| — amount            | String | yes     |        | Original order amount                              |
| — transactionAmount | String | yes     |        | Actual transaction amount (excluding fees). 0.00 for failed transactions            |
| — serviceAmount     | String | yes     |        | Total service fee (fixed fee + percentage fee)                   |
| — status            | String | yes     |        | Status: 1-Processing, 2-Success, 3-Failed, 4-Refund         |
| — settleStatus      | String | yes     |        | Settlement status: 0-Unsettled, 1-Settled                     |
| — createTime        | String | yes     |        | Creation time — Current country time zone yyyy-MM-dd HH:mm:ss format |
| — completeTime      | String | yes     |        | Completion time — Current country time zone yyyy-MM-dd HH:mm:ss format  |
| — settleTime        | String | yes     |        | Settlement time — Current country time zone yyyy-MM-dd HH:mm:ss format |
| — failReason        | String | yes     |        | Error reason                                |

```json title=Response Example
{
  "code": 200,
  "data": {
    "pageIndex": "KgntH8WpwV0lKKYXQr8MY1EgdicDUz/V4l8nCk4QRty3",
    "records": [
      {
        "type": "PAYIN",
        "merchantOrderNo": "2C2741241kCApltr2IATMy0c9900440",
        "tradeNo": "TS24052200000491357178416",
        "amount": "5000.00",
        "transactionAmount": "5000.00",
        "serviceAmount": "26.00",
        "status": 2,
        "settleStatus": null,
        "failReason": null,
        "createTime": "2026-02-27 03:00:47",
        "completeTime": "2026-02-27 03:01:08",
        "settleTime": null
      }
    ]
  },
  "msg": "success",
  "traceId": "70fc57471a9143e3b7806d473cf33958.90.17727811039671545"
}
```

### Error Codes

| Error Code | Error Message                                                                                                   | Handling Solution                                      |
|-----------|--------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| 500 | Business Error                                                                                         | Please contact us                                     |
| 600 | type field invalid parameter value                                                                     | Invalid parameter value for type field                              |
| 601 | Data older than 90 days cannot be queried via API. Please use the portal to export historical reports. | Data older than 90 days cannot be queried via API (Please check beginTime field) |
| 602 | Query range exceeds 31 days. Please query data month by month.                                         | Query range exceeds 31 days                                 |
| 603 | The time cannot be later than the current time.                                                        | Time cannot be later than current time      (Please check beginTime field)          |
| 604 | The start time of the application period cannot be later than the end time.                            | The start time of the application period cannot be later than the end time.                        |
| 605 | status field invalid parameter value                                                                   | Invalid parameter value for status field                            |
| 606 | PageIndex parsing failed                                                                               | Cursor pagination parsing failed                                  |

```json title=Error Response Example
{
    "code": 416,
    "data": null,
    "msg": "Application not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```