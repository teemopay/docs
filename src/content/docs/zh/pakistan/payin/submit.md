---
title: 提交代收
description: 商户请求提交一个代收订单
---

### 请求地址

| method | url                     |
| ------ |-------------------------|
| POST   | /api/pay/payment/submit |

### 头部信息（header）

| header参数                  | 入参参数描述  |
|---------------------------|---------|
| timestamp                 | 请求时间戳   |
| nonce                     | 随机值     |
| country                   | 国家码(PK) |
| app_code                  | app编号   |


### 请求参数

| 字段            | 类型   | 必需  | 长度  | 描述                                     |
| --------------- | ------ |-----|-----|----------------------------------------|
| methodName | String | yes |   | 创建接口返回additionalInfo中availableChannels |
| accountNum     | String    | yes |  10   | 客户账号，通常为手机号，10位整数，且3开头                 |
| idCardNumber    | String    | yes | 13  | 客户身份证ID 13位整数                          |
| tradeNo          | String | yes |   | 平台订单号                              |
| sign            | String | yes |     | 签名                                     |

```json title="请求示例"
{
    "methodName": "jazzcash",
    "accountNum": "3234567891",
    "idCardNumber": "1234567890987",
    "tradeNo": "TS2405210001MX0000075312734955",
     "sign": "TeemoPay_SIGN"
}
```

### 返回参数

| 字段              | 类型      | 必需  | 长度  | 描述                                              |
|-----------------|---------|-----|-----|------------------------------------------------------|
| merchantOrderNo | String  | yes | 32  | 商户订单号                                             |
| amount          | String  | yes | 30  | 交易金额                                               |
| tradeNo         | String  | yes | 32  | 平台订单号                                             |
| status          | Int | yes | 2   | 订单状态 0-受理成功 1-订单创建成功  2-支付成功  3-失败 4-退款| 
| errorMsg        | String  | no  | 200 | 错误原因                                               |
#### 成功响应示例：
```json
{
  "merchantOrderNo" : "1234567890",
  "amount": "100.00",
  "tradeNo" : "TS2405210001MX0000075312734955",
  "status": 1,
  "errorMsg": ""
}
```

### 失败响应示例
```json
{
  "merchantOrderNo" : "1234567890",
  "amount": "100.00",
  "tradeNo" : "TS2405210001MX0000075312734955",
  "status": 3,
  "errorMsg": "error msg"
}
```