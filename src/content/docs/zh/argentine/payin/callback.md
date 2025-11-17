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
| country  | AR       |
| appCode  | 应用编码   |

### 代收回调


| 参数              | 类型   | 必需  | 长度  | 描述                                  |
|-----------------| ------ |-----|-----|-------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                               |
| tradeNo         | String | yes |     | 平台订单号                               |
| paymentOrderNo  | String | yes | 30  | 平台代收当次支付流水号                         |
| status          | Int | yes |     | 订单状态 【2:成功 】                      |
| paymentAmount   | String | yes |     | 当次实际支付金额                            |
| serviceAmount   | String | yes |     | 服务费用  eg:18.02                      |
| paymentInfo     | String | yes |     | 主要付款信息，返回的是实际用于付款的信息                |
| paymentType     | Int | yes |     | 支付方式                                |
| completeTime    | String | yes |     | 该流水的完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 |
| errorMessage    | String | no  |     | 订单失败错误信息                            |
| sign            | String | yes |     | 签名                                  |

```json title=回调示例
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001AR0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 2,
    "paymentAmount": "1000.00", 
    "serviceAmount": "15.00",
    "paymentInfo": "K8xY3pQ7zW2dE9sR4fT1gH6jU8lM3nB5vC2xZ7qA9wS4eD1rF8tG3yH6uJ9iK2oL5pM8aN3bV7cX9dZ4
eW1fY3gH6jK8lM2nP5qR7sT9uV2wX4yZ6aB8cD1eF3gH5jK7lM9nO2pQ4rS6tU8vW1xY3zA5bC7dE9fG2hJ4kL6mN8oP1qR3sT5uV7wX9yZ2aB4cD6eF8gH1jK3lM5nO7pQ9rS1tU3vW5xY7zA2bC4dE6fG8hJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5jK7",
    "paymentType": 901,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": null,
    "sign": "TEEMO_SIGN"
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


### 回调示例
```
SUCCESS
```