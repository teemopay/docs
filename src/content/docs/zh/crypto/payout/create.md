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
| country                   | BP     |
| app_code                  | app编号  |

### 请求参数

| 字段              | 类型   | 必需  | 最大长度 | 描述                 |
|-----------------| ------ |-----|------|--------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号              |
| amount          | String | yes | 20   | 代付金额               |
| chain       | String | yes | 50   | 链名: trc20,erc20等   |
| address         | String | yes |    | 收款地址               |
| callbackUrl     | String | no  | 200  | 代付回调地址，若不传, 则以商户配置为准 |
| sign            | String | yes |      | 签名                 |

```json title=请求示例
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "10.00",
    "chain": "trc20",
    "address": "123456789987654321",
    "callbackUrl": "https://www.callbackexample.com",
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
