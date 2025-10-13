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
| ------------------------------------------------- |-----------------------------------|
| VA (SPEI Online Bank Transfer)                    | 801                               |




### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                           |
| --------------- | ------ | -------- | ------ |-----------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | Merchant Order Number                                                                                                 |
| paymentType     | Integer | yes |      | Payment method: (801: VA)                                                                                             |
| realName        | String  | yes | 64   | User name (no more than 20 characters for letters or Korean characters)                                               |
| email           | String  | no  | 50   | User email: It is acceptable as long as it meets the regular expression requirements.                                 |
| amount          | String  | yes | 20   | Collection amount - Integer - Unit: Yuan (Currency: KRW)                                                              |
| expirationTime  | Long    | no  |      | Maximum two hours, defaulting to two hours if empty; Millisecond-level timestamp eg: 173566080000                     |
| phone           | String  | no  | 20   | User's mobile phone number: 11 digits; without area code; starting with 010                                           |
| callbackUrl     | String  | no  | 200  | Revert the callback address (if not provided, the callback address configured in the merchant's backend will be used) |
| sign            | String  | yes |      | sign                                                                                                                  |





```json title="请求示例"
{
  "merchantOrderNo":"test_001",
  "paymentType":801,
  "amount": "120",
  "realName": "realName",
  "email": "123@123.com",
  "phone":"01012343211",
  "sign": "your  sign"
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



### Response Examples

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "120.00",
    "tradeNo": "tradeNo",
    "additionalInfo": {},
    "merchantOrderNo": "test_001",
    "paymentInfo": null,
    "paymentType": 801,
    "status": 1
  }
}
```


### error code

| errorMsg                                                             | Description                      |
| -------------------------------------------------------------------- | -------------------------------- |
| Transaction amount exceeds limit, kindly retry within allowed range. | Request amount exceeds the limit |
| Channel request error, technicians will fix ASAP.                    | Channel under maintenance        |
| Unstable network, kindly retry later.                                | Channel network instability      |
| Parameter validation error, kindly verify and retry.                 | Invalid parameters submitted     |
