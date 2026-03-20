---
title: bankId Query Suspense Order
---

### Request URL

| method | url                                          |
|--------|----------------------------------------------|
| POST   | /api/pay/payment/query/suspense/orderInfo/v1 |

### Header Information

| header parameter | description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | AR                |
| app_code         | App code          |

### Request Parameters

| Field  | Type   | Required | Length | Description                                     |
|--------|--------|----------|--------|-------------------------------------------------|
| bankId | String | yes      | 32     | Voucher id: bankId for Argentina, utr for India |
| sign   | String | yes      |        | Signature                                       |

```json title=Request Example
{
  "bankId": "WY7ZEPN6MPRZZGJO2Q0M51",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter            | Type    | Required | Length | Description                                     |
|----------------------|---------|----------|--------|-------------------------------------------------|
| suspenseAmount       | String  | yes      |        | Single credit amount                            |
| suspenseStatus       | Integer | yes      |        | 0: (Unclaimed) 1: (Claimed)                     |
| suspenseIdCardNumber | String  | yes      |        | Actual payer identity information (CUIT or DNI) |
| suspenseRealName     | String  | yes      |        | Actual payer name                               |
| suspenseCallbackTime | String  | yes      |        | Transaction credit time                         |

```json title=Response Example
{
  "code": 200,
  "msg": "success",
  "data": {
    "suspenseAmount": "1000.00",
    "suspenseStatus": 0,
    "suspenseIdCardNumber": "27382938192",
    "suspenseRealName": "CARLOS ALVAREZ",
    "suspenseCallbackTime": "2026-03-16 05:02:23"
  },
  "traceId": "0b12131dd4951a36d19022a31b303.11.1742356800"
}
```

### Error Codes

| Error Code | Error Message                   | Handling Solution                                     |
|------------|---------------------------------|-------------------------------------------------------|
| 401        | INVALID_PARAMS                  | bankId length cannot exceed 32 characters             |
| 700        | BANK_ID_ALREADY_CLAIMED_SUCCESS | bankId has already been claimed                       |
| 701        | BANK_ID_NOT_EXIST               | The transmitted bankId does not exist                 |
| 702        | SUSPENSE_ACCOUNT_STATUS_ERROR   | Suspense account status exception (Please contact us) |
| 703        | ORDER_NOT_RECEIVED_YET          | Order has not been credited                           |
| 500        | Business Error                  | Business exception (Please contact us)                |
| Non-200    | Other exceptions                | Please contact us                                     |

```json title=Error Response Example
{
  "code": 701,
  "data": null,
  "msg": "BANK_ID_NOT_EXIST",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.95.17739950014371593"
}
```