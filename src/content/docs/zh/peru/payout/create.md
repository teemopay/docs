---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country                   | PE |
| app_code                  | app编号  |

### 请求参数

| 字段              | 类型   | 必需  | 长度  | 描述                                                        |
|-----------------| ------ |-----|-----|-----------------------------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                                                     |
| amount          | String | yes | 20  | 代付金额(索尔)                                                  |
| phone           | String | no  | 9   | 9开头 9位数字                                                  |
| bankCode        | String | yes | 50  | 银行编码                                                      |
| bankName        | String | yes | 50  | 银行名称                                                      |
| accountType     | Int    | yes |     | 账户类型, AHORRO:101(储蓄) CORRIENTE:102(活期)                    |
| bankAccount     | String | yes | 50  | 收款账号                                                      |
| cciNumber       | String | yes | 50  | 20位纯数字 跨行转账账号：2025年5月25号之后必传输                             |
| realName        | String | yes | 50  | 用户姓名 不包含特殊字符，建议全大写                                        |
| idCardNumber    | String | yes | 50  | 收款人证件号码                                                   |
| idType          | Stirng | yes | 32  | 证件类型,身份证:DNI(8位数),税号:RUC(11位数),外国人身份证:CE(9位数）, 护照:PA(9位数） |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传, 则以商户配置为准                                      |
| sign            | String | yes |     | 签名                                                        |

```json title=请求示例
{
    "bankAccount": "1234567899276",
    "bankCode": "2",
    "bankName": "INTERBANK",
    "realName": "TEEMO",
    "amount": "100.00",
    "idType": "DNI",
    "phone": "123456789",
    "cciNumber": "12345678901203910293",
    "accountType": "101",
    "idCardNumber": "12345678",
    "sign": "YOUR_SIGN",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample"
}

```

### 返回参数

| 参数            | 类型   | 必需 | 长度 | 描述                          |
| --------------- | ------ | ---- | ---- | ----------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                    |
| tradeNo         | String | yes  |      | 平台订单号                    |
| status          | Int | yes  |      | 代付状态,1:支付中 3:失败(可以重新发起) |
| amount          | String | yes  |      | 交易金额                      |

```json title=成功示例
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
    "code": 200,
    "data": {
        "amount": "100.00",
        "merchantOrderNo": "OrderNoExample",
        "status": 1,
        "tradeNo": "TF2501010001PE0000000000000000"
    }
}
```
```json title=失败示例
{
    "code": 425,
    "data": null,
    "msg": "Insufficient merchant balance",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```