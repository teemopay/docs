---
title: create a payin order
description: Create a payin order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Header Information

| Header Parameter | Description       |
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (MX) |
| app_code         | Application code  |

## Supported Payment Methods (paymentType)

| Payment Method Name                          | PaymentType (Parameter) |
| -------------------------------------------- | ----------------------- |
| VA (Online bank transfer single & recurring) | 1                       |
| BankTransfer (Online bank transfer single)   | 3                       |
| PayCashOnce (Cash payment single)            | 4                       |
| PayCashRecurrent (Cash payment recurring)    | 5                       |

#### additionalInfo (Additional Fields) Description:

##### When paymentType is 4, additionalInfo includes:

| Field Name  | Type | Required | Description                                 |
| ----------- | ---- | -------- | ------------------------------------------- |
| expiredTime | Long | Yes      | Expiration time (time when request is made) |

##### When paymentType is 5, additionalInfo includes:

| Field Name  | Type | Required | Description                                 |
| ----------- | ---- | -------- | ------------------------------------------- |
| expiredTime | Long | Yes      | Expiration time (time when request is made) |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                  |
| --------------- | ------ | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                                                                                        |
| paymentType     | Int    | Yes      |        | Payment method: 1-Payment code  4-PayCashOnce(Single offline) 5-PayCashRecurrent(Multi offline) |
| realName        | String | Yes      | 50     | User name: Uppercase, no special characters, within 50 characters                                                            |
| email           | String | No       | 50     | User email: Must match regex pattern                                                                                         |
| amount          | String | Yes      | 20     | Collection amount (Peso)                                                                                                     |
| expirationTime  | Long   | No       |        | Expiration time, required in certain conditions, e.g.: 1717048800000, mandatory when paymentType is 4 or 5                   |
| phone           | String | No       | 20     | Phone number                                                                                                                 |
| callbackUrl     | String | No       | 200    | Payout callback URL, if not provided, merchant configuration will be used                                                    |
| sign            | String | Yes      |        | Signature                                                                                                                    |
