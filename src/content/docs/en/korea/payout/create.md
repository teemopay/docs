---
title: Create a payout order
description: Create a payout order
---

### Request URL

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/payout/create/v1 |

### Header Information

| Header Parameter | Parameter Description |
|------------------|-----------------------|
| timestamp        | Request timestamp     |
| nonce            | Random value          |
| country          | Country code (KR)     |
| appCode          | Application ID        |

### Request Parameters

| Field           | Type    | Required | Length | Description                                                                                                                                                                                    |
|-----------------|---------|----------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes      | 32     | Merchant Order Number                                                                                                                                                                          |
| amount          | String  | yes      | 20     | Payment Amount (for Disbursement) 【Integer, Unit: KRW (Korean Won)】                                                                                                                            |
| bankCode        | String  | yes      | 50     | Bank Code 【Refer to the bank code in the bank list】                                                                                                                                            |
| bankName        | String  | yes      | 50     | Bank Name 【Refer to the bank name in the bank list】                                                                                                                                            |
| accountType     | Integer | yes      |        | Account Type </br> 801: BANK_TRANSFER   </br>   802: BANKTRANSFER_KYC                                                                                                                          |
| bankAccount     | String  | yes      | 50     | Beneficiary's Bank Account Number                                                                                                                                                              |
| realName        | String  | yes      | 40     | User's Real Name. No special characters allowed; uppercase is recommended. Must be at least 2 characters long. Strict verification is not required, but it must conform to normal name format. |
| idType          | String  | yes      | 50     | Beneficiary Type: RRN (Individual); CO (Enterprise）                                                                                                                                            |
| phone           | String  | yes      | 11     | User mobile number, exactly 11 digits and starting with 010.                                                                                                                                   |
| callbackUrl     | String  | no       | 200    | Disbursement Callback URL. If not provided, the merchant's configured URL will be used.                                                                                                        |
| userDepositCount | Integer | no | | Total number of the user's historical successful payouts on the merchant side. Non-negative integer, e.g. `0`, `1`, or `5`.<br>1. Counting rules: Count only the user's payout orders that have reached a final successful state on the merchant side. Exclude pending, canceled, failed, refunded, or reversed orders.<br>2. Boundary rules: `0` or omission means the user has no historical successful payouts on the merchant side, or has not completed their first payout.<br>3. Usage: This field is a reference factor for payout risk assessment and routing. The platform also considers its own historical transaction records when making decisions. |
| userFirstDepositTime | Long | no | | Time of the user's first successful payout on the merchant side. A 13-digit Unix timestamp in milliseconds, using the same format as pay-in `expirationTime`, e.g. `1732929200000`.<br>1. Counting rules: Use the completion/credit time of the user's first successful payout order on the merchant side, rather than the user's registration time or the current payout request time.<br>2. Boundary rules: Omit this field when `userDepositCount` is `0` or there are no historical successful payouts. Supply a valid timestamp no later than the current request time. The platform will disregard this reference value if it is abnormal or inconsistent with the payout count.<br>3. Usage: This field is a reference factor for payout risk assessment and routing. The platform also considers its own historical transaction records when making decisions. |
| sign            | String  | yes      |        | Signature                                                                                                                                                                                      |

```json title=Request Example
{
  "merchantOrderNo": "OrderNoExample",
  "amount": "1000",
  "bankCode": "088",
  "bankName": "Shinhan Bank",
  "accountType": 801,
  "bankAccount": "12345678998765",
  "realName": "TeemoPay",
  "idType": "RRN",
  "callbackUrl": "https://www.callbackexample.com",
  "userDepositCount": 5,
  "userFirstDepositTime": 1732929200000,
  "sign": "TEEMO_SIGN"
}
```

### Return Parameters

| Parameter       | Type   | Required | Length | Description                                                                                                                                                                                                                                                                                                                                      |
|-----------------|--------|----------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes      | 32     | Merchant order number                                                                                                                                                                                                                                                                                                                            |
| tradeNo         | String | yes      |        | Platform order number                                                                                                                                                                                                                                                                                                                            |
| status          | Int    | yes      |        | `0` Init (non-final status. The order creation request has been received and is awaiting risk review and approval)<br>`1` Pending (pending, non-final status. The order has entered the payout processing flow)<br>`3` Failed (final status. Order creation validation or preliminary approval failed. The payout can be re-initiated as needed) |
| amount          | String | yes      |        | Transaction amount                                                                                                                                                                                                                                                                                                                               |

```json title=Return Example
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001KR0000000000000000",
  "status": 1,
  "sign": "YOUR_SIGN"
}
```
