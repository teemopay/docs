---
title: query a payout order
description: Query a payout order
---

### 请求地址

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

## 头部信息（header）

| header 参数 | 入参参数描述 |
| ----------- | ------------ |
| timestamp   | 请求时间戳   |
| nonce       | 随机值       |
| country     | 国家码(MX)   |
| app_code    | app 编号     |

### 请求参数

| 字段            | 类型   | 必需 | 长度 | 描述       |
| --------------- | ------ | ---- | ---- | ---------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号 |
| sign            | String | yes  |      | 签名       |

```json title=请求示例
{
  "merchantOrderNo": "201806251011",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数               | 类型    | 必需 | 长度 | 描述                                  |
| ------------------ | ------- | ---- | ---- | ------------------------------------- |
| code               | Integer | yes  |      | 请求响应码                            |
| msg                | String  | yes  |      | 响应信息                              |
| data               | Object  | yes  |      | 响应数据                              |
| -- merchantOrderNo | String  | yes  | 32   | 商户订单号                            |
| -- tradeNo         | String  | yes  |      | 平台订单号                            |
| -- amount          | String  | yes  |      | 代付金额                              |
| -- remark          | String  | yes  |      | 备注                                  |
| -- status          | Int     | yes  |      | 1-支付中 2-代付成功 3-代付失败 4-退款 |
| -- sign            | String  | yes  |      | 签名                                  |

```json title=返回示例
{
  "code": 200,
  "msg": "success",
  "data": {
    "merchantOrderNo": "201806251011",
    "tradeNo": "TF201806251011",
    "remark": "代付备注",
    "status": 1,
    "sign": "TEEMO_SIGN"
  },
  "success": true
}
```

```json title=订单不存在返回示例
{
  "code": 400,
  "msg": "Order not found",
  "success": false
}
```
