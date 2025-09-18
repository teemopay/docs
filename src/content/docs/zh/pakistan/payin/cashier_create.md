---
title: 收银台创建
description: 商户创建收银台
---

### 请求地址

| method | url                          |
| ------ |------------------------------|
| POST   | /api/checkout/payment/create |

### 头部信息（header）

| header 参数   | 入参参数描述  |
|-------------|---------|
| timestamp   | 请求时间戳   |
| nonce       | 随机值     |
| country     | PK  |
| app_code    | app编号   |

### 请求参数

| 字段              | 类型     | 必需  | 长度    | 描述                            |
|-----------------|--------|-----|-------|-------------------------------|
| merchantOrderNo | String | 是   | 32    | 商户订单号                         |
| paymentType     | Int    | 否   |      | 支付方式 （303:easypaisa, 304:JazzCash) |
| paymentTypeList     | String | 否   |      | 可以传输多个支付方式以逗号隔开：303，304       |
| idCardNumber    | String | 否   | 13    | 客户身份证ID （非必填，如若填写，需要保证13位纯数字） |
| amount          | String | 是   | 20    | 金额 正整数                        |
| phone           | String | 否   | 10/11 | 手机号(3开头10位/03开头11位)           |
| email           | String | 否   | 50    | 用户邮箱                          |
| callbackUrl     | String | 否   | 200   | 代收回调地址  （若不传递，取商户后台配置的回调地址）   |
| sign            | String | 是 |       | 签名                            |

```json title=请求示例
{
  "merchantOrderNo": "ceshi-test",
  "paymentType" : 303,
  "amount": 100,
  "phone": "3111111111",
  "email" : "213@123.com",
  "callbackUrl": "https://www.callbackexample.com",
  "sign" : "YOUR_SIGN"
}
```

### 返回参数

| 参数              | 类型     | 必需 | 长度 | 描述                                                      |
|-----------------|--------|----| ---- |---------------------------------------------------------|
| merchantOrderNo | String | 是  | 32   | 商户订单号                                                   |
| tradeNo         | String | 是  |      | 平台订单号                                                   |
| amount          | String | 是  |      | 订单交易金额                                                  |
| status          | Int    | 是  |      | 代收状态,0:受理中 3-失败                                         |
| checkoutLink    | String | 是  |      | 收银台地址                                                   |
| expirationTime  | String | 是  |      | 收银台地址过期时间                                               |
| errorMsg        | String | no |      | 错误信息,失败时返回                                              |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "ceshi-test",
    "tradeNo": "TS2509080002PKexample754",
    "amount": "100",
    "status": 0,
    "checkoutLink": "https://test-pk-payin.teemopay.com/#/?tradeNo=TS2509080002PKexample754",
    "expirationTime": "2025-09-17 13:53:45.959",
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "1e7142b1c2cf47479ccfdbb1ecba5242.94.17579264259380029"
}
```