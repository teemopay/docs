---
title: Create Payout
description: Merchant requests to create a payout order
---

### Request URL

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/payout/create/v1 |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| app_code         | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                       |
|-----------------|--------|----------|--------|-------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                             |
| amount          | String | yes      | 20     | Payout amount in Cambodian riel (KHR); integers only              |
| bankCode        | String | yes      | 50     | Bank code                                                         |
| bankName        | String | yes      | 50     | Bank name                                                         |
| accountType     | Int    | yes      |        | Payout method: 2002-BankTransfer (BAKONG)                         |
| bankAccount     | String | yes      | 50     | Recipient account information, up to 50 characters                |
| realName        | String | yes      | 255    | Recipient name                                                    |
| phone           | String | yes      | 50     | Phone number: 8-9 digits without country code;                    |
| email           | String | yes      | 64     | User email address                                                |
| idCardNumber    | String | yes      | 50     | User's platform identity reference; strictly validated during KYC |
| idType          | String | yes      | 32     | ID type: NONE_KYC 、KYC                                            |
| callbackUrl     | String | no       | 200    | Payout callback URL; merchant configuration is used when omitted  |
| sign            | String | yes      |        | Signature                                                         |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "amount": "10000",
  "bankCode": "0001",
  "bankName": "ABA Bank",
  "accountType": 2002,
  "bankAccount": "BankAccountExample",
  "realName": "TeemoPay",
  "phone": "12345678",
  "email": "TeemoPay@example.com",
  "idCardNumber": "UserReferenceExample",
  "idType": "NONE_KYC",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field           | Type   | Required | Length | Description                                                    |
|-----------------|--------|----------|--------|----------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                          |
| tradeNo         | String | yes      |        | Platform order number                                          |
| amount          | String | yes      |        | Transaction amount                                             |
| status          | Int    | yes      |        | Payout status: 2-Success, 3-Failed                             |
| errorCode       | number | yes      |        | Order failure status error code                                |
| errorMessage    | String | yes      |        | Order failure error message; see the description below         |
| completeTime    | String | yes      |        | Completion time in local timezone, format: yyyy-MM-dd HH:mm:ss |

```json title="Success Example"
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2509080002KH00006005824Example",
    "amount": "10000",
    "status": 1
  },
  "msg": "success",
  "traceId": "b6182161c5124d7bb18a132b3b5eab9e.88.17858360003880005"
}
```

### Error Codes

| Error Code | Error Message                                                       | Handling Solution                              |
|------------|---------------------------------------------------------------------|------------------------------------------------|
| 412        | Please try again later                                              | Please try again later                         |
| 414        | *                                                                   | Correct the corresponding parameter            |
| 417        | Merchant account not found                                          | Contact us to check the merchant account       |
| 425        | Insufficient merchant balance                                       | Top up the merchant account balance            |
| 426        | merchant order duplicate                                            | Use a different merchant order number          |
| 427        | The callback notification address for collection must not be empty. | Configure the payout callback URL              |
| 432        | *                                                                   | Check the account, bank, and payout method     |
| 455        | The account type error.                                             | Check and correct the account type             |
| 462        | This request failed due to blacklist blocking                       | Change the relevant parameters and retry       |
| 473        | Merchant joint verification error: *                                | Contact us to check the merchant configuration |
| 475        | The id card type is error                                           | Check and correct the ID type                  |
| 476        | The id card number is error                                         | Check and correct the ID number                |
| 500        | Business Error                                                      | Please contact us                              |

```json title="Error Response Example"
{
  "code": 425,
  "data": null,
  "msg": "Insufficient merchant balance",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
