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
| country   | IN     |
| app_code  | app编号  |

### 支付方式列表（paymentType）

| 支付方式名称    | PaymentType (入参参数) |
|-----------|--------------------|
| 聚合页面   | 1001                |
| QR        | 1002                |
| PHONEPE   | 1003                |
| PAYTM     | 1004                |

### 过期时间

默认为10分钟过期

### 请求参数

| 字段              | 类型      | 必需  | 最大长度 | 描述                                                                   |
|-----------------|---------|-----|------|----------------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | 商户订单号                                                                |
| paymentType     | Integer | yes |      | 支付方式 【1001（聚合页面）、1002 （QR）、1003 (PHONEPE)、1004 (PAYTM)】 |
| realName        | String  | yes | 64   | 用户姓名 【建议全大写】                                                         |
| email           | String  | yes | 50   | 用户邮箱 【满足正则表达式即可】                                                     |
| amount          | String  | yes | 20   | 代收金额(建议整数) 【卢比:INR】                                                        |
| phone           | String  | yes | 20   | 用户手机号 【10位数,6,7,8,9开头】                                                         |
| callbackUrl     | String  | no  | 200  | 代收回调地址 【若不传递，取商户后台配置的回调地址】                                           |
| sign            | String  | yes |      | 签名                                                                   |

```json title="请求示例"
{
  "realName": "TeemoPay",
  "amount": "1000",
  "phone": "6234567890",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "OrderNoExample",
  "email": "TeemoPay@example.com",
  "paymentType": 1001,
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度 | 描述                                  |
|-----------------|------------|-----|----|-------------------------------------|
| merchantOrderNo | String     | yes | 32 | 商户订单号                               |
| tradeNo         | String     | yes | 32 | 平台订单号                               |
| amount          | String     | yes | 32 | 交易金额                                |
| paymentType     | Int        | yes | 10 | 支付方式 【1001（聚合页面）、1002 （QR）、1003 (PHONEPE)、1004 (PAYTM)】 |
| paymentInfo     | String     | yes | 32 | 主要付款信息 【返回的是实际用于付款的信息，例如：付款编号，二维码串】 |
| additionalInfo  | JSONObject | no  |    | 附加信息 【辅助支付信息使用】                     |
| status          | Int        | yes |    | 订单状态 【1: 支付中  3: 支付失败】              |
| errorMsg        | String     | no  |    | 错误信息【支付失败时返回】                       |

### 响应示例

#### 支付方式为1001的响应示例

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518954661212",
        "paymentType": 1001,
        "paymentInfo": "https://cashier.deviukpay.com/checkoutV3?orderId=PI202604081245327E6D587A9350619B&sign=FC4BF498CFF2D13AD06B4937FC8B0FA5",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.98.17756325326182591"
}
```

#### 支付方式为1002的响应示例

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518955279892",
        "paymentType": 1002,
        "paymentInfo": "https://cashier.deviukpay.com/checkoutV3?orderId=PI202604081246507CBDA2C4CDB913B4&sign=04AF43E5CDCA07AE97C0F58A451F422B",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.96.17756326099664863"
}
```

#### 支付方式为1003的响应示例

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518955487076",
        "paymentType": 1003,
        "paymentInfo": "phonepe://native?data=eyJjb250YWN0Ijp7ImNic05hbWUiOiIiLCJuaWNrTmFtZSI6IiIsInZwYSI6InRpd2FyaWJoYXJhdDc4OUBmcmVlY2hhcmdlIiwidHlwZSI6IlZQQSJ9LCJwMnBQYXltZW50Q2hlY2tvdXRQYXJhbXMiOnsibm90ZSI6IkRvIG5vdCBtb2RpZnkgdGhlIGFtb3VudCIsImlzQnlEZWZhdWx0S25vd25Db250YWN0Ijp0cnVlLCJlbmFibGVTcGVlY2hUb1RleHQiOmZhbHNlLCJhbGxvd0Ftb3VudEVkaXQiOmZhbHNlLCJzaG93UXJDb2RlT3B0aW9uIjpmYWxzZSwiZGlzYWJsZVZpZXdIaXN0b3J5Ijp0cnVlLCJzaG91bGRTaG93VW5zYXZlZENvbnRhY3RCYW5uZXIiOmZhbHNlLCJpc1JlY3VycmluZyI6ZmFsc2UsImNoZWNrb3V0VHlwZSI6IkRFRkFVTFQiLCJ0cmFuc2FjdGlvbkNvbnRleHQiOiJwMnAiLCJpbml0aWFsQW1vdW50Ijo5OTg2NC4wMCwiZGlzYWJsZU5vdGVzRWRpdCI6dHJ1ZSwic2hvd0tleWJvYXJkIjp0cnVlLCJjdXJyZW5jeSI6IklOUiIsInNob3VsZFNob3dNYXNrZWROdW1iZXIiOnRydWV9fQ==&id=p2ppayment",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.96.17756326358654891"
}
```

#### 支付方式为1004的响应示例

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000",
        "tradeNo": "TS2405220001IN0000518955617780",
        "paymentType": 1004,
        "paymentInfo": "paytmmp://cash_wallet?pa=tiwaribharat789@freecharge&pn=ashish&tr=000011&tn=00001&am=998.51&cu=INR&featuretype=money_transfer",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "e9c5ab38d4654d06a32d9549b399ed3d.95.17756326522018217"
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
    "merchantOrderNo": OrderNoExample,
    "amount": null,
    "tradeNo": "TS2405220001AR0000430564883184",
    "paymentType": 1001,
    "paymentInfo": null,
    "additionalInfo": null,
    "status": 3,
    "errorMsg": "Transaction amount exceeds limit, kindly retry within allowed range."
  },
  "msg": "success",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```
