---
title: query a payin order
description: Query a payin order
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payment/query/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
| ----------- | ------------ |
| timestamp   | 请求时间戳   |
| nonce       | 随机值       |
| country     | 国家码(MX)   |
| app_code    | app 编号     |

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

| 参数                          | 类型   | 必需 | 长度 | 描述                                                                                                         |
| ----------------------------- | ------ | ---- | ---- | ------------------------------------------------------------------------------------------------------------ |
| merchantOrderNo               | String | yes  | 32   | 商户订单号                                                                                                   |
| tradeNo                       | String | yes  |      | 平台订单号                                                                                                   |
| paymentType                   | Int    | yes  |      | 支付方式: 1-还款码 3-BankTransfer（线上收款单次）4-PayCashOnce（线下收款单次）5-PayCashRecurrent（线下多次） |
| transactionAmount             | String | yes  |      | 订单交易金额                                                                                                 |
| amount                        | String | yes  |      | 收款金额                                                                                                     |
| status                        | String | yes  |      | 2-成功 3-失败 4-退款                                                                                         |
| remark                        | String | no   |      | 备注                                                                                                         |
| statementList                 | Object | no   |      | 代收流水信息                                                                                                 |
| -- paymentSingleOrderNo       | String | yes  |      | 单次支付流水号                                                                                               |
| -- paymentStatementAmount     | String | yes  |      | 单次代收金额                                                                                                 |
| -- paymentStatementStatus     | Int    | yes  |      | 单次代收交易状态: 2-代收成功 3-代收失败 4-退款                                                               |
| -- paymentStatementStatusName | String | yes  |      | 交易状态名称                                                                                                 |
| -- message                    | String | no   |      | 交易信息                                                                                                     |
| sign                          | String | yes  |      | 签名                                                                                                         |

```json title=返回示例
{
  "merchantOrderNo": "201806251011",
  "tradeNo": "TF201806251011",
  "paymentType": 1,
  "amount": "100",
  "status": "2",
  "remark": "代收备注",
  "statementList": [
    {
      "paymentSingleOrderNo": "201806251011",
      "paymentStatementAmount": "100",
      "paymentStatementStatus": "2",
      "paymentStatementStatusName": "代收成功",
      "message": "代收成功"
    }
  ],
  "sign": "TEEMO_SIGN",
  "success": true
}
```
