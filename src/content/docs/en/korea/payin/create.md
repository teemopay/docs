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
| KYC VA dynamic                     | 802                               |




### Request Parameters

| Field           | Type   | Required | Length | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | ------ | -------- | ------ |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | Merchant Order Number                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| paymentType     | Integer | yes |      | Payment Method 【801: VA  802: KYC VA dynamic】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| realName        | String  | yes | 64   | User's Real Name 【Letters or Korean characters shall not exceed 20 characters】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| merchantName    | String  | yes | 64   | Payee Account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| email           | String  | no  | 50   | User's Email 【Shall comply with the regular expression】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| bankCode            | String  | no  | 20   |Bank Code: This represents the identification of the financial institution that will receive the transfer or perform the authentication. It needs to transmit a 3-digit standard code defined by the Korea Financial Settlement Institute (KFTC) (for example: Kookmin Bank 004, Shinhan Bank 088). When the payment method is set to 802, the system will trigger specific KYC logic, allowing for the optional input of bankCode. If no identification code is transmitted under this code, the user will need to manually complete the identity information within the H5/App authentication page after the redirection. [Reference for value transmission: kyc bank list]                                                                                       |
| bankAccount         | String  | no  | 20   | Holder's account: Identification information used for real-name authentication (KYC). When the payment method is 802, this field supports optional transmission: if this field is carried when calling the interface, the system will pre-fill it on the KYC authentication page to enhance the user experience; if it is not transmitted, the user will fill it in manually during the authentication process.                                                                                                                                                                                                                                                                                                                                             |
| accountHolderNumber | String  | no  | 20   | Account Holder Identification Number (accountHolderNum): This is the identification information used for real-name verification (KYC). When the payment method is 802, this field supports optional transmission: If this field is included when calling the interface, the system will pre-fill it on the KYC authentication page to enhance the user experience; if not transmitted, the user must manually fill it in during the authentication process. Filling guidelines: 1. Individual users: Please provide the first 6 digits of the resident registration number (Resident ID), in the format of year-month-day YYMMDD (e.g.: 950101); 2. Enterprise users: Please provide a 10-digit business registration number (Business Registration Number) |
| amount          | String  | yes | 20   | Collection Amount 【Integer, Unit: KRW (Korean Won)】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| expirationTime  | Long    | no  |      | Expiration Time 【Maximum 2 hours; defaults to 2 hours if left blank; in millisecond timestamp, e.g.: 1735660800000】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| phone           | String  | no  | 20   | User's Mobile Phone Number 【11 digits; starts with 010; no area code】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| callbackUrl     | String  | no  | 200  | Collection Callback URL 【If not provided, the callback URL configured in the merchant backend will be used】                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| sign            | String  | yes |      | Signature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |





```json title="request example"
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

```json title="request example"
{
  "merchantOrderNo": "802_test",
  "paymentType": 802,
  "amount": "100",
  "realName": "realname",
  "merchantName": "12312321",
  "bankCode": "002", 
  "bankAccount": "345345345", 
  "accountHolderNumber": "234234", 
  "phone": "01012131231",
  "email": "123@123.com",
  "sign": "123213"
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

### KYC Response Examples

```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "802_test_012",
    "amount": "1000.00",
    "tradeNo": "TS2509080002KR0000465606537906",
    "paymentInfo":"https://test-kr-payin.teemopay.com/TS2509080002KR0000465606537906",
    "paymentType": 802,
    "status": 0,
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "8f63469806b94d79b8cff936faa5e6f5.90.17689640170370051"
}
```


### error code

| errorMsg                                                             | Description                      |
| -------------------------------------------------------------------- | -------------------------------- |
| Transaction amount exceeds limit, kindly retry within allowed range. | Request amount exceeds the limit |
| Channel request error, technicians will fix ASAP.                    | Channel under maintenance        |
| Unstable network, kindly retry later.                                | Channel network instability      |
| Parameter validation error, kindly verify and retry.                 | Invalid parameters submitted     |
