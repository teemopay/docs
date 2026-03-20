---
title: Suspense Order List
---

### Request URL

| method | url                                  |
|--------|--------------------------------------|
| POST   | /api/pay/payment/queryAccountInfo/v1 |

### Header Information

| header parameter | description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | AR                |
| app_code         | App code          |

### Notes

Specifically for the AR (Argentina) market, querying unprocessed suspense transactions within 30 days for merchants.

### Request Parameters

| Field     | Type    | Required | Length | Description                                                                                                                     |
|-----------|---------|----------|--------|---------------------------------------------------------------------------------------------------------------------------------|
| pageIndex | String  | no       |        | Cursor: No need to pass for the first page request; must be passed for non-first pages to locate the pagination start position. |
| pageSize  | Integer | no       |        | Query quantity: Default 500, maximum 1000.                                                                                      |
| beginTime | String  | yes      |        | Start time: Format: yyyy-MM-dd HH:mm:ss. Constraint: No earlier than 30 days before the current date.                           |
| endTime   | String  | yes      |        | End time: Format: yyyy-MM-dd HH:mm:ss. Constraint: endTime - beginTime ≤ 31 days                                                |
| sign      | String  | yes      |        | Signature                                                                                                                       |

```json title=Request Example
{
  "pageIndex": "",
  "beginTime": "2026-03-10 00:00:00",
  "endTime": "2026-03-17 23:59:59",
  "pageSize": 1,
  "sign": "SIGN_STR_XXXX"
}
```

### Response Parameters

| Parameter              | Type   | Required | Length | Description                                     |
|------------------------|--------|----------|--------|-------------------------------------------------|
| pageIndex              | String | yes      |        | Cursor                                          |
| records                | List   | yes      |        | Suspense transaction information                |
| — suspenseBankId       | String | yes      |        | Single transaction voucher id (bankid)          |
| — suspenseAmount       | String | yes      |        | Single credit amount                            |
| — suspenseIdCardNumber | String | yes      |        | Actual payer identity information (CUIT or DNI) |
| — suspenseRealName     | String | yes      |        | Actual payer name                               |
| — suspenseCallbackTime | String | yes      |        | Transaction credit time                         |
| — cvu                  | String | yes      |        | Credit CVU account                              |

```json title=Response Example
{
  "code": 200,
  "data": {
    "records": [
      {
        "suspenseBankId": "86VRPQ2GM4KDKQ1G2GLY0M",
        "suspenseAmount": "400.00",
        "suspenseIdCardNumber": "000000000",
        "suspenseRealName": "Teemopay",
        "suspenseCallbackTime": "2026-03-16 23:17:19",
        "cvu": "0000111100000015127521"
      }
    ],
    "pageIndex": "hRCyv/Q0jH/igldiVBxgUelKl3QGc/d/ZXcskEATHQ=="
  },
  "msg": "success",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.95.17739933448283365"
}
```

### Error Codes

| Error Code | Error Message                                                                                          | Handling Solution                            |
|------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------|
| 602        | Query range exceeds 31 days. Please query data month by month.                                         | endTime - beginTime > 31 days                |
| 603        | The time cannot be later than the current time                                                         | Start time cannot be later than current time |
| 604        | The start time of the application period cannot be later than the end time.                            | Start time cannot be later than end time     |
| 607        | Data older than 30 days cannot be queried via API. Please use the portal to export historical reports. | Data older than 30 days cannot be queried    |
| 500        | Business Error                                                                                         | Business exception (Please contact us)       |
| Non-200    | Other exceptions                                                                                       | Please contact us                            |

```json title=Error Response Example
{
  "code": 602,
  "data": null,
  "msg": "Query range exceeds 31 days. Please query data month by month.",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.98.17739944725617763"
}
```