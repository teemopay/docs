---
title: 创建收银台
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

| 字段              | 类型   | 必需  | 长度    | 描述                  |
|-----------------| ------ |-----|-------|---------------------|
| merchantOrderNo | String | yes | 32    | 商户订单号               |
| idCardNumber    | String | no  | 13    | 客户身份证ID 13位整数       |
| amount          | String | yes | 20    | 金额 正整数              |
| phone           | String | no  | 10/11 | 手机号(3开头10位/03开头11位) |
| email           | String | no  | 50    | 用户邮箱                |
| callbackUrl     | String | no  | 200   | 回调地址                |
| sign            | String | yes |       | 签名                  |

```json title=请求示例
{
  "merchantOrderNo": "QQ00022mmjzo7g3s000369",
  "idCardNumber": "1234567890124",
  "amount": "200.00",
  "phone": "3234567890",
  "email": "1015922891@qq.com",
  "callbackUrl": "http://localhost/sys/dictionary/test/api/user/public/teemopay/payment/callback/78f04feca0c5581628508b156d364fc0",
  "sign": "123456"
}
```

### 返回参数

| 参数              | 类型   | 必需  | 长度 | 描述                  |
|-----------------| ------ |-----| ---- |---------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号               |
| tradeNo         | String | yes |      | 平台订单号               |
| amount          | String | yes |      | 订单交易金额              |
| status          | Int | yes |      | 0-受理 3-失败           |
| checkoutLink    | String | no  |      | 收银台地址               |
| expirationTime  | String | no  |      | 收银台地址过期时间           |
| errorMsg        | String | no  |      | 错误信息,失败时返回          |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "MC2451ct4yq5md7g5l4g6dwriaa757mC",
    "tradeNo": "TS2405210001MX0000142911043800",
    "amount": "200.00",
    "status": 0,
    "checkoutLink": "https://dev-cashier.teemopay.com/#/?tradeNo=TS2405210001MX0000142911043800",
    "expirationTime": "2024-10-13 00:11:20",
    "errorMsg": null
  },
  "msg": "成功",
  "traceId": ""
}
```