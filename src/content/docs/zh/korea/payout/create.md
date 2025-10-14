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
| country                   | KR     |
| app_code                  | app编号  |

### 请求参数

| 字段              | 类型      | 必需  | 最大长度 | 描述                                                   |
|-----------------|---------|-----|------|------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | 商户订单号                                                |
| amount          | String  | yes | 20   | 代付金额 【整数 单位元 货币:KRW】                                 |
| bankCode        | String  | yes | 50   | 银行编码  【参考银行列表中的银行编码】                                 |
| bankName        | String  | yes | 50   | 银行名称  【参考银行列表中的银行名称】                                 |
| accountType     | Integer | yes |      | 账户类型 【801:BANK_TRANSFER】                             |
| bankAccount     | String  | yes | 50   | 收款账号                                                 |
| realName        | String  | yes | 40   | 用户姓名。不得包含特殊字符，建议使用全大写，长度不少于 2 个字母；无需严格校验，但需符合正常姓名格式。 |
| idType    | String  | yes | 50   | 收款人类型 ：RRN （个人）COMPANY（企业）                           |
| callbackUrl     | String  | no  | 200  | 代付回调地址，若不传, 则以商户配置为准                                 |
| sign            | String  | yes |      | 签名                                                   |

```json title=请求示例
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "bankCode": "088",
    "bankName": "Shinhan Bank",
    "accountType": 801,
    "bankAccount": "12345678998765",
    "realName": "realName",
    "idType": "RRN",
    "callbackUrl": "https://www.callbackexample.com",
    "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数            | 类型      | 必需 | 长度 | 描述                        |
| --------------- |---------| ---- | ---- |---------------------------|
| merchantOrderNo | String  | yes  | 32   | 商户订单号                     |
| tradeNo         | String  | yes  |      | 平台订单号                     |
| status          | Integer | yes  |      | 代付状态 【1:支付中 3:失败(可以重新发起)】 |
| amount          | String  | yes  |      | 交易金额                      |

```json title=成功示例
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
    "code": 200, 
    "data": {
        "amount": "1000.00",
        "merchantOrderNo": "OrderNoExample",
        "status": 1,
        "tradeNo": "TF2501010001MX0000000000000000"
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
