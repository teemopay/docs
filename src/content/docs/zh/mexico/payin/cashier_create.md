---
title: 收银台创建
description: 商户创建收银台
---

### 请求地址

| method | url                          |
| ------ |------------------------------|
| POST   | /api/checkout/payment/create |

### 头部信息（header）

| header 参数   | 入参参数描述 |
|-------------|--------|
| timestamp   | 请求时间戳  |
| nonce       | 随机值    |
| country     | MX     |
| app_code    | app编号  |

### 请求参数

| 字段              | 类型   | 必需  | 长度  | 描述                                                                                |
|-----------------| ------ |-----|-----|-----------------------------------------------------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                                                                             |
| paymentType     | Int    | no  |     | 支付方式，支付方式: 1:VA 4:PayCashOnce 5:PayCashRecurrent 6:OXXO                           |
| expirationTime  | String | no  |     | 按默认是一天；最短时间为10分钟最长为20天；Xm：分钟（如 90m 表示 90 分钟）,Xh：小时（如 2h 表示 2 小时）,Xd：天数（如 5d 表示 5 天） |
| amount          | String | yes | 20  | 金额                                                                                |
| realName        | String | yes | 50  | 名字 ,全大写                                                                           |
| phone           | String | no  | 10  | 手机号                                                                               |
| email           | String | no  | 50  | 用户邮箱                                                                              |
| callbackUrl     | String | no  | 200 | 回调地址                                                                              |
| sign            | String | yes |     | 签名                                                                                |

```json title=请求示例
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "callbackUrl": "https://www.callbackexample.com",
    "realName":"TeemoPay",
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
        "tradeNo": "TS2501010001MX0000000000000000",
        "expirationTime": "2025-01-01 00:00:00",
        "checkoutLink": "https://mx-payin.teemopay.com/#/?tradeNo=TS2501010001MX0000000000000000",
        "merchantOrderNo": "OrderNoExample",
        "status": 0
    }
}
```