---
title: Create Payin Order
description: Create a payin order
---

### Request URL

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Headers

| Header Parameter | Description       |
| --------------- |-------------------|
| timestamp       | Request timestamp |
| nonce           | Random string     |
| country         | Country code (e.g., KR)                |
| app_code        | Application ID    |


###  Supported Payment Types (paymentType)


| Payment Method Name                               | `paymentType` (request parameter) |
| ------------------------------------------------- |-----------------------------------|
| VA (SPEI Online Bank Transfer)                    | 801                               |




### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                         |
| --------------- | ------ | -------- | ------ |---------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | Merchant Order Number                                                                                               |
| paymentType     | Integer | yes |      | Payment Method 【801: VA】                                                                                            |
| realName        | String  | yes | 64   | User's Real Name 【Letters or Korean characters shall not exceed 20 characters】                                      |
| merchantName    | String  | yes | 64   | Payee Account                                                                                      |
| email           | String  | no  | 50   | User's Email 【Shall comply with the regular expression】                                                             |
| amount          | String  | yes | 20   | Collection Amount 【Integer, Unit: KRW (Korean Won)】                                                                 |
| expirationTime  | Long    | no  |      | Expiration Time 【Maximum 2 hours; defaults to 2 hours if left blank; in millisecond timestamp, e.g.: 1735660800000】 |
| phone           | String  | no  | 20   | User's Mobile Phone Number 【11 digits; starts with 010; no area code】                                               |
| callbackUrl     | String  | no  | 200  | Collection Callback URL 【If not provided, the callback URL configured in the merchant backend will be used】         |
| sign            | String  | yes |      | Signature                                                                                                           |





```json title="请求示例"
{
    "realName": "TeemoPay",
    "merchantName": "MerchantNameExample",
    "amount": "1000",
    "phone": "01012345678",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample",
    "email": "TeemoPay@example.com",
    "paymentType": 801,
    "sign": "YOUR_SIGN"
}
```



### Response Parameters

| Field           | Type       | Required | Length | Description                                                                                                                             |
| --------------- | ---------- | -------- | ------ |-----------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                                                                                                   |
| tradeNo         | String     | yes      | 32     | Platform order number                                                                                                                   |
| amount          | String     | yes      | 32     | Transaction amount                                                                                                                      |
| paymentType     | Int        | yes      | 10     | Payment Method 【801: VA】                                                                                                                |
| paymentInfo     | String     | yes      | 32     | Main payment information 【This returns the actual information used for payment, such as: Visa account number, payment reference number】 |
| additionalInfo  | JSONObject | no       | -      | Additional Information 【For auxiliary payment information】                                                                              |
| status          | Int        | yes      | -      | Order Status 【1: Payment in Progress; 3: Payment Failed】                                                                                |
| errorMsg        | String     | no       | -      | Error Message 【Returned when payment fails】                                                                                             |



### Response Examples

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001KR0000000000000000",
    "additionalInfo": {"bankCode":"IBK","bankName":"기업은행","expiredTime":1761022567000},
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "29900000000000",
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
