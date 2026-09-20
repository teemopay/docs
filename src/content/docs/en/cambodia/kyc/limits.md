---
title: KYC Limits
description: KYC-related payin and payout limits in Cambodia
---

Merchants can initiate a KYC application for a payer. After KYC approval, the system removes the payer phone number's daily cumulative payin limit. Payout limits are not affected by KYC status.

## Payin — Daily Cumulative Limits

Daily cumulative limits are calculated by payer phone number.

| Currency | Non-KYC User | KYC-Approved User |
|---|---:|---:|
| USD | 20,000 USD / day | No daily cumulative limit |
| KHR | 80,000,000 KHR / day | No daily cumulative limit |

## Payin — Per-Transaction Limits

These per-transaction limits apply to all users and are not affected by KYC status.

| Currency | Payment Method | Per-Transaction Limit |
|---|---|---:|
| USD | KHQR (QR) | 0.01–20,000 USD |
| USD | VA | 0.01–50,000 USD |
| KHR | KHQR (QR) | 100–80,000,000 KHR |
| KHR | VA | 100–200,000,000 KHR |

## Payout — Per-Transaction Limits

Payout limits are not affected by KYC status.

| Currency | Per-Transaction Limit |
|---|---:|
| USD | 0.01–50,000 USD |
| KHR | 100–200,000,000 KHR |

## Business Rules

1. The daily cumulative payin limit uses the payer phone number as the unique aggregation key and totals the amount credited for that phone number during the day.
   - Non-KYC users are checked against both the per-transaction limit and the phone number's daily cumulative limit. A transaction is rejected if either limit is exceeded.
   - For KYC-approved users, the phone number's daily cumulative limit is removed. Only the per-transaction limits above remain.
2. Per-transaction limits are the same for all users. KYC status does not change the minimum or maximum amount.
3. Payout limits are fixed and are not affected by KYC status.
