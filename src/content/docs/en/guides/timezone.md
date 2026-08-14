---
title: Time Zone
description: Time zone used by response time fields
---

### Time Zone Rules

Unless a field explicitly states that it is a Unix timestamp or UTC timestamp, API response time fields such as `createTime`, `completeTime`, and `settleTime` are returned in the fixed time zone of the corresponding country or region.

We use fixed UTC offsets for all supported countries and regions. Daylight saving time is not applied.

### Supported Time Zones

| Country/Region | Code | Time zone |
| -------------- | ---- | --------- |
| Mexico | MX | UTC-6 |
| Peru | PE | UTC-5 |
| Colombia | CO | UTC-5 |
| Brazil | BR | UTC-3 |
| Chile | CL | UTC-4 |
| Argentina | AR | UTC-3 |
| Pakistan | PK | UTC+5 |
| India | IN | UTC+5:30 |
| Indonesia | ID | UTC+7 |
| Cambodia | KH | UTC+7 |
| Korea | KR | UTC+9 |
| USDT | BP | UTC+0 |

For example, Chile is returned as `UTC-4` year-round and will not switch because of daylight saving time.
