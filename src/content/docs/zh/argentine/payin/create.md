---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header参数  | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | AR     |
| app_code  | app编号  |

### 支付方式列表（paymentType）

| 支付方式名称    | PaymentType (入参参数) |
|-----------|--------------------|
| QR        | 901                |
| CVU       | 902                |
| CHECKOUT  | 903                |
| Rapipago  | 905                |
| Pagofacil | 906                |

### 请求参数

| 字段              | 类型      | 必需  | 最大长度 | 描述                                                                    |
|-----------------|---------|-----|------|-----------------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | 商户订单号                                                                 |
| paymentType     | Integer | yes |      | 支付方式 【901（QR）、902 （CVU）、903（CHECKOUT）、905 (RAPIPAGO)、906 (PAGOFACIL)】 |
| realName        | String  | yes | 64   | 用户姓名 【建议全大写】                                                          |
| email           | String  | no  | 50   | 用户邮箱 【满足正则表达式即可】                                                      |
| amount          | String  | yes | 20   | 代收金额 【比索:ARS】                                                         |
| idType          | String  | yes | 50   | 个人身份类型：DNI 、CUIT、CUIL  【推荐使用CUIT】                                     |
| idCardNumber    | String  | yes | 11   | 个人身份号：DNI （7位或8位数字）、CUIT（11位数字，首位必须是2或3）、CUIL（11位数字）                  |
| expirationTime  | Long    | no  |      | 过期时间 【最小一天,最长七天 毫秒级时间戳 eg:1735660800000】                              |
| phone           | String  | no  | 20   | 用户手机号 【10位数】                                                          |
| callbackUrl     | String  | no  | 200  | 代收回调地址 【若不传递，取商户后台配置的回调地址】                                            |
| sign            | String  | yes |      | 签名                                                                    |

```json title="请求示例"
{
  "realName": "TeemoPay",
  "merchantName": "MerchantNameExample",
  "amount": "1000",
  "idCardNumber": "1234567890123",
  "phone": "1234567890",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
  "email": "TeemoPay@example.com",
  "paymentType": 902,
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度 | 描述                                  |
|-----------------|------------|-----|----|-------------------------------------|
| merchantOrderNo | String     | yes | 32 | 商户订单号                               |
| tradeNo         | String     | yes | 32 | 平台订单号                               |
| amount          | String     | yes | 32 | 交易金额                                |
| paymentType     | Int        | yes | 10 | 支付方式 【901:QR】                       |
| paymentInfo     | String     | yes | 32 | 主要付款信息 【返回的是实际用于付款的信息，例如：付款编号，二维码串】 |
| additionalInfo  | JSONObject | no  |    | 附加信息 【辅助支付信息使用】                     |
| status          | Int        | yes |    | 订单状态 【1: 支付中  3: 支付失败】              |
| errorMsg        | String     | no  |    | 错误信息【支付失败时返回】                       |

### 响应示例

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2405220001AR0000430564883184",
    "additionalInfo": null,
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "paymentInfo": "K8xY3pQ7zW2dE9sR4fT1gH6jU8lM3nB5vC2xZ7qA9wS4eD1rF8tG3yH6uJ9iK2oL5pM8aN3bV7cX9dZ4
    eW1fY3gH6jK8lM2nP5qR7sT9uV2wX4yZ6aB8cD1eF3gH5jK7lM9nO2pQ4rS6tU8vW1xY3zA5bC7dE9fG2hJ4kL6mN8oP1qR3sT5uV7wX9yZ2aB4cD6eF8gH1jK3lM5nO7pQ9rS1tU3vW5xY7zA2bC4dE6fG8hJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5jK7
    ",
    "paymentType": 901,
    "status": 1
  }
}
```

### 校验异常码

| 异常码 | 异常信息                                                                | 处理方案                       |
|-----|---------------------------------------------------------------------|----------------------------|
| 412 | Please try again later                                              | 请稍后重试                      |
| 414 | *                                                                   | 更改对应参数                     |
| 423 | This payment method is not supported                                | 对应支付方式不支持，请查阅文档，如存在则联系我们配置 |
| 426 | merchant order duplicate                                            | 请更换商户订单号                   |
| 427 | The callback notification address for collection must not be empty. | 请配置代收回调地址                  |
| 443 | ID number must not be null                                          | 证件号不能为空                    |
| 466 | Payment method fee rate not configured.                             | 商户代收费率配置异常，请联系我们           |
| 473 | Merchant joint verification error: *                                | 商户配置异常，请联系我们               |
| 474 | The id card number must be 11 digits.                               | 证件号必须11位                   |
| 500 | Business Error                                                      | 请联系我们                      |

```json title=返回示例
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```

### 渠道错误信息

| errorMsg                                                             | 描述     |
|----------------------------------------------------------------------|--------|
| Transaction amount exceeds limit, kindly retry within allowed range. | 请求金额超限 |
| Channel request error, technicians will fix ASAP.                    | 渠道维护   |
| Unstable network, kindly retry later.                                | 渠道网络波动 |
| Parameter validation error, kindly verify and retry.                 | 参数上传有误 |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "amount": null,
    "tradeNo": "TS2405220001AR0000430564883184",
    "paymentType": 901,
    "paymentInfo": null,
    "additionalInfo": null,
    "status": 3,
    "errorMsg": "Transaction amount exceeds limit, kindly retry within allowed range."
  },
  "msg": "success",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```
