---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|---|---|
| timestamp | 请求时间戳 |
| nonce | 随机值 |
| country | VN |
| appCode | app 编号 |

## 支持账户类型列表（accountType）

| AccountType | 账户类型名称 |
|---:|---|
| 2101 | BANK |
| 2102 | Wallet |

### 请求参数

| 字段 | 类型 | 必需 | 长度 | 描述 |
|---|---|---|---:|---|
| merchantOrderNo | String | yes | 32 | 商户订单号 |
| accountType | Int | yes | | 账户类型，详见[账户类型列表](#支持账户类型列表accounttype) |
| amount | String | yes | 20 | 代付金额；(越南盾)VND,支持整数 |
| bankCode | String | yes | 50 | 银行编码；参考[银行列表](/zh/vietnam/payout/bank) |
| bankName | String | yes | 50 | 银行名称；参考[银行列表](/zh/vietnam/payout/bank) |
| bankAccount | String | yes | 32 | 收款账号：传输用户真实收款账号信息 |
| realName | String | yes | 255 | 用户姓名：传用户的真实姓与名 |
| idCardNumber | String | yes | 32 | 证件号码 |
| idType | Stirng | yes | 32 | 证件类型：BRBANK |
| sign | String | yes | | 签名 |
| email | String | yes | 50 | 收款人邮箱，传用户的真实邮箱 |
| phone | String | yes | 50 | 电话号码：以0开头的10位数字 |
| callbackUrl | String | no | 200 | 回调地址 |

```json title=请求示例
{
  "merchantOrderNo": "PayoutOrderExample",
  "accountType": 2101,
  "amount": "30000",
  "bankCode": "1001",
  "bankName": "ABBANK",
  "bankAccount": "0123456789",
  "realName": "Nguyen Van A",
  "idCardNumber": "001234567890",
  "idType": "BRBANK",
  "sign": "YOUR_SIGN",
  "email": "user@example.com",
  "phone": "0900000000",
  "callbackUrl": "https://www.callbackexample.com"
}
```

### 返回参数

| 参数 | 类型 | 必需 | 长度 | 描述 |
|---|---|---|---|---|
| merchantOrderNo | String | yes | 32 | 商户订单号 |
| tradeNo | String | yes | | 平台订单号 |
| amount | String | yes | | 交易金额 |
| status | Int | yes | | 代付状态,1:支付中 3:已失败 |
| errorCode | number | yes | | 订单失败状态错误码 |
| errorMessage | String | yes | | 订单失败错误信息，详见下方说明 |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "PayoutOrderExample",
    "tradeNo": "TF2501010001VN0000000000000000",
    "amount": "30000",
    "status": 1,
    "errorCode": null,
    "errorMessage": null
  },
  "msg": "success"
}
```
