---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country                   | BP     |
| app_code                  | app编号  |


### 请求参数

| 字段              | 类型   | 必需  | 最大长度 | 描述                                                |
|-----------------| ------ |-----|------|---------------------------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                                             |
| amount          | String | yes | 20   | 代收金额                                      |
| callbackUrl     | String | no  | 200  | 代付回调地址，若不传, 则以商户配置为准                              |
| sign            | String | yes |      | 签名                                                |


```json title="请求示例"
{
    "amount": "1000",
    "sign": "YOUR_SIGN",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample",
}
```

### 返回参数

| 字段            | 类型       | 必需  | 长度 | 描述                           |
| --------------- | ---------- |-----| ---- |------------------------------|
| merchantOrderNo | String     | yes | 32   | 商户订单号                        |
| tradeNo         | String     | yes | 32   | 平台订单号                        |
| amount          | String     | yes | 32   | 交易金额                         |
| paymentType     | Int        | yes | 10   | 支付方式 10001                   |
| paymentInfo     | String     | yes | 32   | 主要付款信息，返回的是实际用于付款的信息，例如：支付链接 |
| additionalInfo  | JSONObject | no  |      | 附加信息：地址及币种信息                 |
| status          | Int        | yes |    | 1-订单创建成功  3-失败               |
| errorMsg        | String     | no  |    | 错误信息,失败时返回                   |


### 响应示例
```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001BP0000000000000000",
    "additionalInfo": {
      "addresses": [
        {
          "coin": "usdt_trc20",
          "address": "TAX9SYsqbedDyeR6ysS9spx8cXQNC8raR3"
        }
      ]
    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "https://www.linkExample.com",
    "paymentType": 1,
    "status": 1
  }
}
```

```
