---
title: 余额查询
description: 余额查询
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/merchant/balance |

### 请求参数

| 字段   | 类型     | 必需  | 长度  | 描述  |
| ---- | ------ | --- | --- | --- |
| sign | String | yes |     | 签名  |

```json
{
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数           | 类型     | 必需  | 长度  | 描述   |
| ------------ | ------ | --- | --- | ---- |
| totalAmount  | String | yes |     | 总金额  |
| frozenAmount | String | yes |     | 冻结金额 |
| availAmount  | String | yes |     | 可用金额 |

```json
{
  "totalAmount": "1009962.02",
  "frozenAmount": "33161.70",
  "availAmount": "976800.32"
}
```
