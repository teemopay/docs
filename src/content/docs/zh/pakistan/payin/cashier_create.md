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

| 字段              | 类型     | 必需  | 长度    | 描述                                                       |
|-----------------|--------|-----|-------|----------------------------------------------------------|
| merchantOrderNo | String | yes | 32    | 商户订单号                                                    |
| paymentType     | Int    | no  |      | 支付方式，当前交易金额小于等于10w时,用于指定ep或jz.303:easypaisa,304:JazzCash |
| paymentTypeList     | String | no  |      | 可以传输多个支付方式以逗号隔开：301，303                                  |
| idCardNumber    | String | no  | 13    | 客户身份证ID 13位整数                                            |
| amount          | String | yes | 20    | 金额 正整数                                                   |
| phone           | String | no  | 10/11 | 手机号(3开头10位/03开头11位)                                      |
| email           | String | no  | 50    | 用户邮箱                                                     |
| callbackUrl     | String | no  | 200   | 回调地址                                                     |
| sign            | String | yes |       | 签名                                                       |

```json title=请求示例
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "callbackUrl": "https://www.callbackexample.com",
    "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数              | 类型     | 必需  | 长度 | 描述                                                      |
|-----------------|--------|-----| ---- |---------------------------------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                                                   |
| tradeNo         | String | yes |      | 平台订单号                                                   |
| amount          | String | yes |      | 订单交易金额                                                  |
| status          | Int    | yes |      | 代收状态,0:受理中 3-失败                                         |
| checkoutLink    | String | no  |      | 收银台地址                                                   |
| expirationTime  | String | no  |      | 收银台地址过期时间                                               |
| errorMsg        | String | no  |      | 错误信息,失败时返回                                              |

```json title=返回示例
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
    "code": 200,
    "data": {
        "amount": "1000.00",
        "tradeNo": "TS2501010001PK0000000000000000",
        "expirationTime": "2025-01-01 00:00:00",
        "checkoutLink": "https://pk-payin.teemopay.com/#/?tradeNo=TS2501010001PK0000000000000000",
        "merchantOrderNo": "OrderNoExample",
        "status": 0
    }
}
```