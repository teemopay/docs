---
title: Create Payin Order
description: Create a payin order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Headers

| Header Parameter | Description             |
| --------------- |-------------------------|
| timestamp       | Request timestamp       |
| nonce           | Random string           |
| country         | Country code (e.g., MX) |
| app_code        | Application ID          |


## Supported Payment Types (paymentType)


| Payment Method Name                               | `paymentType` (request parameter) |
| ------------------------------------------------- | --------------------------------- |
| VA (SPEI Online Bank Transfer)                    | 1                                 |
| PayCashOnce (Offline Cash Payment One-Time)       | 4                                 |
| PayCashRecurrent (Offline Cash Payment Recurrent) | 5                                 |
| OXXO (Offline Cash Payment via OXXO)              | 6                                 |


### Notes

For paymentType = 1 (VA), the repayment amount and frequency are determined by the user.
The actual collected amount may be less than or more than the expected amount, 
and multiple repayments may occur. Merchants must handle this logic properly.
Each repayment can be uniquely identified using the paymentOrderNo field in the callback.

For paymentType = 5 (PayCashRecurrent), multiple repayments may also occur.
Each repayment is identified by the paymentOrderNo field in the callback.



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

| Field           | Type   | Required | Length | Description                                                                                                |
| --------------- | ------ | -------- | ------ |------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | Yes      | 32     | Merchant order number                                                                                      |
| paymentType     | Int    | Yes      |        | Payment Type: 1-Payment code  4-PayCashOnce(Single offline) 5-PayCashRecurrent(Multi offline)              |
| realName        | String | Yes      | 50     | User name: Uppercase, no special characters, within 50 characters                                          |
| email           | String | No       | 50     | User email: Must match regex pattern                                                                       |
| amount          | String | Yes      | 20     | Collection amount (Peso)                                                                                   |
| expirationTime  | Long   | No       |        | Expiration time, required in certain conditions, e.g.: 1717048800000, mandatory when paymentType is 4 or 5 |
| phone           | String | No       | 20     | Phone number                                                                                               |
| callbackUrl     | String | No       | 200    | Payout callback URL, if not provided, merchant configuration will be used                                  |
| sign            | String | Yes      |        | Signature                                                                                                  |






```json title="Request Example"
{
    "realName": "TeemoPay",
    "amount": "1000.00",
    "phone": "1000000000",
    "sign": "YOUR_SIGN",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample",
    "email": "TeemoPay@example.com",
    "paymentType": 1
}
```



### Response Parameters

| Field           | Type       | Required | Length | Description                                                             |
| --------------- | ---------- | -------- | ------ |-------------------------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                                   |
| tradeNo         | String     | yes      | 32     | Platform order number                                                   |
| amount          | String     | yes      | 32     | Transaction amount                                                      |
| paymentType     | Int        | yes      | 10     | Payment method: 1 = VA, 4 = PayCashOnce, 5 = PayCashRecurrent           |
| paymentInfo     | String     | yes      | 32     | Main payment information (e.g., VA account number or payment reference) |
| additionalInfo  | JSONObject | no       | -      | Additional information; used as supplementary data                      |
| status          | Int        | yes      | -      | Status: 1 = Order created successfully, 3 = Failed                      |
| errorMsg        | String     | no       | -      | Error message (returned when failed)                                    |



### Response Examples by PaymentType

#### PaymentType = 1 (Va)

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "additionalInfo": {
      "paymentLink": "https://test-mx-payin.teemopay.com/TS2405220001MX0000315772003922"
    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "684180093000000000",
    "paymentType": 1,
    "status": 1
  }
}
```

####  PaymentType = 4 (PayCashOnce)


```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 4,
    "additionalInfo": {
      "paymentLink": "https://www.paycashLinkExample.com"
    },
    "paymentInfo": "1420000000000",
    "status": 1
  }
}
```

#### PaymentType = 5 (PayCashRecurrent)


```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610297",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 4,
    "additionalInfo": {
      "paymentLink": "https://www.paycashLinkExample.com"
    },
    "paymentInfo": "1420000000000",
    "status": 1
  }
}
```
####  PaymentType = 6 (OXXO)

```json
{
  "amount": "1000.00",
  "tradeNo": "TS2404070001MX0000205873135769",
  "merchantOrderNo": "ABCDEFG",
  "paymentType": 6,
  "additionalInfo": {
    "paymentLink": "https://www.paycashglobXXXXXXXm/formato.php?referencia=ATQyMDY0OTczNDIzMg==&interno=1"
  },
  "paymentInfo": "1420649734231",
  "status": 1
}
```

### errorMsg Description:

| errorMsg                                                             | Description                      |
| -------------------------------------------------------------------- | -------------------------------- |
| Transaction amount exceeds limit, kindly retry within allowed range. | Request amount exceeds the limit |
| Channel request error, technicians will fix ASAP.                    | Channel under maintenance        |
| Unstable network, kindly retry later.                                | Channel network instability      |
| Parameter validation error, kindly verify and retry.                 | Invalid parameters submitted     |
