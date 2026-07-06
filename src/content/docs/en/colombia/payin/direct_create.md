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
| country          | Country code (CO) |
| app_code         | Application ID    |

## Supported Payment Types (paymentType)

| Payment Method Name  | PaymentType |
|----------------------|-------------|
| PSE                  | 201         |
| WALLET（NEQUI_PSE）   | 202         |
| CHECKOUT             | 204         |
| EFECTY               | 205         |
| TRANSFIYA            | 209         |
| MOVII (MOVIL_PSE)    | 210         |
| DALE (DALE_PSE)      | 211         |
| BREB_KEY             | 212         |
| NEQUI_PUSH           | 213         |
| BREB_QR              | 214         |


## 场景

What is Bre-B?
Bre-B is Colombia's next-generation interoperable real-time payment system. The process involves the user copying a
unique payment key generated on the checkout page and pasting it into their banking app to complete the transfer.

Important Considerations:
Manual Input: Since users manually enter the payment amount within their banking app, the actual amount paid may differ
from the initial order amount.
Reconciliation: The system will send a callback notification based on the actual funds received. It is essential to use
the final amount provided in the callback for reconciliation purposes.

Official Simulator (Generating your own Bre-B Key): You can access the official simulator to understand how to register
and generate keys here: 👉 https://www.banrep.gov.co/es/bre-b/simuladores-curso#registro

### Request Parameters ([See specific payment method examples here](./request_response))

| Field           | Type   | Required | Length | Description                                                                                                                                                                                  |
|-----------------|--------|----------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                                                                                                        |
| paymentType     | Int    | yes      |        | Payment types, see list above                                                                                                                                                                |
| amount          | String | yes      | 20     | Payin amount, integer only, in COP                                                                                                                                                           |
| expirationTime  | Long   | no       |        | Expiration timestamp                                                                                                                                                                         |
| realName        | String | yes      | 64     | User's full name                                                                                                                                                                             |
| email           | String | yes      | 50     | User's email (must match a valid regex format)                                                                                                                                               |
| phone           | String | yes      | 50     | Phone number, 10 digits, no country code     【When the payment method are 202、213, this mobile phone number must be the user's wallet account.】                                              |
| idCardNumber    | String | No       | 50     | ID Number: CC (10 digits), CE (6-10 digits), NIT (9 digits). <br/> Mandatory when the paymentType is 201 (PSE) or 202 (WALLET).                                                              |
| idType          | String | No       | 32     | Id Type: CC (6-10 digits; ID Card), CE (6-10 digits), NIT (9 digits; Tax Identification Number), PA (9 digits; Passport). <br/> Mandatory when the paymentType is 201 (PSE) or 202 (WALLET). |
| bankCode        | String | No       | 50     | Bank Code. <br/> Mandatory when the paymentType is 201 (PSE).<br> Bank List for Reference in Creating Payout-on-Behalf Services                                                              |
| sign            | String | yes      |        | Signature                                                                                                                                                                                    |
| callbackUrl     | String | no       | 200    | Callback URL                                                                                                                                                                                 |

```json title="Request Example"
{
  "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000040",
  "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
  "amount": "30000.00",
  "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
  "paymentType": 201,
  "email": "12123123@ss.com",
  "phone": "1234567890",
  "bankCode": "1040",
  "idType" : "CC",
  "idCardNumber" : "123456789",
  "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
  "expirationTime": 1718409600000
}
```

### Response Parameters 

| Field           | Type       | Required | Length | Description                                          |
|-----------------|------------|----------|--------|------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                |
| tradeNo         | String     | yes      | 32     | Platform order number                                |
| amount          | String     | yes      | 32     | Transaction amount                                   |
| paymentType     | Int        | yes      | 3      | Payment type                                         |
| paymentInfo     | String     | yes      | 32     | Main payment information, e.g., payment link or code |
| additionalInfo  | JSONObject | no       |        | Extended information                                 |
| status          | Int        | yes      |        | Payment status: 1 = Success, 3 = Failure             |
| errorMsg        | String     | no       |        | Error message (returned only in case of failure)     |

```json title="Response Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000040",
    "amount": "30000.00",
    "tradeNo": "TS2405220001CO0000000000010033",
    "paymentType": 201,
    "paymentInfo": "https://mock/pse/",
    "additionalInfo": {},
    "status": 1,
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833191761712117"
}
```
