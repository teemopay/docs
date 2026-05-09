---
title: 收银台创建
description: 商户创建收银台
---

### 请求地址

| method | url                          |
|--------|------------------------------|
| POST   | /api/checkout/payment/create |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | CO     |
| app_code  | app编号  |

## 支付方式列表（paymentType）

| 支付方式名称     | PaymentType |
|------------|-------------|
| PSE        | 201         |
| NEQUI_PUSH | 213         |
| EFECTY     | 205         |
| BREB       | 212         |
| DAVIPLATA  | 206         |
| MOVI       | 207         |

### 请求参数

| 字段              | 类型     | 必需 | 长度  | 描述                                                                  |
|-----------------|--------|----|-----|---------------------------------------------------------------------|
| merchantOrderNo | String | 是  | 32  | 商户订单号                                                               |
| paymentType     | Int    | 否  |     | 支付方式，详见上方支付方式列表。不传输则返回配置的支付方式                                       |
| amount          | String | 是  | 20  | 金额                                                                  |
| expirationTime  | String | 否  |     | 页面过期时间 【最小一天,最长七天 毫秒级时间戳 eg:1735660800000】                          |
| idType          | String | 否  | 32  | 如果传输会携带到页面上；身份证类型: CC(6-10位数;身份证)、CE(6-10位数)、NIT(9位数;税号)、PA(9位数;护照) |
| idCardNumber    | String | 否  | 50  | 如果传输会携带到页面上；身份证号码: CC 10位数、CE 6-10位数、NIT 9位数、PA 数字加字母               |
| realName        | String | 否  | 64  | 如果传输会携带到页面上；用户姓名                                                    |
| phone           | String | 否  | 50  | 如果传输会携带到页面上；10位数字以3开头；如果是钱包支付则传输钱包账号                                |
| email           | String | 否  | 50  | 如果传输会携带到页面上；付款人邮箱; 务必符合正则表达式                                        |
| remark          | String | 否  |     | 如果传输会携带到页面上；订单备注                                                    |
| bankCode        | String | 否  |     | 如果传输会携带到页面上；付款银行（当PSE 时需要参考代收银行列表）                                  |
| callbackUrl     | String | 否  | 200 | 回调地址（若不传递，取商户后台配置的回调地址）                                             |
| sign            | String | 是  |     | 签名                                                                  |

```json title=请求示例
{
  "merchantOrderNo": "example",
  "paymentType": 201,
  "idType": "CE",
  "idCardNumber": "example",
  "realName": "",
  "phone": "3231example2111",
  "email": "123example@123.com",
  "bankCode": 1815,
  "amount": "100",
  "sign": "example"
}
```

### 返回参数

| 参数              | 类型     | 必需 | 长度 | 描述              |
|-----------------|--------|----|----|-----------------|
| merchantOrderNo | String | 是  | 32 | 商户订单号           |
| tradeNo         | String | 是  |    | 平台订单号           |
| amount          | String | 是  |    | 订单交易金额          |
| status          | Int    | 是  |    | 代收状态,0:受理中 3-失败 |
| checkoutLink    | String | 是  |    | 收银台地址           |
| expirationTime  | String | 是  |    | 收银台地址过期时间       |
| errorMsg        | String | 否  |    | 错误信息,失败时返回      |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "ceshi-test",
    "tradeNo": "TS2509080002COexample754",
    "amount": "100",
    "status": 0,
    "checkoutLink": "https://test-co-payin.teemopay.com/#/?tradeNo=TS2509080002COexample754",
    "expirationTime": "2025-09-17 13:53:45.959",
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "1e7142b1c2cf47479ccfdbb1ecba5242.94.17579264259380029"
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                  |
|-----|---------------------------------------------------------------------|-----------------------|
| 412 | Please try again later                                              | 请稍后重试                 |
| 414 | *                                                                   | 更改对应参数                |
| 416 | Application not found                                               | app_code异常，请更改        |
| 424 | This payment method is not configured                               | 代收方式未配置，请联系我们配置对应代收方式 |
| 426 | merchant order duplicate                                            | 请更换商户订单号              |
| 427 | The callback notification address for collection must not be empty. | 未配置代收回调地址，请配置代收回调地址   |
| 445 | Amount must be an integer                                           | 金额必须为整数               |
| 460 | The current payment method is unavailable.                          | 当前代收方式不可用，请更换         |
| 473 | Merchant joint verification error: *                                | 配置异常，请联系我们            |
| 500 | Business Error                                                      | 请联系我们                 |

```json title=错误返回示例
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
