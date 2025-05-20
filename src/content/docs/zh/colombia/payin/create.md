---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
| ----------- | ----------- |
| timestamp   | 请求时间戳  |
| nonce       | 随机值      |
| country     | CO   |
| app_code    | app 编号    |

## 支持支付方式列表（paymentType）

| 支付方式名称                 | PaymentType |
|------------------------|-------------|
| PSE （网银支付 ACH）         | 201 |
 | WALLET (nequi) 支付链接    | 202 | 
| CHECKOUT (包含所有方式支付链接 ) | 204 | 
| EFECTY （线下）            | 205 | 

### 请求参数

| 字段            | 类型   | 必需  | 长度  | 描述                               |
| --------------- | ------ |-----|-----|----------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                            |
| paymentType     | Int    | yes |     | 支付方式,详见上方支付方式列表                  |
| amount          | String | yes | 20  | 代收金额,仅支持整数,比索                    |
| expirationTime  | Long   | no  |     | 过期时间                             |
| realName        | String | yes | 64  | 用户姓名                             |
| email           | String | yes | 50  | 用户邮箱：满足正则表达式即可                   |
| phone           | String | yes | 50  | 电话号码10位数,不包含区号                   |
| idCardNumber    | String | no  | 50  | 身份证号码: CC 10位数、CE 6-10位数、NIT 9位数 |
| sign            | String | yes |     | 签名                               |
| callbackUrl     | String | no  | 200 | 回调地址                             |

```json title="请求示例"
{
    "realName": "TeemoPay",
    "amount": "10000",
    "phone": "1234567890",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample",
    "email": "TeemoPay@example.com",
    "paymentType": 204,
    "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段            | 类型       | 必需 | 长度 | 描述                                                     |
| --------------- | ---------- | ---- | ---- | -------------------------------------------------------- |
| merchantOrderNo | String     | yes  | 32   | 商户订单号                                               |
| tradeNo         | String     | yes  | 32   | 平台订单号                                               |
| amount          | String     | yes  | 32   | 交易金额                                                 |
| paymentType     | Int        | yes  | 3    | 支付方式                                                 |
| paymentInfo     | String     | yes  | 32   | 主要付款信息，返回的是实际用于付款的信息，例如：付款编号 |
| additionalInfo  | JSONObject | no   |      | 扩展信息                                                 |
| status          | Int        | yes  |      | 代收状态, 1:成功 3:失败                                    |
| errorMsg        | String     | no   |      | 错误信息,失败时返回                                      |

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "10000",
    "tradeNo": "TS2501010001CO0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 204,
    "additionalInfo": {

    },
    "paymentInfo": "https://www.paymentLinkExample.com",
    "status": 1
  }
}
```

> errorMsg 说明：


| errorMsg                                | 说明    |
| ------------------------------------------- |-------|
| Transaction amount exceeds limit, kindly retry within allowed range. | 请求金额超限 |
| Channel request error, technicians will fix ASAP. | 渠道维护  |
| Unstable network, kindly retry later. |渠道网络波动|
| Parameter validation error, kindly verify and retry. | 参数上传有误|
|Abnormal user account , kindly contact user to verify account and retry.| 账户异常|