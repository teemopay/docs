---
title: Query KYC Status
description: Merchant queries a user's KYC verification status
---

### Request URL

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/kyc/kycStatusQuery |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | Country code (KH) |
| app_code         | Application ID    |

### Request Parameters

| Field | Type   | Required | Length | Description                                                      |
|-------|--------|----------|--------|------------------------------------------------------------------|
| phone | String | yes      | 8-9    | User's real Cambodian local phone number without the country code |
| sign  | String | yes      |        | Signature                                                        |

```json title="Request Example"
{
  "phone": "104837292",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Field                | Type   | Required | Length | Description                                                               |
|----------------------|--------|----------|--------|---------------------------------------------------------------------------|
| authenticationStatus | String | yes      |        | KYC status: 0-Pending verification, 1-Under review, 2-Approved, 3-Rejected, 4-Failed |
| errorMsg             | String | yes      |        | Failure reason                                                            |

```json title="Success Example"
{
  "msg": "success",
  "code": "200",
  "data": {
    "authenticationStatus": "3",
    "errorMsg": "The file and type do not match"
  }
}
```

### Error Codes

| Error Code | Error Message                      | Handling Solution                         |
|------------|------------------------------------|-------------------------------------------|
| 412        | Please try again later             | Please try again later                    |
| 619        | This user phone is not registered. | The user's phone number is not registered |
| 500        | Business Error                     | Please contact us                         |
