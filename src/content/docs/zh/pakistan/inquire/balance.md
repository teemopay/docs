---
title: 余额查询
description: 余额查询
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/merchant/balance |



### 头部信息（header）

| header 参数 | 入参参数描述 |
| ----------- |--------|
| timestamp   | 请求时间戳  |
| nonce       | 随机值    |
| country     | PK     |
| app_code    | app 编号 |
### 请求参数

| 字段 | 类型   | 必需 | 长度 | 描述 |
| ---- | ------ | ---- | ---- | ---- |
| sign | String | yes  |      | 签名 |

```json title=请求示例
{
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数         | 类型   | 必需 | 长度 | 描述     |
| ------------ | ------ | ---- | ---- | -------- |
| totalAmount  | String | yes  |      | 总金额   |
| frozenAmount | String | yes  |      | 冻结金额 |
| availAmount  | String | yes  |      | 可用金额 |

```json title=返回示例
{
    "code": 200,
    "data": {
        "totalAmount": "12000.00",
        "frozenAmount": "2000.00",
        "availAmount": "10000.00"
    },
    "msg": "success",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
