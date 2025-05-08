---
title: 代收回调
description: 商户接受一个代收结果的回调
---

### 回调地址

| method | url                |
| ------ | ------------------ |
| POST   | 商户提供的回调地址 |


### 头部信息（header）

| header参数 | 入参参数描述 |
|----------|--------|
| timestamp | 请求时间戳  |
| nonce    | 随机值    |
| country  | BR     |
| appCode  | 应用编码   |

### 代收回调

| 参数              | 类型     | 必需 | 长度  | 描述             |
|-----------------|--------| ---- |-----|----------------|
| merchantOrderNo | String | yes  | 32  | 商户订单号          |
| tradeNo         | String | yes  |     | 平台订单号          |
| paymentOrderNo  | String | yes  | 30  | 平台代收当次支付流水号    |
| status          | Int    | yes  |     | 2:成功           |
| paymentAmount   | String | yes   |     | 当次实际支付金额       |
| serviceAmount   | String | yes   |     | 服务费用  eg:18.02 |
| paymentInfo     | String | yes   |     | 主要付款信息，返回的是实际用于付款的信息           |
| paymentType     | Int | yes   |     | 支付方式           |
| sign            | String | yes  |     | 签名             |

```json title=回调示例
{
    "tradeNo": "TS2404000001MX0000075277250508",
    "sign": "TEEMO_SIGN",
    "merchantOrderNo": "123456780",
    "paymentAmount": "1000.00",
    "paymentOrderNo": "TSOcqgv0fepo103dmt3uuu233s1136",
    "status": 2
    "paymentType":1,
    "serviceAmount":"60.00",
    "paymentInfo":"646180503010250443"
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
SUCCESS
```
