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
|---------------------------|-------|
| timestamp                 | 请求时间戳 |
| nonce                     | 随机值   |
| country                   | CO    |
| app_code                  | app编号 |

### 请求参数

| 字段            | 类型   | 必需  | 长度 | 描述                                                                    |
| --------------- | ------ |-----|----|-----------------------------------------------------------------------|
| merchantOrderNo | String | yes | 32 | 商户订单号                                                                 |
| amount          | String | yes | 20 | 代付金额(比索)     仅支持整数                                                    |
| bankCode        | String | yes | 50 | 银行编码                                                                  |
| bankName        | String | yes | 50 | 银行名称                                                                  |
| accountType     | Int    | yes |    | 账户类型 201-AHORRO(储蓄) 202-CORRIENTE(活期)  203-PHONE(手机号码) 详情请看银行列表中的账户类型 |
| bankAccount     | String | yes | 50 | 收款账号   accountType为203时传输收款人电话号码,3开头10位数字                             |
| realName        | String | yes | 40 | 用户姓名 不包含特殊字符，建议全大写                                                    |
| idCardNumber    | String | yes | 50 | 收款人证件号码                                                               |
| idType          | Stirng | yes | 32 | CC(6-10位数；身份证) ,  CE（6-10位数）, NIT（9位数；税号）, PA（9位数；护照）                 |
| phone           | Stirng | yes | 10   | 用户电话  3开头10位数字                                                        |
| email           | Stirng | yes  | 64   | 用户邮箱                                                                  |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传, 则以商户配置为准                                                  |
| sign            | String | yes   |    | 签名                                                                    |

```json title=请求示例
{
    "bankAccount": "3000000000",
    "bankCode": "1507",
    "bankName": "NEQUI",
    "amount": "10000",
    "idType": "CC",
    "accountType": 201,
    "merchantOrderNo": "OrderNoExample",
    "realName": "TEEMO",
    "phone": "3000000000",
    "idCardNumber": "1234567890",
    "callbackUrl": "https://www.callbackexample.com",
    "email": "TeemoPay@example.com",
    "sign": "YOUR_SIGN"
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
        "amount": "10000",
        "merchantOrderNo": "OrderNoExample",
        "status": 1,
        "tradeNo": "TF2501010001CO0000000000000000"
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
