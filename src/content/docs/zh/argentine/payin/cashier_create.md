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
| country   | AR     |
| app_code  | app编号  |

### 请求参数

| 字段              | 类型     | 必需 | 长度  | 描述                                                                                  |
|-----------------|--------|----|-----|-------------------------------------------------------------------------------------|
| merchantOrderNo | String | 是  | 32  | 商户订单号                                                                               |
| paymentType     | Int    | 否  |     | 不传输则返回配置的支付方式；支付方式 【901（QR）、902 （CVU）、903（CHECKOUT）、905 (Rapipago)、906 (Pagofacil)】 |
| amount          | String | 是  | 20  | 金额                                                                                  |
| expirationTime  | String | 否  | 20  | 过期时间、毫秒级时间戳 eg:1735660800000 【默认一天，最小10分钟,最长七天 】                                    |
| idType          | String | 是  | 50  | 个人身份类型：DNI 、CUIT、CUIL  【推荐使用CUIT】                                                   |
| idCardNumber    | String | 是  | 11  | 个人身份号：DNI （7位或8位数字）、CUIT（11位数字，首位必须是2或3）、CUIL（11位数字）                                |
| phone           | String | 否  | 10  | 10位数字不加区号                                                                           |
| email           | String | 否  | 50  | 付款人邮箱; 务必符合正则表达式                                                                    |
| realName        | String | 是  | 50  | 付款人名字,建议全字母大写                                                                       |
| callbackUrl     | String | 否  | 200 | 代收回调地址 （若不传递，取商户后台配置的回调地址）                                                          |
| remark          | String | 否  | 200 | 备注信息                                                                                |
| sign            | String | 是  |     | 签名                                                                                  |

```json title=请求示例
{
  "merchantOrderNo": "ceshi-test",
  "paymentType": 901,
  "amount": "1000",
  "expirationTime": "1765943486000",
  "idType": "CUIT",
  "idCardNumber": "31231233434",  // 虚构仅作为演示
  "phone": "3111111111",
  "email": "213@123.com",
  "realName": "张三",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数              | 类型     | 必需 | 长度 | 描述              |
|-----------------|--------|----|----|-----------------|
| merchantOrderNo | String | 是  | 32 | 商户订单号           |
| tradeNo         | String | 是  |    | 平台订单号           |
| amount          | String | 是  |    | 订单交易金额          |
| status          | Int    | 是  |    | 代收状态,0:受理中 3-失败 |
| checkoutLink    | String | 是  |    | 主要付款信息，返回付款链接   |
| expirationTime  | String | 是  |    | 收银台地址过期时间       |
| errorMsg        | String | no |    | 错误信息,失败时返回      |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "ceshi-test",
    "tradeNo": "TS2509080002ARexample754",
    "amount": "100",
    "status": 0,
    "checkoutLink": "https://test-ar-payin.teemopay.com/#/?tradeNo=TS2509080002ARexample754",
    "expirationTime": "2025-09-17 13:53:45.959",
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "1e7142b1c2cf47479ccfdbb1ecba5242.94.17579264259380029"
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                                           |
|-----|---------------------------------------------------------------------|------------------------------------------------|
| 412 | Please try again later                                              | 请稍后重试                                          |
| 414 | *                                                                   | 更改对应参数                                         |
| 416 | Application not found                                               | app_code异常，请更改                                 |
| 424 | This payment method is not configured                               | 代收方式未配置，请联系我们配置对应代收方式                          |
| 426 | merchant order duplicate                                            | 请更换商户订单号                                       |
| 427 | The callback notification address for collection must not be empty. | 未配置代收回调地址，请配置代收回调地址                            |
| 438 | Phone number is error                                               | 请检查并更改手机号                                      |
| 460 | The current payment method is unavailable.                          | 当前代收方式不可用，请更换                                  |
| 473 | Merchant joint verification error: *                                | 配置异常，请联系我们                                     |
| 478 | Invalid format for expireTime                                | 使用UTC时间戳                                       |
| 479 | The id type is error (Example: DNI, CUIT, CUIL. It is recommended to use CUIT.)                                 | 使用（DNI 、CUIT、CUIL）其中一个,【推荐使用CUIT】              |
| 480 | ID card number error (DNI: must be 7–8 digits in length; CUIL: must be 11 digits in length; CUIT: must be 11 digits in length, with the first digit restricted to 2 or 3)                                | DNI （7位或8位数字）、CUIT（11位数字，首位必须是2或3）、CUIL（11位数字） |

| 500 | Business Error                                                      | 请联系我们                 |

```json title=返回示例
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```