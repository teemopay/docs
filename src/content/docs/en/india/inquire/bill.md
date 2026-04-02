---
title: Order List
description: Order List
---

## Request

| Method | URL |
|--------|-----|
| POST | `/api/pay/transaction/queryList` |

## Request Headers

| Header | Description |
|--------|-------------|
| timestamp | Request timestamp |
| nonce | Random value |
| country | IN |
| app_code | Application code |

## Notes

1. Provides real-time transaction queries for the past 90 days. For efficiency, query in intervals of one calendar month (e.g., from the 1st at 00:00:00 to the last day at 23:59:59).
2. **Status update logic for payouts:** In some countries, a transaction may succeed and then be refunded. When processing `queryList` results, if `status == 4` (Refund), treat it as a reversal on the original order — do not process it as a new order.

## Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| pageIndex | String | No | Cursor: omit on the first request; required on subsequent pages to mark the pagination start position |
| pageSize | Integer | No | Number of records per page. Default: 500, Max: 1000 |
| type | String | Yes | Business type: `PAYIN` or `PAYOUT` (only one type per query) |
| status | Integer | No | Status: `1` Processing, `2` Success, `3` Failed, `4` Refund |
| beginTime | String | Yes | Start time — format: `yyyy-MM-dd HH:mm:ss.SSS`. Must not be earlier than 90 days ago or later than the current time |
| endTime | String | Yes | End time — format: `yyyy-MM-dd HH:mm:ss.SSS`. Difference between `endTime` and `beginTime` must be ≤ 31 days |
| sign | String | Yes | Signature |

**Request Example**
```json
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

**Cursor-based Request Example**
```json
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

## Response Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| pageIndex | String | Yes | Cursor for next page |
| records | List | Yes | Transaction records |
| — type | String | Yes | Business type: `PAYIN` (Collection), `PAYOUT` (Disbursement) |
| — merchantOrderNo | String | Yes | Merchant order number |
| — tradeNo | String | Yes | Platform order number |
| — amount | String | Yes | Original order amount |
| — transactionAmount | String | Yes | Actual credited amount (before fee deduction). Returns `0.00` on failure |
| — serviceAmount | String | Yes | Total service fee (fixed fee + percentage fee) |
| — status | String | Yes | Status: `1` Processing, `2` Success, `3` Failed, `4` Refund |
| — settleStatus | String | Yes | Settlement status: `0` Unsettled, `1` Settled |
| — createTime | String | Yes | Creation time — local timezone, format: `yyyy-MM-dd HH:mm:ss` |
| — completeTime | String | Yes | Completion time — local timezone, format: `yyyy-MM-dd HH:mm:ss` |
| — settleTime | String | Yes | Settlement time — local timezone, format: `yyyy-MM-dd HH:mm:ss` |
| — failReason | String | Yes | Failure reason |

**Response Example**
```json
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

## Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| 500 | Business Error | Contact us |
| 600 | type field invalid parameter value | Invalid value for `type` field |
| 601 | Data older than 90 days cannot be queried via API. Please use the portal to export historical reports. | Data beyond 90 days is not accessible via API (check `beginTime` field) |
| 602 | Query range exceeds 31 days. Please query data month by month. | Query range exceeds 31 days |
| 603 | The time cannot be later than the current time. | Time cannot be later than now (check `beginTime` field) |
| 604 | The start time of the application period cannot be later than the end time. | Start time must not be later than end time |
| 605 | status field invalid parameter value | Invalid value for `status` field |
| 606 | PageIndex parsing failed | Cursor pagination parsing failed |

**Error Response Example**
```json
{
    "code": 416,
    "data": null,
    "msg": "Application not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
