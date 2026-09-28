---
title: Create Payin Order
description: Merchant requests to create a payment order
---

### Request URL

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### Headers

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (VN) |
| appCode         | Application ID    |

## Supported Payment Types (paymentType)

| Payment Method Name | PaymentType |
|---|---:|
| QR | 2101 |
| VA | 2102 |
| Wallet | 2103 |


### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                                                  |
|-----------------|--------|----------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                                                                                                        |
| paymentType     | Int    | yes      |        | Payment type, see the [payment type list](#supported-payment-types-paymenttype) |
| amount          | String | yes      | 20     | Payin amount in VND, integer only |
| realName        | String | yes      | 64     | Payer name |
| email           | String | yes      | 50     | Payer email (must match a valid regex format) |
| phone           | String | yes      | 50     | Phone number: 10 digits starting with 0 |
| bankCode        | String | no       | 50     | Bank code; see the [Bank List](./bank). Required when `paymentType` is 2102 (VA) |
| sign            | String | yes      |        | Signature                                                                                                                                                                                    |
| callbackUrl     | String | no       | 200    | Callback URL                                                                                                                                                                                 |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "TeemoPay",
  "amount": "30000",
  "callbackUrl": "https://www.callbackexample.com",
  "paymentType": 2101,
  "email": "TeemoPay@example.com",
  "phone": "0900000000",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters 

| Field           | Type       | Required | Length | Description                                          |
|-----------------|------------|----------|--------|------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                |
| tradeNo         | String     | yes      |        | Platform order number                                |
| amount          | String     | yes      |        | Transaction amount                                   |
| paymentType     | Int        | yes      |        | Payment type                                         |
| paymentInfo     | String     | yes      |        | Payment link returned by the upstream channel       |
| additionalInfo  | JSONObject | no       |        | Additional information, including original QR code |
| status          | Int        | yes      |        | Payin status: 1 = Paying, 3 = Failed                |
| errorMsg        | String     | no       |        | Error message (returned only in case of failure)     |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": "30000",
    "tradeNo": "TS2501010001VN0000000000000000",
    "paymentType": 2101,
    "paymentInfo": "https://mock/payment/",
    "additionalInfo": {},
    "status": 1,
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833191761712117"
}
```
