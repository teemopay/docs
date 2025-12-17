---
title: Create Payin Order
description: Create a payin order
---

### Request URL

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### Headers

| Header Parameter | Description             |
|------------------|-------------------------|
| timestamp        | Request timestamp       |
| nonce            | Random string           |
| country          | Country code (e.g., AR) |
| app_code         | Application ID          |

### Supported Payment Types (paymentType)

| Payment Method Name | `paymentType` (request parameter) |
|---------------------|-----------------------------------|
| QR                  | 901                               |
| CVU                 | 902                               |
| CHECKOUT            | 903                               |
| Rapipago            | 905                               |
| Pagofacil           | 906                               |

### Request Parameters

| Field           | Type    | Required | Length | Description                                                                                                             |
|-----------------|---------|----------|--------|-------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes      | 32     | Merchant Order Number                                                                                                   |
| paymentType     | Integer | yes      |        | Payment Method 【901（QR）、902 （CVU）、903（CHECKOUT）、905 (RAPIPAGO)、906 (PAGOFACIL)】                                         |
| realName        | String  | yes      | 64     | User's Real Name                                                                                                        |
| merchantName    | String  | yes      | 64     | Payee Account                                                                                                           |
| email           | String  | no       | 50     | User's Email 【Shall comply with the regular expression】                                                                 |
| amount          | String  | yes      | 20     | Collection Amount 【Integer, Unit: ARS (Argentine Peso)】                                                                 |
| idType          | String  | yes      | 50     | Personal identification type: DNI, CUIT, CUIL  【It is recommended to use CUIT】                                          |
| idCardNumber    | String  | yes      | 11     | Personal Identification Number: DNI (7 or 8 digits), CUIT (11 digits, the first digit must be 2 or 3), CUIL (11 digits) |
| expirationTime  | Long    | no       |        | Expiration Time 【Minimum: 1 day; Maximum: 7 day; Millisecond-level timestamp (e.g.: 1735660800000)】                     |
| phone           | String  | no       | 20     | User's Mobile Phone Number 【10 digits】                                                                                  |
| callbackUrl     | String  | no       | 200    | Collection Callback URL 【If not provided, the callback URL configured in the merchant backend will be used】             |
| sign            | String  | yes      |        | Signature                                                                                                               |

```json title="请求示例"
{
  "realName": "TeemoPay",
  "merchantName": "MerchantNameExample",
  "amount": "1000",
  "idCardNumber": "1234567890123",
  "phone": "1234567890",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "OrderNoExample",
  "email": "TeemoPay@example.com",
  "paymentType": 902,
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type       | Required | Length | Description                                                    |
|-----------------|------------|----------|--------|----------------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                          |
| tradeNo         | String     | yes      | 32     | Platform order number                                          |
| amount          | String     | yes      | 32     | Transaction amount                                             |
| paymentType     | Int        | yes      | 10     | Payment Method 【901: QR, 902: CVU, 903: CHECKOUT】              |
| paymentInfo     | String     | yes      | 32     | Main payment information 【QR code, CVU code, or CHECKOUT link】 |
| additionalInfo  | JSONObject | no       | -      | Additional Information 【For auxiliary payment information】     |
| status          | Int        | yes      | -      | Order Status 【1: Payment in Progress; 3: Payment Failed】       |
| errorMsg        | String     | no       | -      | Error Message 【Returned when payment fails】                    |

### Response Examples

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001AR0000000000000000",
    "additionalInfo": null,
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "K8xY3pQ7zW2dE9sR4fT1gH6jU8lM3nB5vC2xZ7qA9wS4eD1rF8tG3yH6uJ9iK2oL5pM8aN3bV7cX9dZ4
    eW1fY3gH6jK8lM2nP5qR7sT9uV2wX4yZ6aB8cD1eF3gH5jK7lM9nO2pQ4rS6tU8vW1xY3zA5bC7dE9fG2hJ4kL6mN8oP1qR3sT5uV7wX9yZ2aB4cD6eF8gH1jK3lM5nO7pQ9rS1tU3vW5xY7zA2bC4dE6fG8hJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5jK7
    ",
    "paymentType": 901,
    "status": 1
  }
}
```

### error code

| errorMsg                                                             | Description                      |
|----------------------------------------------------------------------|----------------------------------|
| Transaction amount exceeds limit, kindly retry within allowed range. | Request amount exceeds the limit |
| Channel request error, technicians will fix ASAP.                    | Channel under maintenance        |
| Unstable network, kindly retry later.                                | Channel network instability      |
| Parameter validation error, kindly verify and retry.                 | Invalid parameters submitted     |
