---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### 请求参数

| 字段            | 类型   | 必需 | 长度 | 描述                                   |
| --------------- | ------ | ---- | ---- | -------------------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                             |
| amount          | String | yes  |      | 代付金额(比索)                         |
| bankCode        | String | yes  |      | 银行编码                               |
| bankName        | String | yes  |      | 银行名称                               |
| accountType     | int    | yes  |      | 账户类型 3-借记卡 30-CLABE             |
| bankAccount     | String | yes  |      | 收款账号                               |
| realName        | String | yes  |      | 客户姓名                               |
| IdCardNumber    | String | yes  |      | 收款人 ID 号码                         |
| email           | String | yes  |      | 收款人邮箱                             |
| callbackUrl     | String | no   |      | 代付回调地址，若不传, 则以商户配置为准 |
| remark          | String | no   |      | 订单备注                               |
| sign            | String | yes  |      | 签名                                   |

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
  "email": "zhangsa@gmail.com",
  "callbackUrl": "https://merchant.com/api/payout/callback",
  "remark": "代付备注",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数            | 类型   | 必需 | 长度 | 描述                          |
| --------------- | ------ | ---- | ---- | ----------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                    |
| tradeNo         | String | yes  |      | 平台订单号                    |
| status          | String | yes  |      | 1-支付中 3-失败(可以重新发起) |
| sign            | String | yes  |      | 签名                          |

```json title=返回示例
{
  "merchantOrderNo": "201806251011",
  "tradeNo": "TF201806251011",
  "status": "1",
  "sign": "TEEMO_SIGN"
}
```
