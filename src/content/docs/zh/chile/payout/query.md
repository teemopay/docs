---
title: 代付查询
description: 商户查询一个代付订单的状态
---

### 请求地址

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country                   | CL     |
| app_code                  | app编号  |

### 请求参数

| 字段            | 类型   | 必需 | 长度 | 描述       |
| --------------- | ------ | ---- | ---- | ---------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号 |
| sign            | String | yes  |      | 签名       |

```json title=请求示例
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                 | 类型      | 必需 | 长度 | 描述                       |
|--------------------|---------| ---- | -- |--------------------------|
| code               | Integer | yes  |    | 请求响应码                    |
| msg                | String  | yes  |    | 响应信息                     |
| data               | Object  | yes  |    | 响应数据                     |
| -- merchantOrderNo | String  | yes  | 32 | 商户订单号                    |
| -- tradeNo         | String  | yes  |    | 平台订单号                    |
| -- amount          | String  | yes  |    | 代付金额                     |
| -- remark          | String  | yes  |    | 备注                |
| -- status          | Int  | yes  |    | 代付状态,2:成功 3:失败     |
| -- sign            | String  | yes  |    | 签名                       |

```json title=返回示例
{
    "code": 200,
    "data": {
        "amount": "10000.00",
        "merchantOrderNo": "OrderNoExample",
        "sign": "TEEMO_SIGN",
        "status": 1,
        "tradeNo": "TF2501010001CO0000000000000000"
    },
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
```json title=订单不存在返回示例
{
    "code": 400,
    "msg":"Order not found",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
