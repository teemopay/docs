---
title: KYC Callback
description: Merchant receives an asynchronous KYC result notification
---

### Callback URL

| method | url                            |
|--------|--------------------------------|
| POST   | Merchant provided callback URL |

### Header Information

| Header Parameter | Description       |
|------------------|-------------------|
| timestamp        | Request timestamp |
| nonce            | Random value      |
| country          | KH                |
| appCode          | Application code  |

### KYC Callback

| Field                | Type   | Required | Length | Description                                                               |
|----------------------|--------|----------|--------|---------------------------------------------------------------------------|
| phone                | String | yes      | 8-9    | User's real Cambodian local phone number without the country code         |
| authenticationStatus | String | yes      |        | KYC status: 0-Pending verification, 1-Under review, 2-Approved, 3-Rejected, 4-Failed |
| sign                 | String | yes      |        | Signature                                                                 |

```json title="Asynchronous Notification Example"
{
  "phone": "101603841",
  "authenticationStatus": "2",
  "sign": "12222222222"
}
```

### Callback Response

| Field   | Type   | Required | Length | Description                                               |
|---------|--------|----------|--------|-----------------------------------------------------------|
| SUCCESS | String | yes      |        | Return `SUCCESS`; otherwise, the callback will be retried |

```text title="Response Example"
SUCCESS
```

### Status

| Value | Description          |
|-------|----------------------|
| 0     | Pending verification |
| 1     | Under review         |
| 2     | Approved             |
| 3     | Rejected             |
| 4     | Failed               |
