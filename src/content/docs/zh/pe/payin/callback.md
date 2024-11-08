---
title: 代收回调
description: 商户接受一个代收结果的回调
---

### 回调地址

| method | url                |
| ------ | ------------------ |
| POST   | 商户提供的回调地址 |

### 头部信息（header）

| header参数                  | 入参参数描述  |
|---------------------------|---------|
| timestamp                 | 请求时间戳   |
| nonce                     | 随机值     |

### 代收回调

| 参数       | 类型   | 必需 | 长度  | 描述                               |
| ---------- | ------ | ---- |-----|----------------------------------|
| merchantOrderNo | String | yes  | 32  | 商户订单号                            |
| tradeNo    | String | yes  |     | 平台订单号                            |
| paymentOrderNo | String | yes  | 30  | 平台代收当次支付流水号 当订单可以多次还款时每次还款该流水号不同 |
| status     | Int | yes  |     | 2:成功 3:失败 4:退款                   |
| paymentAmount     | String | yes   |     | 当次实际支付金额                         |
| sign       | String | yes  |     | 签名                               |

```json title=回调示例
{
    "tradeNo": "TS2404000001MX0000075277250508",
    "sign": "TEEMO_SIGN",
    "merchantOrderNo": "123456780",
    "paymentAmount": "1000.00",
    "paymentOrderNo": "TSOcqgv0fepo103dmt3uuu233s1136",
    "status": 2
}

```

```json title=多次还款回调示例
// 一笔订单金额为200.00, 第一次还款50.00,第二次还款150.00
{
    "tradeNo": "TS2404000001PE0000075277250508",
    "sign": "TEEMO_SIGN",
    "merchantOrderNo": "123456780",
    "paymentAmount": "50.00",
    "paymentOrderNo": "TSO0000000001",
    "status": 2
}

{
    "tradeNo": "TS2404000001PE0000075277250508",
    "sign": "TEEMO_SIGN",
    "merchantOrderNo": "123456780",
    "paymentAmount": "150.00",
    "paymentOrderNo": "TSO0000000002",
    "status": 2
}
```
### 回调返回

<Table
thead={["字段", "类型", "必需", "描述"]}
tbody={[["SUCCESS", "String", "yes", '必须返回"SUCCESS"否则会重复回调']]}
/>

| 参数    | 类型   | 必需 | 长度 | 描述                            |
| ------- | ------ | ---- | ---- | ------------------------------- |
| SUCCESS | String | yes  |      | 必须返回"SUCCESS"否则会重复回调 |

```json title=回调示例
{
  "SUCCESS": "SUCCESS"
}
```
