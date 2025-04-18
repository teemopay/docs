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
| ---------------- | ----------------- |
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (CL) |
| app_code         | App number        |

## Supported Payment Types (paymentType)

| Payment Type Name | PaymentType (Parameter) |
|-----------------|------------------------|
| All-In-One Checkout              | 601                    |

Including:
KHIPU
WEBPAY
BANK TRANSFER
MACH
PAGO46

![telegram-cloud-photo-size-1-5184106632890658364-y.jpg](create.assets/telegram-cloud-photo-size-1-5184106632890658364-y.jpg)


### additionalInfo (Additional Fields) Description

### When paymentType is 2, additionalInfo returns

| Field Name  | Type       | Length | Required | Description  |
| ----------- | ---------- | ------ | -------- | ------------ |
| paymentLink | String(32) | 32     | Yes      | Payment link |

### When paymentType is 3, additionalInfo returns

| Field Name      | Type       | Length | Required | Description       |
| --------------- | ---------- | ------ | -------- | ----------------- |
| bankName        | String(16) | 16     | Yes      | Payment bank name |
| bankCode        | String(16) | 16     | Yes      | Payment bank code |
| expiredTime     | Long       |        | Yes      | Default 9 days    |
| beneficiaryName | String(32) | 32     | Yes      | Beneficiary name  |

### When paymentType is 4, additionalInfo returns

| Field Name  | Type | Required | Description                                             |
| ----------- | ---- | -------- | ------------------------------------------------------- |
| expiredTime | Long | Yes      | Expiration time (time when request interface is called) |

### When paymentType is 5, additionalInfo returns

| Field Name  | Type | Required | Description                                             |
| ----------- | ---- | -------- | ------------------------------------------------------- |
| expiredTime | Long | Yes      | Expiration time (time when request interface is called) |

### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                              |
| --------------- | ------ | -------- | ------ |----------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                                                                    |
| paymentType     | Int    | Yes      |        | Payment type                                                                                             |
| realName        | String | Yes      | 50     | User name: uppercase, no special characters, within 50 characters                                        |
| email           | String | No       | 50     | User email: must match regex pattern                                                                     |
| amount          | String | Yes      | 20     | Payment amount (in pesos)                                                                                |
| expirationTime  | Long   | No       |        | Expiration time |
| phone           | String | No       | 20     | Phone number                                                                                             |
| callbackUrl     | String | No       | 200    | Payment callback URL, if not provided, merchant configuration will be used                               |
| sign            | String | Yes      |        | Signature                                                                                                |
