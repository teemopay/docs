---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | KH     |
| app_code  | app 编号 |

### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述                             |
|-----------------|--------|-----|-----|--------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                          |
| amount          | String | yes | 20  | 代付金额（瑞尔 KHR），仅支持整数             |
| bankCode        | String | yes | 50  | 银行编码                           |
| bankName        | String | yes | 50  | 银行名称                           |
| accountType     | Int    | yes |     | 代付方式：2002-BankTransfer（BAKONG） |
| bankAccount     | String | yes | 50  | 收款账号: 传输账户对应的信息，50 位以内         |
| realName        | String | yes | 255 | 用户姓名                           |
| phone           | String | yes | 50  | 电话号码: 8-9 位，不含区号               |
| email           | String | yes | 64  | 邮箱                             |
| idCardNumber    | String | yes | 50  | 用户在平台的身份标识码                    |
| idType          | String | yes | 32  | 证件类型：NONE_KYC 、KYC             |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传，则以商户配置为准            |
| sign            | String | yes |     | 签名                             |

```json title=请求示例
{
  "merchantOrderNo": "OrderNoExample",
  "amount": "10000",
  "bankCode": "BankCodeExample",
  "bankName": "BankNameExample",
  "accountType": 2002,
  "bankAccount": "BankAccountExample",
  "realName": "TeemoPay",
  "phone": "12345678",
  "email": "TeemoPay@example.com",
  "idCardNumber": "UserReferenceExample",
  "idType": "NONE_KYC",
  "callbackUrl": "https://www.callbackexample.com",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数              | 类型     | 必需  | 长度 | 描述                   |
|-----------------|--------|-----|----|----------------------|
| merchantOrderNo | String | yes | 32 | 商户订单号                |
| tradeNo         | String | yes |    | 平台订单号                |
| status          | Int    | yes |    | 代付状态：1-支付中 2-成功，3-失败 |
| amount          | String | yes |    | 交易金额                 |

```json title=成功示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2509080002KH00006005824Example",
    "amount": "10000",
    "status": 1
  },
  "msg": "success",
  "traceId": "b6182161c5124d7bb18a132b3b5eab9e.88.17858360003880005"
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                  |
|-----|---------------------------------------------------------------------|-----------------------|
| 412 | Please try again later                                              | 请稍后重试                 |
| 414 | *                                                                   | 更改对应参数                |
| 417 | Merchant account not found                                          | 商户账户未找到，请联系我们         |
| 425 | Insufficient merchant balance                                       | 商户账户余额不足              |
| 426 | merchant order duplicate                                            | 请更换商户订单号              |
| 427 | The callback notification address for collection must not be empty. | 未配置代付回调地址，请配置代付回调地址   |
| 432 | *                                                                   | 账户、银行和支付方式匹配异常，请检查并更改 |
| 455 | The account type error.                                             | 账户类型异常，请检查并更改         |
| 462 | This request failed due to blacklist blocking                       | 进入黑名单，请更改参数后重新发起      |
| 473 | Merchant joint verification error: *                                | 商户配置异常，请联系我们          |
| 475 | The id card type is error                                           | 证件类型异常，请检查并更改         |
| 476 | The id card number is error                                         | 证件号异常，请检查并更改          |
| 500 | Business Error                                                      | 请联系我们                 |

```json title=返回示例
{
  "code": 425,
  "data": null,
  "msg": "Insufficient merchant balance",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
