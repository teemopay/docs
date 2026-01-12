---
title: Create Payin Order
description: Merchant requests to create a payment order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Headers

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (CO) |
| app_code         | Application ID    |

## Supported Payment Types (paymentType)

| Payment Method Name        | PaymentType |
|----------------------------| ----------- |
| PSE (Payment Online)       | 201         |
| NEQUI (WALLET)             | 202         |
| All (all in one checkoout) | 204         |
| EFECTY (CASH)              | 205         |
| BREB                       | 212         | 

## 场景

What is Bre-B?
Bre-B is Colombia's next-generation interoperable real-time payment system. The process involves the user copying a unique payment key generated on the checkout page and pasting it into their banking app to complete the transfer.


Important Considerations:
Manual Input: Since users manually enter the payment amount within their banking app, the actual amount paid may differ from the initial order amount.
Reconciliation: The system will send a callback notification based on the actual funds received. It is essential to use the final amount provided in the callback for reconciliation purposes.

Official Simulator (Generating your own Bre-B Key): You can access the official simulator to understand how to register and generate keys here: 👉 https://www.banrep.gov.co/es/bre-b/simuladores-curso#registro


### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                                                  |
| --------------- | ------ | -------- | ------ |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                                                                                                        |
| paymentType     | Int    | yes      |        | Payment types, see list above                                                                                                                                                                |
| amount          | String | yes      | 20     | Payin amount, integer only, in COP                                                                                                                                                           |
| expirationTime  | Long   | no       |        | Expiration timestamp                                                                                                                                                                         |
| realName        | String | yes      | 64     | User’s full name                                                                                                                                                                             |
| email           | String | yes      | 50     | User’s email (must match a valid regex format)                                                                                                                                               |
| phone           | String | yes      | 50     | Phone number, 10 digits, no country code                                                                                                                                                     |
| idCardNumber    | String | No       | 50     | ID Number: CC (10 digits), CE (6-10 digits), NIT (9 digits). <br/> Mandatory when the paymentType is 201 (PSE) or 202 (WALLET).                                                              |
| idType          | String | No       | 32     | Id Type: CC (6-10 digits; ID Card), CE (6-10 digits), NIT (9 digits; Tax Identification Number), PA (9 digits; Passport). <br/> Mandatory when the paymentType is 201 (PSE) or 202 (WALLET). |
| bankCode        | String | No       | 50     | Bank Code. <br/> Mandatory when the paymentType is 201 (PSE).<br> Bank List for Reference in Creating Payout-on-Behalf Services                                                              |
| sign            | String | yes      |        | Signature                                                                                                                                                                                    |
| callbackUrl     | String | no       | 200    | Callback URL                                                                                                                                                                                 |


```json title="请求示例"
{
    "realName": "TeemoPay",
    "amount": "10000",
    "phone": "1234567890",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "email": "TeemoPay@example.com",
    "idType": "CC",
    "idCardNumber": "1234567890",
    "bankCode": 1040,
    "paymentType": 201,
    "sign": "YOUR_SIGN"
}
```

```json title="请求示例"
{
    "realName": "TeemoPay",
    "amount": "10000",
    "phone": "1234567890",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "email": "TeemoPay@example.com",
    "idType": "CC",
    "idCardNumber": "1234567890",
    "paymentType": 202,
    "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type       | Required | Length | Description                                          |
| --------------- | ---------- | -------- | ------ | ---------------------------------------------------- |
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
  
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "10000",
    "tradeNo": "TS2501010001CO0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 204,
    "additionalInfo": {
    },
    "paymentInfo": "https://www.paymentLinkExample.com",
    "status": 1
  }
}
```