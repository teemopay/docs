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
| country                   | 国家码(PK) |
| app_code                  | app编号   |

### 请求参数

| 字段              | 类型   | 必需  | 最大长度 | 描述                              |
|-----------------| ------ |-----|------|---------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                           |
| amount          | String | yes | 20   | 代付金额 巴基斯坦卢比 需传整数                |
| bankCode        | String | yes | 50   | 银行编码  301取bankCode，302时取WalletCode |
| bankName        | String | yes | 50   | 银行名称 与银行编码字段相同                  |
| accountType     | int    | yes |      | 账户类型 301(BANK) 302(E-Wallet)    |
| bankAccount     | String | yes | 255  | 银行/钱包账户                         |
| realName        | String | yes | 255  | 客户姓名                            |
| idCardNumber    | String | yes | 13   | 证件号   13位数字                     |
| idType          | Stirng | yes | 32   | 固定传CERT                         |
| phone           | Stirng | yes | 10   | 用户电话  10位数字                     |
| email           | Stirng | no  | 64   | 用户邮箱                            |
| userIBAN        | Stirng | no  | 64   | 国际银行账号                          |
| callbackUrl     | String | no  | 200  | 代付回调地址，若不传, 则以商户配置为准            |
| sign            | String | yes |      | 签名                              |

```json title=请求示例
{
    "merchantOrderNo": "TEST1234567890",
    "amount": "1000.00",
    "bankCode": "ALBARAKA_ISLAMIC_BANK",
    "bankName": "ALBARAKA_ISLAMIC_BANK",
    "accountType": "301",
    "bankAccount": "1234567890",
    "realName": "TEST",
    "idCardNumber": "1234567890123",
    "idType": "CERT",
    "email": "test@gmail.com",
    "callbackUrl": "https://www.teemopay.com",
    "phone": "1234567890",
    "sign": "MERCHANT_SIGN"
}
```

### 返回参数

| 参数            | 类型   | 必需 | 长度 | 描述                          |
| --------------- | ------ | ---- | ---- | ----------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                    |
| tradeNo         | String | yes  |      | 平台订单号                    |
| status          | String | yes  |      | 1-支付中 3-失败(可以重新发起) |
| amount          | String | yes  |      | 交易金额                      |

```json title=返回示例
{
    "code": 200,
    "data": {
        "merchantOrderNo": "TEST1234567890",
        "tradeNo": "TF0000000000PK0000000000000000",
        "amount": "1000.00",
        "status": 1
    },
    "msg": "success",
    "success": true
}
```
