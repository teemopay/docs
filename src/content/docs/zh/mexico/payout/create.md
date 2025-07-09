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
|---------------------------|------|
| timestamp                 | 请求时间戳 |
| nonce                     | 随机值  |
| country                   | MX |
| app_code                  | app编号 |

### 注意事项
代付订单有成功转为失败的场景，普遍原因为收款账号格式正确但不存在或者收款账号状态异常。该场景一般在创建订单的五分钟内完成两次回调。此类情况会先回调商户成功状态，再回调商户退款状态，商户必须正确处理该逻辑。
### 请求参数

| 字段              | 类型   | 必需  | 最大长度 | 描述                   |
|-----------------| ------ |-----|------|----------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                |
| amount          | String | yes | 20   | 代付金额(比索)             |
| bankCode        | String | yes | 50   | 银行编码                 |
| bankName        | String | yes | 50   | 银行名称                 |
| accountType     | Int    | yes |      | 账户类型 3:借记卡 40:CLABE  |
| bankAccount     | String | yes | 50   | 收款账号                 |
| realName        | String | yes | 40   | 用户姓名 不包含特殊字符，建议全大写   |
| idCardNumber    | String | yes | 50   | 收款人 ID 号码            |
| callbackUrl     | String | no  | 200  | 代付回调地址，若不传, 则以商户配置为准 |
| sign            | String | yes |      | 签名                   |

```json title=请求示例
{
    "bankAccount": "123456789987654321",
    "realName": "TEEMO",
    "bankCode": "40002",
    "amount": "1000.00",
    "phone": "1000000000",
    "accountType": 40,
    "idCardNumber": "GAPG00000000000000",
    "sign": "YOUR_SIGN",
    "bankName": "BANAMEX",
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
