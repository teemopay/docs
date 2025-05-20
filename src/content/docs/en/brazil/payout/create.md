---
title: Create Payout
description: Merchant requests to create a payout order
---

### Request URL

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### Header Information

| Header Parameter | Description             |
| ---------------- |-------------------------|
| timestamp        | Request timestamp       |
| nonce            | Random value            |
| country          | Country code (e.g., BR) |
| app_code         | Application ID          |

### Request Parameters

| Field              | Type     | Required | Length | Description                                                                         |
| -----------------  | -------- | -------- | ------ | ----------------------------------------------------------------------------------- |
| merchantOrderNo    | String   | Yes      | 32     | Merchant order number                                                               |
| amount             | String   | Yes      | 20     | Payout amount (in Brazilian Real), up to 2 decimal places                          |
| bankCode           | String   | no      | 50     | Bank code                                                                           |
| bankName           | String   | No       | 50     | Bank name                                                                           |
| accountType        | Int      | Yes      |        | CPF-401<br>CNPJ-402<br>PHONE-403<br>EMAIL-404<br>EVP-405 <br>Choose one of these parameters based on actual situation |
| bankAccount        | String   | Yes      | 255    | Payout bank account                                                                  |
| realName           | String   | Yes      | 255    | User's real name                                                                    |
| idCardNumber       | String   | Yes      | 50     | Payer's ID card number                                                              |
| idType             | String   | Yes      | 32     | CPF (11 digits), CNPJ (14 digits)                                                   |
| callbackUrl        | String   | No       | 200    | Payout callback URL, if not provided, the merchant configuration will be used        |
| sign               | String   | Yes      |        | Signature                                                                           |

```json
{
    "merchantOrderNo": "ds111ad111022911111111111131",
    "realName": "Carlos",
    "bankCode": "1",
    "bankName": "BANK",
    "accountType": 101,
    "bankAccount": "1234567890123456",
    "amount": "100000",
    "callbackUrl": "http://127.0.0.1:8075/sys/dictionary/test",
    "sign": "YOUR SIGN",
    "idType": "DNI",
    "phone": "13175025118",
    "idCardNumber": "12345678"
}
