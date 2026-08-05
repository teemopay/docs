---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | KH     |
| app_code  | app 编号 |

### 支持支付方式列表（paymentType）

| 支付方式名称 | PaymentType |
|--------|-------------|
| KHQR   | 2001        |

### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述                    |
|-----------------|--------|-----|-----|-----------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                 |
| paymentType     | Int    | yes |     | 支付方式：2001-KHQR        |
| amount          | String | yes | 20  | 代收金额（瑞尔 KHR），仅支持整数    |
| realName        | String | yes | 64  | 付款人姓名，传用户真实姓与名        |
| email           | String | yes | 50  | 付款人邮箱，传用户真实邮箱，须满足邮箱格式 |
| phone           | String | yes | 50  | 电话号码：8-9 位，不含区号       |
| idCardNumber    | String | yes | 50  | 平台身份识别码，50 位以内，       |
| idType          | String | yes | 32  | 证件类型：NONE_KYC 、KYC         |
| sign            | String | yes |     | 签名                    |
| callbackUrl     | String | no  | 200 | 回调地址                  |

```json title=请求示例
{
  "merchantOrderNo": "OrderNoExample",
  "paymentType": 2001,
  "amount": "10000",
  "realName": "TeemoPay",
  "email": "TeemoPay@example.com",
  "phone": "12345678",
  "idCardNumber": "UserReferenceExample",
  "idType": "NONE_KYC",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度 | 描述                   |
|-----------------|------------|-----|----|----------------------|
| merchantOrderNo | String     | yes | 32 | 商户订单号                |
| tradeNo         | String     | yes |    | 平台订单号                |
| amount          | String     | yes |    | 交易金额                 |
| paymentType     | Int        | yes |    | 支付方式                 |
| paymentInfo     | String     | yes |    | 主要付款信息，上游返回的支付链接     |
| additionalInfo  | JSONObject | no  |    | 附加信息，包含辅助支付信息和原始二维码  |
| status          | Int        | yes |    | 订单状态：1-支付中 2-成功，3-失败 |
| errorMsg        | String     | no  |    | 错误信息，支付失败时返回         |

```json title=成功示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001KH0000000000000000",
    "amount": "10000.00",
    "paymentType": 2001,
    "paymentInfo": "https://www.paymentLinkExample.com",
    "additionalInfo": {},
    "status": 2,
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299"
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                        |
|-----|---------------------------------------------------------------------|-----------------------------|
| 412 | Please try again later                                              | 请稍后重试                       |
| 414 | *                                                                   | 更改对应参数                      |
| 423 | This payment method is not supported                                | 对应支付方式不支持，请查阅文档，如存在则请联系我们配置 |
| 426 | merchant order duplicate                                            | 请更换商户订单号                    |
| 427 | The callback notification address for collection must not be empty. | 请配置代收回调地址                   |
| 466 | Payment method fee rate not configured.                             | 商户代收费率配置异常，请联系我们            |
| 473 | Merchant joint verification error: *                                | 商户配置异常，请联系我们                |
| 500 | Business Error                                                      | 请联系我们                       |

```json title=返回示例
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
