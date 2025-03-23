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
| country                   | MX |
| app_code                  | app编号  |

### 请求参数

| 字段            | 类型   | 必需 | 长度 | 描述       |
| --------------- | ------ | ---- | ---- | ---------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号 |
| sign            | String | yes  |      | 签名       |

```json title=请求示例
{
  "merchantOrderNo": "201806251011",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                          | 类型   | 必需 | 长度 | 描述                                                        |
| ----------------------------- | ------ | ---- |---|-----------------------------------------------------------|
| merchantOrderNo               | String | yes  | 32 | 商户订单号                                                     |
| tradeNo                       | String | yes  |   | 平台订单号                                                     |
| paymentType                   | Int    | yes  |   | 支付方式: 1:VA 4:PayCashOnce 5:PayCashRecurrent |
| transactionAmount             | String | yes  |   | 订单交易金额                                                    |
| amount                        | String | yes  |   | 收款金额                                                      |
| status                        | String | yes  |   | 2-成功                                             |
| remark                        | String | no   |   | 备注                                                        |
| statementList                 | Object | no   |   | 代收流水信息                                                    |
| -- paymentSingleOrderNo       | String | yes  |   | 单次支付流水号                                                   |
| -- paymentStatementAmount     | String | yes  |   | 单次代收金额                                                    |
| -- paymentStatementStatus     | Int | yes  |   | 单次代收交易状态: 2-代收成功                                          |
| -- paymentStatementStatusName | String | yes  |   | 交易状态名称                                                    |
| -- message                    | String | no   |   | 交易信息                                                      |
| sign                          | String | yes  |   | 签名,使用请求的nonce计算签名                                         |

```json title=返回示例
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1500.00",
        "transactionAmount": "1000.00",
        "tradeNo": "TS2501010001MX0000000000000000",
        "paymentType": 1,
        "status": 2,
        "remark": null,
        "statementList": [
            {
                "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
                "paymentStatementAmount": "500.00",
                "paymentStatementStatus": 2,
                "paymentStatementStatusName": "代收成功",
                "message": null
            },
            {
                "paymentSingleOrderNo": "TSOPaymentOrderNoExample2",
                "paymentStatementAmount": "500.00",
                "paymentStatementStatus": 2,
                "paymentStatementStatusName": "代收成功",
                "message": null
            },
            {
                "paymentSingleOrderNo": "TSOPaymentOrderNoExample3",
                "paymentStatementAmount": "500.00",
                "paymentStatementStatus": 2,
                "paymentStatementStatusName": "代收成功",
                "message": null
            }
        ],
        "sign": "TEEMO_SIGN"
    },
    "msg": "success",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
