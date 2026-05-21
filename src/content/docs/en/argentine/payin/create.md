---
title: Create Payin Order
description: Merchant requests to create a payment order
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
| Rapipago            | 905                               |
| Pagofacil           | 906                               |

### Request Parameters

| Field           | Type    | Required | Length | Description                                                                                                                                                                            |
|-----------------|---------|----------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes      | 32     | Merchant Order Number                                                                                                                                                                  |
| paymentType     | Integer | yes      |        | Payment Method 【901（QR）、902 （CVU）、905 (RAPIPAGO)、906 (PAGOFACIL)】                                                                                                               |
| realName        | String  | yes      | 64     | User's Real Name 【Recommended to use all uppercase】                                                                                                                                  |
| email           | String  | no       | 50     | User's Email 【Shall comply with the regular expression】                                                                                                                                |
| amount          | String  | yes      | 20     | Collection Amount 【ARS】. <br/> <br/> <span style="color: red;">Amount Reduction Scenario: The amount must be a multiple of 100, otherwise the system will block the submission.<br/>Examples: 100, 200, 300, 400<br/>Invalid examples: 101, 110, 210</span> |
| idType          | String  | yes      | 50     | Personal identification type: DNI, CUIT, CUIL. 【It is recommended to use CUIT】                                                                                                         |
| idCardNumber    | String  | yes      | 11     | Personal Identification Number: DNI (7 or 8 digits), CUIT (11 digits, the first digit must be 2 or 3), CUIL (11 digits)                                                                |
| expirationTime  | Long    | no       |        | Expiration Time 【Minimum: 1 day; Maximum: 7 day; Millisecond-level timestamp (e.g.: 1735660800000)】. <br/> <br/> <span style="color: red;">Amount Reduction Scenario: The expiration time will be set to 15 minutes.</span> |
| phone           | String  | no       | 20     | User's Mobile Phone Number 【10 digits】                                                                                                                                                 |
| callbackUrl     | String  | no       | 200    | Collection Callback URL 【If not provided, the callback URL configured in the merchant backend will be used】                                                                            |
| sign            | String  | yes      |        | Signature                                                                                                                                                                              |

```json title="Request Example"
{
  "realName": "TeemoPay",
  "amount": "1000",
  "idType": "DNI",
  "idCardNumber": "12345678",
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
| paymentType     | Int        | yes      | 10     | Payment Method 【901: QR】                                       |
| paymentInfo     | String     | yes      | 32     | Main payment information 【QR code, CVU code, or payment number】 |
| additionalInfo  | JSONObject | no       | -      | Additional Information                                         |
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

### Validation Error Codes

| Error Code | Error Message                                                       | Handling Solution                                           |
|------------|---------------------------------------------------------------------|-------------------------------------------------------------|
| 412        | Please try again later                                              | Please try again later                                      |
| 414        | *                                                                   | Please change the corresponding parameter                   |
| 423        | This payment method is not supported                                | Payment method not supported, please check docs or contact us |
| 426        | merchant order duplicate                                            | Please change merchant order number                         |
| 427        | The callback notification address for collection must not be empty. | Please configure collection callback URL                    |
| 443        | ID number must not be null                                          | ID number cannot be empty                                   |
| 466        | Payment method fee rate not configured.                             | Merchant fee rate configuration error, please contact us    |
| 473        | Merchant joint verification error: *                                | Merchant configuration error, please contact us             |
| 474        | The id card number must be 11 digits.                               | ID number must be 11 digits                                 |
| 500        | Business Error                                                      | Please contact us                                           |

```json title=Response Example
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```

### Channel Error Messages

| errorMsg                                                             | Description                      |
|----------------------------------------------------------------------|----------------------------------|
| Transaction amount exceeds limit, kindly retry within allowed range. | Request amount exceeds the limit |
| Channel request error, technicians will fix ASAP.                    | Channel under maintenance        |
| Unstable network, kindly retry later.                                | Channel network instability      |
| Parameter validation error, kindly verify and retry.                 | Invalid parameters submitted     |

```json title=Response Example
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": null,
    "tradeNo": "TS2501010001AR0000000000000000",
    "paymentType": 901,
    "paymentInfo": null,
    "additionalInfo": null,
    "status": 3,
    "errorMsg": "Transaction amount exceeds limit, kindly retry within allowed range."
  },
  "msg": "success",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```
