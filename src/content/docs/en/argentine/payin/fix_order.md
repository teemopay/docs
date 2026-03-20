---
title: Fix Order 
---

### Request URL

| method | url                          |
|--------|------------------------------|
| POST   | /api/pay/payment/fixOrder/v1 |

### Header Information

| header parameter | description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | AR                |
| app_code         | App code          |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                      |
|-----------------|--------|----------|--------|----------------------------------------------------------------------------------|
| bankId          | String | yes      | 64     | User payment bank order number, voucher id: bankid for Argentina, utr for India. |
| merchantOrderNo | String | yes      |        | Merchant order number                                                            |
| sign            | String | yes      |        | Signature                                                                        |

```json title=Request Example
{
  "bankId": "pvbankid104",
  "merchantOrderNo": "cvu_test_204",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter    | Type   | Required | Length | Description                               |
|--------------|--------|----------|--------|-------------------------------------------|
| amount       | Number | yes      |        | Amount credited                           |
| tradeNo      | String | yes      |        | Platform order number                     |
| bankId       | String | yes      |        | Voucher id                                |
| merchantOrderNo   | String | yes      |        | Merchant order number                     |
| callbackTime | String | yes      |        | Transaction creation time                 |
| status       | String | yes      |        | Claim status  0: (Unclaimed) 1: (Claimed) |

```json title=Response Example
{
  "code": 200,
  "data": {
    "amount": "5.00",
    "tradeNo": "TS2405220001AR0000505867138310",
    "bankId": "xiashjadyuqwgbeqwe——1638",
    "merchantOrderNo": "cvu_test_212",
    "callbackTime": "2026-03-20 05:50:24",
    "status": 1
  },
  "msg": "success",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.95.17739966234947325"
}
```

### Error Codes

| Error Code | Error Message                   | Handling Solution                                     |
|------------|---------------------------------|-------------------------------------------------------|
| 401        | INVALID_PARAMS                  | bankId length cannot exceed 64 characters             |
| 700        | BANK_ID_ALREADY_CLAIMED_SUCCESS | bankId has already been claimed                       |
| 701        | BANK_ID_NOT_EXIST               | The transmitted bankId does not exist                 |
| 702        | SUSPENSE_ACCOUNT_STATUS_ERROR   | Suspense account status exception (Please contact us) |
| 703        | ORDER_NOT_RECEIVED_YET          | Order has not been credited                           |
| 704        | MERCHANT_ORDER_NO_NOT_EXIST     | Merchant order number does not exist                  |
| 705        | MERCHANT_NO_ALREADY_BOUND       | Merchant order has already been bound                 |
| 706        | BANK_ID_AMOUNT_NOT_MATCH_ORDER  | Suspense amount does not match order amount           |
| 500        | Business Error                  | Business exception (Please contact us)                |
| Non-200    | Other exceptions                | Please contact us                                     |

```json title=Error Response Example
{
  "code": 706,
  "data": null,
  "msg": "BANK_ID_AMOUNT_NOT_MATCH_ORDER",
  "traceId": "0b12131dd4951a36d19022a31b303.11.1742356800"
}
```