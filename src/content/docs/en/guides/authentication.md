---
title: Authentication Example
description: Authentication and Encryption Guide
---

### Encryption Method

- Signature Algorithm: RSA
- Key Length: 1024 bits
- Signature Method: SHA1WithRSA

Note: Merchants need to first generate their public key (via command line or online tools) before integration. A platform public key will be generated when setting up the merchant account (for key exchange).
After adding an application in the merchant backend, go to settings and click the "Exchange Public Key" button to view the platform's public key and enter the merchant's generated public key to complete the exchange.
Merchants and platform use their respective private keys for signing and each other's public keys for verification.

### Request Header Verification & Signature Rules

1. Request headers must include nonce and timestamp
2. If the timestamp sent by merchant differs from current platform time by more than 30 seconds, the request is considered expired
3. Generate random string nonce that cannot be repeated within 24 hours
4. Sort request body field names in ascending ASCII order, concatenate as a=1&b=2, only sort fields with values
5. Add nonce=123 to the sorted result, becoming a=1&b=2&nonce=123
6. Sign a=1&b=2&nonce=123 using private key, place in request body sign field
7. Platform will verify timestamp, nonce and sign upon receiving request, returning failure if verification fails

Platform will perform above operations when calling back to merchant, merchants are recommended to sign parameters

### Request Format

Different interfaces have different request parameters, but all request parameters must contain the sign field

### Request Headers

| Field        | Type             | Required | Length                                                   | Description                               |
| ------------ | ---------------- | -------- | -------------------------------------------------------- | ----------------------------------------- |
| Content-Type | application/json | yes      | Fixed value. All requests must be POST with data in body |                                           |
| app_code     | String           | yes      | 32                                                       | Application code assigned to merchant     |
| country      | String           | yes      | 2                                                        | MX-Mexico PE-Peru CO-Colombia PK-Pakistan |
| nonce        | String           | yes      | 32                                                       | Must be 32-character non-repeating string |
| timestamp    | String           | yes      | 13                                                       | Current timestamp (milliseconds)          |

### Response Format

| Field | Type   | Required | Description    |
| ----- | ------ | -------- | -------------- |
| code  | Int    | yes      | Status code    |
| msg   | String | yes      | Return message |
| data  | Object | no       | Returned data  |
