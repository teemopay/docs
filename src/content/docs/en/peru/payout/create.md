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
| country                   | 国家码(PE) |
| app_code                  | app编号   |

### 请求参数

| 字段              | 类型   | 必需  | 长度  | 描述                                                       |
|-----------------| ------ |-----|-----|----------------------------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                                                    |
| amount          | String | yes | 20  | 代付金额(比索)                                                 |
| phone           | String |  no | 9   | 9开头 9位数字                                         |
| bankCode        | String | yes | 50  | 银行编码                                                     |
| bankName        | String | yes | 50  | 银行名称                                                     |
| accountType     | Int    | yes |     | 账户类型 101-AHORRO(储蓄) 102-CORRIENTE(活期)                    |
| bankAccount     | String | yes | 50  | 收款账号                                                     |
| realName        | String | yes | 40  | 客户姓名                                                     |
| idCardNumber    | String | yes | 50  | 收款人证件号码                                                  |
| idType          | Stirng | yes | 32  | DNI(8位数；身份证) ,  RUC（11位数；税号）, CE（9位数；外国人身份证）, PA（9位数；护照） |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传, 则以商户配置为准                                     |
| sign            | String | yes |     | 签名                                                       |

```json title=请求示例
{
                "merchantOrderNo": "ds111ad111022911111111111131",
                "realName": "Carlos",
                "bankCode": "1",
                "bankName": "BCP",
                "accountType": 101,
                "bankAccount": "1234567890123456",
                "amount": "100000",
                "callbackUrl": "http://127.0.0.1:8075/sys/dictionary/test",
                "sign": "YOUR SIGN",
                "idType": "DNI",
                "phone": "13175025118",
                "idCardNumber": "12345678"
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
    "code": 200,
    "data": {
        "merchantOrderNo": "ds111ad111002911111111111131",
        "tradeNo": "TF2405220001MX0000048840060444",
        "amount": "100",
        "status": 1
    },
    "msg": "success",
    "success": true
}
```
