---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述  |
|---------------------------|---------|
| timestamp                 | 请求时间戳   |
| nonce                     | 随机值     |
| country                   | 国家码(MX) |
| app_code                  | app编号   |

### 请求参数

| 字段              | 类型   | 必需  | 长度  | 描述                   |
|-----------------| ------ |-----|-----|----------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                |
| amount          | String | yes | 20  | 代付金额(比索)             |
| bankCode        | String | yes | 50  | 银行编码                 |
| bankName        | String | yes | 50  | 银行名称                 |
| accountType     | Int    | yes |     | 账户类型 3-借记卡 40-CLABE  |
| bankAccount     | String | yes | 50  | 收款账号                 |
| realName        | String | yes | 40  | 客户姓名                 |
| IdCardNumber    | String | yes | 50  | 收款人 ID 号码            |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传, 则以商户配置为准 |
| sign            | String | yes |     | 签名                   |

```json title=请求示例
{
  "outTradeNo": "201806251011",
  "amount": "100",
  "bankCode": "646",
  "bankName": "STP",
  "accountType": 3,
  "bankAccount": "1234567890",
  "realName": "张三",
  "IdCardNumber": "1234567890",
  "callbackUrl": "https://merchant.com/api/payout/callback",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数            | 类型   | 必需 | 长度 | 描述                          |
| --------------- | ------ | ---- | ---- | ----------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                    |
| tradeNo         | String | yes  |      | 平台订单号                    |
| status          | Int | yes  |      | 1-支付中 3-失败(可以重新发起) |
| amount          | String | yes  |      | 交易金额                      |

```json title=返回示例
{
  "merchantOrderNo": "201806251011",
  "tradeNo": "TF201806251011",
  "status": 1,
  "sign": "TEEMO_SIGN"
}
```
