---
title: Create KYC
description: Merchant creates a KYC verification application for a user
---

After KYC approval, the system automatically increases the user's payout and payin limits. If verification fails, the user must submit another application and upload the required documents again.

### Request URL

| method | url                      |
|--------|--------------------------|
| POST   | /api/pay/kyc/kycApplyFor |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| appCode         | Application ID    |

### Request Parameters

| Field        | Type   | Required | Length | Description                                                      |
|--------------|--------|----------|--------|------------------------------------------------------------------|
| idCardNumber | String | yes      | 50     | Merchant-side user ID                                            |
| phone        | String | yes      | 8-9    | User's real Cambodian phone number: 8-9 digits without area code |
| realName     | String | yes      | 64     | User's name                                                      |
| callbackUrl  | String | yes      | 200    | Callback URL                                                     |
| sign         | String | yes      |        | Signature                                                        |

```json title="Request Example"
{
  "idCardNumber": "UserReferenceExample",
  "phone": "12345678",
  "realName": "TeemoPay",
  "callbackUrl": "https://www.callbackexample.com/kyc",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field                | Type   | Required | Length | Description                                                                              |
|----------------------|--------|----------|--------|------------------------------------------------------------------------------------------|
| phone                | String | yes      | 8-9    | User's real Cambodian phone number: 8-9 digits without area code                         |
| authenticationStatus | String | yes      |        | KYC status: 0-Pending verification, 1-Under review, 2-Approved, 3-Rejected, 4-Failed      |
| authenticationUrl    | String | yes      |        | Verification URL. If rejected, the user can use it to resubmit verification information |
| errorMsg             | String | yes      |        | Failure reason                                                                           |

```json title="Success Example"
{
  "msg": "success",
  "code": "200",
  "data": {
    "phone": "12345678",
    "authenticationStatus": "0",
    "authenticationUrl": "https://www.kycexample.com/verify",
    "errorMsg": ""
  }
}
```

### Error Codes

| Error Code | Error Message                                                          | Handling Solution                                      |
|------------|------------------------------------------------------------------------|--------------------------------------------------------|
| 412        | Please try again later                                                 | Please try again later                                 |
| 614        | You already have a KYC apply that is either pending.                    | A KYC application is already pending                   |
| 615        | Your KYC apply has been approved. No further verification is required. | No further verification is required                    |
| 500        | Business Error                                                         | Please contact us                                      |
