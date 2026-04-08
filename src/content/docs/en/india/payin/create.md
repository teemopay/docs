---
title: Create Payment
description: Merchant requests to create a payment order
---

## Request URL
| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

## Request Headers
| Header Parameter | Description        |
|------------------|--------------------|
| timestamp        | Request timestamp  |
| nonce            | Random value       |
| country          | IN                 |
| app_code         | App code           |

## Payment Type List
| Payment Method Name | PaymentType (Request Parameter) |
|---------------------|----------------------------------|
| Aggregated Page     | 1001                             |
| QR                  | 1002                             |
| PHONEPE             | 1003                             |
| PAYTM               | 1004                             |

## Expiration Time
Default expiration time: 10 minutes

## Request Parameters
| Field             | Type    | Required | Max Length | Description                                                                                     |
|-------------------|---------|----------|------------|-------------------------------------------------------------------------------------------------|
| merchantOrderNo   | String  | yes      | 32         | Merchant order number                                                                           |
| paymentType       | Integer | yes      | -          | Payment method: 1001(Aggregated Page), 1002(QR), 1003(PHONEPE), 1004(PAYTM)                      |
| realName          | String  | yes      | 64         | User real name (UPPERCASE recommended)                                                          |
| email             | String  | yes      | 50         | User email (valid regex format required)                                                        |
| amount            | String  | yes      | 20         | Collection amount (integer recommended, currency: INR)                                          |
| phone             | String  | yes      | 20         | User mobile number (10 digits, starting with 6,7,8,9)                                            |
| callbackUrl       | String  | no       | 200        | Collection callback URL. If not provided, use the backend configured URL                        |
| sign              | String  | yes      | -          | Signature                                                                                       |

```json title="Request Example"
{
  "realName": "TeemoPay",
  "amount": "1000",
  "phone": "6234567890",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "OrderNoExample",
  "email": "TeemoPay@example.com",
  "paymentType": 1001,
  "sign": "YOUR_SIGN"
}
```

## Response Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| merchantOrderNo | String | Yes | 32 | Merchant order number |
| tradeNo | String | Yes | 32 | Platform order number |
| amount | String | Yes | 32 | Transaction amount |
| paymentType | Int | Yes | 10 | Payment method: `1001` (Aggregated Page), `1002` (QR), `1003` (PHONEPE), `1004` (PAYTM) |
| paymentInfo | String | Yes | 32 | Primary payment information — e.g., payment code or QR string |
| additionalInfo | JSONObject | No | — | Supplementary payment information |
| status | Int | Yes | — | Order status: `1` Processing, `3` Failed |
| errorMsg | String | No | — | Error message (returned on failure) |

**Response Example**

#### paymentType 1001 Response

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518954661212",
        "paymentType": 1001,
        "paymentInfo": "https://cashier.deviukpay.com/checkoutV3?orderId=PI202604081245327E6D587A9350619B&sign=FC4BF498CFF2D13AD06B4937FC8B0FA5",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.98.17756325326182591"
}
```

#### paymentType 1002 Response

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518955279892",
        "paymentType": 1002,
        "paymentInfo": "https://cashier.deviukpay.com/checkoutV3?orderId=PI202604081246507CBDA2C4CDB913B4&sign=04AF43E5CDCA07AE97C0F58A451F422B",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.96.17756326099664863"
}
```

#### paymentType 1003 Response

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518955487076",
        "paymentType": 1003,
        "paymentInfo": "phonepe://native?data=eyJjb250YWN0Ijp7ImNic05hbWUiOiIiLCJuaWNrTmFtZSI6IiIsInZwYSI6InRpd2FyaWJoYXJhdDc4OUBmcmVlY2hhcmdlIiwidHlwZSI6IlZQQSJ9LCJwMnBQYXltZW50Q2hlY2tvdXRQYXJhbXMiOnsibm90ZSI6IkRvIG5vdCBtb2RpZnkgdGhlIGFtb3VudCIsImlzQnlEZWZhdWx0S25vd25Db250YWN0Ijp0cnVlLCJlbmFibGVTcGVlY2hUb1RleHQiOmZhbHNlLCJhbGxvd0Ftb3VudEVkaXQiOmZhbHNlLCJzaG93UXJDb2RlT3B0aW9uIjpmYWxzZSwiZGlzYWJsZVZpZXdIaXN0b3J5Ijp0cnVlLCJzaG91bGRTaG93VW5zYXZlZENvbnRhY3RCYW5uZXIiOmZhbHNlLCJpc1JlY3VycmluZyI6ZmFsc2UsImNoZWNrb3V0VHlwZSI6IkRFRkFVTFQiLCJ0cmFuc2FjdGlvbkNvbnRleHQiOiJwMnAiLCJpbml0aWFsQW1vdW50Ijo5OTg2NC4wMCwiZGlzYWJsZU5vdGVzRWRpdCI6dHJ1ZSwic2hvd0tleWJvYXJkIjp0cnVlLCJjdXJyZW5jeSI6IklOUiIsInNob3VsZFNob3dNYXNrZWROdW1iZXIiOnRydWV9fQ==&id=p2ppayment",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.96.17756326358654891"
}
```

#### paymentType 1004 Response

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518955617780",
        "paymentType": 1004,
        "paymentInfo": "paytmmp://cash_wallet?pa=tiwaribharat789@freecharge&pn=ashish&tr=000011&tn=00001&am=998.51&cu=INR&featuretype=money_transfer",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.95.17756326522018217"
}
```

## Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| 412 | Please try again later | Retry later |
| 414 | * | Correct the corresponding parameter |
| 423 | This payment method is not supported | Payment method not supported; check the docs or contact us to enable it |
| 426 | merchant order duplicate | Change the merchant order number |
| 427 | The callback notification address for collection must not be empty. | Configure a collection callback URL |
| 443 | ID number must not be null | ID number cannot be empty |
| 466 | Payment method fee rate not configured. | Collection fee rate not configured; contact us |
| 473 | Merchant joint verification error: * | Merchant configuration error; contact us |
| 474 | The id card number must be 11 digits. | ID number must be 11 digits |
| 500 | Business Error | Contact us |

**Error Response Example**
```json
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```

## Channel Error Messages

| errorMsg | Description |
|----------|-------------|
| Transaction amount exceeds limit, kindly retry within allowed range. | Requested amount is out of range |
| Channel request error, technicians will fix ASAP. | Channel under maintenance |
| Unstable network, kindly retry later. | Channel network instability |
| Parameter validation error, kindly verify and retry. | Invalid parameter submitted |

**Channel Error Response Example**
```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": null,
    "tradeNo": "TS2405220001AR0000430564883184",
    "paymentType": 1001,
    "paymentInfo": null,
    "additionalInfo": null,
    "status": 3,
    "errorMsg": "Transaction amount exceeds limit, kindly retry within allowed range."
  },
  "msg": "success",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```
