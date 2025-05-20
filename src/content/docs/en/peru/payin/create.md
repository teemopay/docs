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

| Field           | Type   | Required | Length | Description                                                      |
| --------------- | ------ | -------- |--------| ---------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number                                            |
| paymentType     | Int    | yes      |        | Payment method: 101: checkout (payment link)                     |
| amount          | String | yes      | 20     | Payment amount (in Soles)                                        |
| expirationTime  | Long   | no       |        | Expiration time, default 1 day                                   |
| realName        | String | yes      | 64     | Customer name: uppercase, no special characters, within 50 chars |
| email           | String | yes      | 50     | Customer email: must match regex pattern                         |
| phone           | String | yes      | 9      | Phone number: 9 digits without country code                      |
| sign            | String | yes      |        | Signature                                                        |
| callbackUrl     | String | no       | 200    | Callback URL                                                     |
