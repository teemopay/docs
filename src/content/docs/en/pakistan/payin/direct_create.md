---
title: Create Direct
description: Merchant creates a cashier order
---

### Request URL

| method | url                         |
|--------|-----------------------------|
| POST   | /api/pay/payment/create/v1 |


### Headers

| Header Parameter | Description       |
|------------------| ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | PK                |
| appCode          | Application ID    |




### Supported Payment Methods List (paymentType)

| Payment Method Name | paymentType (Request Parameter) |
|---------------------|---------------------------------|
|  Easypaisa        | 303                             |
| Jazzcash        | 304                             |



### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                |
| --------------- | ------ |----------| ------ |--------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                      |
| paymentType     | Int    | yes      |        | Payment method: 303 or 304                                                                 |
| idCardNumber    | String | no       | 13     | Customer ID card number, 13-digit integer .When paymentType is 304:Jazzcash, it's required |
| amount          | String | yes      | 20     | Payment amount (PKR), must be an integer                                                   |
| realName        | String | yes      | 40     | Customer name: Uppercase only, no special characters, max 40 characters                    |
| email           | String | yes      | 50     | Customer email: must match valid regex                                                     |
| phone           | String | yes      | 10     | Phone number, 10 digits without country code                                               |
| sign            | String | yes      |        | Signature                                                                                  |
| callbackUrl     | String | no       | 200    | Callback URL                                                                               |





```json title= request example 
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "paymentType": 304,
    "email": "TeemoPay@example.com",
    "idCardNumber": "1234567890123",
    "callbackUrl": "https://www.callbackexample.com",
    "phone": "03000000000",
    "realName" : "TEEMO",
    "sign": "YOUR_SIGN"
}
```



### Response Parameters

| Field           | Type       | Required | Length | Description                                                   |
| --------------- | ---------- | -------- | ------ | ------------------------------------------------------------- |
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                         |
| tradeNo         | String     | yes      | 32     | Platform order number                                         |
| amount          | String     | yes      | 32     | Transaction amount                                            |
| paymentType     | Int        | yes      | 10     | Payment method: 302                                           |
| paymentInfo     | String     | yes      | 32     | Primary payment information, e.g., payment ID or order number |
| additionalInfo  | JSONObject | no       |        | Additional information                                        |
| status          | Int        | yes      |        | 1 - Order Created Successfully, 3 - Failed                    |
| errorMsg        | String     | no       |        | Error message (returned on failure)                           |




```json title= response example
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
    "code": 200,
    "data": {
        "amount": "1000.00",
        "tradeNo": "TS2501010001PK0000000000000000",
        "paymentType": 304,
        "merchantOrderNo": "OrderNoExample",
        "additionalInfo": {},
        "status": 1
    }
}
```