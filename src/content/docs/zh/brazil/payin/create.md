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
| --------- | ------ |
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | BR |
| app_code  | app 编号 |

## 支持支付方式列表（paymentType）

| 支付方式名称      | PaymentType (入参参数) |
| ----------- | ------------------ |
| PIX(线上银行转账) | 401                |


### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述                  |
| --------------- | ------ | --- | --- |---------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号               |
| paymentType     | Int    | yes |     | 支付方式: 401-PIX       |
| amount          | String | yes | 20  | 代收金额(雷亚尔),小数点不能超过2位 |
| expirationTime  | Long   | no  |     | 过期时间,毫秒级时间戳 eg:1735660800000；默认5分钟有效期     |
| realName        | String | no  | 64  | 用户姓名               |
| email           | String | no  | 50  | 用户邮箱                 |
| phone           | String | no  | 50  | 电话号码                |
| idCardNumber    | String | no  | 50  | 身份证号码               |
| sign            | String | yes |     | 签名                  |
| callbackUrl     | String | no  | 200 | 回调地址                |

```json
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "aaaaaa",
  "amount": "100.1",
  "callbackUrl": "http://test.domin.com",
  "paymentType": 401,
  "email": "1QWWQWQ2891@qq.com",
  "phone": "12345678901",
  "idCardNumber": "12345678901",
  "sign": "YOUR SIGN",
  "expirationTime": 1735660800000
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度  | 描述                           |
| --------------- | ---------- | --- | --- | ---------------------------- |
| merchantOrderNo | String     | yes | 32  | 商户订单号                        |
| tradeNo         | String     | yes | 32  | 平台订单号                        |
| amount          | String     | yes | 32  | 交易金额                         |
| paymentType     | Int        | yes | 3   | 支付方式                         |
| paymentInfo     | String     | yes | 32  | 主要付款信息，返回的是实际用于付款的信息，例如：付款编号 |
| additionalInfo  | JSONObject | no  |     | 扩展信息                         |
| -- paymentLink       | String | no  |   | 付款链接信息                                     |
| status          | Int        | yes |     | 代收状态, 1:成功 3:失败                |
| errorMsg        | String     | no  |     | 错误信息,失败时返回                   |

### additionalInfo （附加字段）字段说明

| 字段名         | 类型      | 必填    | 说明              |
| ---           | ---      | ----   | ---               |
| paymentLink   | String   | N      | 扩展的付款链接信息   |

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "100.1",
        "tradeNo": "TS2405220001BR0000509313375376",
        "paymentType": 401,
        "paymentInfo": "00020126920014br.gov.bcb.xxx.xxx.coop.br",
        "additionalInfo": {
            "paymentLink": "https://payment.com?param=UcSvtzUHep6OyVnMyS7iAbDGLpPhrzsmWm2b7-WkLnVwOtKZ1W2iI6u73CL3cHAF"
        },
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "2e0e38e3e9a24b60b4f57c6d2ced196a.116.17744273719018419"
}
```

### 错误码
| 异常码       | 异常信息                                                                 | 处理方案                                               |
|--------------|--------------------------------------------------------------------------|--------------------------------------------------------|
| 412          | Please try again later                                                   | 请稍后重试                                             |
| 414          | *                                                                        | 更改对应参数                                           |
| 423          | This payment method is not supported                                     | 对应支付方式不支持，请查阅文档，如存在则联系我们配置        |
| 426          | merchant order duplicate                                                 | 请更换商户订单号                                       |
| 427          | The callback notification address for collection must not be empty.       | 请配置代收回调地址                                     |
| 466          | Payment method fee rate not configured.                                  | 商户代收费率配置异常，请联系我们                          |
| 473          | Merchant joint verification error: *                                      | 商户配置异常，请联系我们                               |
| 476          | The id card number is error                                              | 证件号格式异常                                            |
| 485          | The email format is invalid                                              | 邮箱格式异常，请更换邮箱                                 |
| 486          | The phone format is invalid                                              | 手机号格式异常，请更换邮箱                               |
| 500          | Business Error                                                           | 请联系我们                                             |

```json title=返回示例
{
    "code": 426,
    "data": null,
    "msg": "merchant order duplicate",
    "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```
