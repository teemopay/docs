---
title: 代收查询
description: 商户查询一个代收订单的状态
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payment/query/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country                   | AR       |
| app_code                  | app编号  |

### 请求参数

| 字段            | 类型   | 必需 | 长度 | 描述       |
| --------------- | ------ | ---- | ---- | ---------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号 |
| sign            | String | yes  |      | 签名       |

```json title=请求示例
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                            | 类型     | 必需 | 长度 | 描述                                    |
|-------------------------------|--------| ---- |---|---------------------------------------|
| merchantOrderNo               | String | yes  | 32 | 商户订单号                                 |
| tradeNo                       | String | yes  |   | 平台订单号                                 |
| paymentType                   | Int    | yes  |   | 支付方式 【901: QR】                        |
| transactionAmount             | String | yes  |   | 订单交易金额                                |
| amount                        | String | yes  |   | 收款金额                                  |
| status                        | String | yes  |   | 订单状态 【1 :支付中 2 : 支付成功 ,3: 支付失败】       |
| serviceAmount                 | String | yes  |     | 服务费用  eg:18.02                        |
| paymentInfo                   | String | yes  |     | 主要付款信息，返回的是实际用于付款的信息                  |
| errorMessage                  | String | no  |      | 订单失败错误信息                              |
| statementList                 | Object | no   |   | 代收流水信息                                |
| -- paymentSingleOrderNo       | String | yes  |   | 单次支付流水号                               |
| -- paymentStatementAmount     | String | yes  |   | 单次代收金额                                |
| -- paymentStatementStatus     | Int    | yes  |   | 单次代收交易状态 【2:代收成功 3: 支付失败】             |
| -- paymentStatementStatusName | String | yes  |   | 交易状态名称                                |
| -- serviceAmount              | String | yes  |     | 服务费用  =  固收金额 +  交易金额 * 服务费率          |
| -- serviceRate                | String | yes  |     | 服务费率                                  |
| -- immService                 | String | yes  |     | 固收金额                                  |
| -- paymentType                | Int    | yes  |     | 真实支付方式                                |
| -- completeTime               | String    | yes  |     | 该流水的完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 |
```json title=返回示例
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000.00",
        "transactionAmount": "1000.00",
        "tradeNo": "TS2501010001AR0000000000000000",
        "paymentType": 901,
        "paymentInfo": "K8xY3pQ7zW2dE9sR4fT1gH6jU8lM3nB5vC2xZ7qA9wS4eD1rF8tG3yH6uJ9iK2oL5pM8aN3bV7cX9dZ4
eW1fY3gH6jK8lM2nP5qR7sT9uV2wX4yZ6aB8cD1eF3gH5jK7lM9nO2pQ4rS6tU8vW1xY3zA5bC7dE9fG2hJ4kL6mN8oP1qR3sT5uV7wX9yZ2aB4cD6eF8gH1jK3lM5nO7pQ9rS1tU3vW5xY7zA2bC4dE6fG8hJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5jK7",
        "status": 2,
        "serviceAmount": "15.00",
        "statementList": [
            {
                "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
                "paymentStatementAmount": "1000.00",
                "paymentStatementStatus": 2,
                "paymentStatementStatusName": "代收成功",
                "completeTime": "2025-01-01 00:00:00",
                "serviceAmount": "15.00",
                "serviceRate": "0.0100",
                "immService": "5.00",
                "paymentType": 901
            }
        ]
    },
    "msg": "success",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```

### 错误码
| 异常码 | 异常信息               | 处理方案           |
|--------|------------------------|--------------------|
| 412    | Please try again later  | 请稍后重试         |
| 414    | *                      | 更改对应参数       |
| 416    | Application not found  | app_code异常，请更改 |
| 434    | Merchant order not exist | 请检查提交的订单号   |
| 500    | Business Error         | 请联系我们         |