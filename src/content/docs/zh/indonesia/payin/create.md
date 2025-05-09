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
| --------- |--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | ID |
| app_code  | app 编号 |

## 支持支付方式列表（paymentType）

| 支付方式名称      | PaymentType (入参参数)                    |
|-------------|---------------------------------------|
| PaymentLink | 501(收银台,包含所有可用的支付方式,E-Wallet,VA,QRIS) |
| E-Wallet | 502(收银台,包含电子钱包的支付方式,Dana等)            |
| VA | 503 (收银台,包含Va的支付方式,BNI等)              |
| QRIS | 504 (收银台,包含QRIS的支付方式)            |

## 支持支付方式扩展列表（channel）
| 支付方式 | channel                   |
|------|---------------------------|
| 503  | BRI,MANDIRI,CIMB |
| 502  | DANA,LINKAJA            |

- 仅当payment为502和503时channel字段有效

### 请求参数

| 字段              | 类型     | 必需  | 最大长度 | 描述                                        |
|-----------------| ------ |-----|------|-------------------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                                     |
| paymentType     | Int    | yes |      | 支付方式: 501,502,503,504                     |
| amount          | String | yes | 20   | 代收金额,印尼盾,整数                               |
| realName        | String | yes | 64   | 用户姓名                                      |
| email           | String | yes | 50   | 用户邮箱：满足正则表达式即可                            |
| phone           | String | yes | 13   | 电话号码 08开头,10~13位                          |
| channel         | String | no  |    | 支付方式扩展字段,当特定支付方式为502,503,详情请见【支持支付方式扩展列表】(20250506新增) |
| sign            | String | yes |      | 签名                                        |
| callbackUrl     | String | no  | 200  | 回调地址                                      |

```json
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "TeemoPay",
  "amount": "60000",
  "callbackUrl": "https://www.callbackexample.com",
  "paymentType": 502,
  "email": "TeemoPay@example.com",
  "channel": "DANA",
  "phone": "0800000000",
  "sign": "YOUR_SIGN"
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
| status          | Int        | yes |     | 1-订单创建成功 3-失败               |
| errorMsg        | String     | no  |     | 错误信息,失败时返回                   |

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "60000.00",
    "tradeNo": "TS2501010001ID0000000000000000",
    "additionalInfo": {

    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "paymentType": 502,
    "status": 1
  }
}
```
