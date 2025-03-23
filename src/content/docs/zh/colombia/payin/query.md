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
| country                   | CO |
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

| 参数                          | 类型   | 必需 | 长度 | 描述                                           |
| ----------------------------- | ------ | ---- | ---- | ---------------------------------------------- |
| merchantOrderNo               | String | yes  | 32   | 商户订单号                                     |
| tradeNo                       | String | yes  |      | 平台订单号                                     |
| paymentType                   | Int    | yes  | 1    | 代收方式                     |
| transactionAmount             | String | yes  |   | 订单交易金额                       |
| amount                        | String | yes  |   | 收款金额                       |
| status                        | Int | yes  |      | 2-成功 3-失败                        |
| remark                        | String | no   |      | 备注                             |
| statementList                 | Object | no   |      | 代收流水信息                                   |
| -- paymentSingleOrderNo       | String | yes  |      | 单次支付流水号                                 |
| -- paymentStatementAmount     | String | yes  |      | 单次代收金额                                   |
| -- paymentStatementStatus     | Int | yes  |      | 单次代收交易状态: 2-代收成功  |
| -- paymentStatementStatusName | String | yes  |      | 交易状态名称                                   |
| -- message                    | String | no   |      | 交易信息                                       |
| sign                          | String | yes  |      | 签名                                           |

```json title=返回示例
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "paymentType": 1,
  "amount": "100",
  "status": 2,
  "remark": "代收备注",
  "statementList": [
    {
      "paymentSingleOrderNo": "OrderNoExample",
      "paymentStatementAmount": "100",
      "paymentStatementStatus": 2,
      "paymentStatementStatusName": "代收成功",
      "message": "代收成功"
    }
  ],
  "sign": "TEEMO_SIGN",
  "success": true
}
```
