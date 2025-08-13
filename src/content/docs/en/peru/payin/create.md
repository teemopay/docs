---
title: Create Payment
description: Merchant requests to create a payment order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Header Information

| Header Parameter | Description       |
| ---------------- |-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (PE) |
| app_code         | Application ID    |

### Supported Payment Methods (paymentType)

| Payment Method Name     | PaymentType | Note                                                         |
| ----------------------- | ----------- | ------------------------------------------------------------ |
| checkout (Payment Link) | 101         | Multiple callbacks may occur, handle callback logic properly |

![image-20240528105940814](https://image.xiwu.me/2024/903d077857edfdec8deee35a455587f4.png)

#### additionalInfo Field Description:

##### When payment method is 101: checkout payment link, additionalInfo returns:

| Field Name  | Type   | Length | Required | Description  |
| ----------- | ------ | ------ | -------- | ------------ |
| paymentLink | String | 32     | Yes      | Payment link |

#####

### Request Parameters

| Field           | Type   | Required | Length | Description                                                               |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                     |
| paymentType     | Int    | yes      |        | Payment method: 101 - checkout (payment link cashier)                     |
| amount          | String | yes      | 20     | Collection amount (in Soles)                                              |
| expirationTime  | Long   | no       |        | Expiration time, in milliseconds timestamp, e.g., 1735660800000           |
| realName        | String | yes      | 64     | Customer's full name                                                      |
| email           | String | yes      | 50     | Customer email address (must match regex format)                          |
| phone           | String | yes      | 9      | Phone number (9 digits, without country code)                             |
| sign            | String | yes      |        | Signature                                                                 |
| callbackUrl     | String | no       | 200    | Callback URL                                                              |

```json title="Request Example"
{
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 101,
    "amount": "10.00",
    "realName": "TeemoPay",
    "email": "TeemoPay@example.com",
    "phone": "900000000",
    "callbackUrl": "https://www.callbackexample.com",
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
    "amount": "10.00",
    "tradeNo": "TS2501010001PE0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 101,
    "additionalInfo": {
      "thirdOrderNum": "12345678901"
    },
    "paymentInfo": "https://www.paymentLinkExample.com",
    "status": 1
  }
}

```