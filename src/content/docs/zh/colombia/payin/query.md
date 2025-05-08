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

| 参数                            | 类型     | 必需 | 长度 | 描述                                            |
|-------------------------------|--------| ---- |---|-----------------------------------------------|
| merchantOrderNo               | String | yes  | 32 | 商户订单号                                         |
| tradeNo                       | String | yes  |   | 平台订单号                                         |
| paymentType                   | Int    | yes  |   | 代收方式        |
| transactionAmount             | String | yes  |   | 订单交易金额                                        |
| amount                        | String | yes  |   | 收款金额                                          |
| status                        | String | yes  |   | 2-成功 ,3-失败                   |
| serviceAmount                 | String | yes  |     | 服务费用  eg:18.02    (20250506新增)                |
| paymentInfo                   | String | yes  |     | 主要付款信息，返回的是实际用于付款的信息     (20250506新增)         |
| errorMessage                  | String | no  |      | 订单失败错误信息       (20250506新增)                   |
| ~~remark~~                        | String | no   |   | 备注     (20250506删除)                           |
| statementList                 | Object | no   |   | 代收流水信息                                        |
| -- paymentSingleOrderNo       | String | yes  |   | 单次支付流水号                                       |
| -- paymentStatementAmount     | String | yes  |   | 单次代收金额                                        |
| -- paymentStatementStatus     | Int    | yes  |   | 单次代收交易状态: 2-代收成功                              |
| -- paymentStatementStatusName | String | yes  |   | 交易状态名称                                        |
| -- serviceAmount              | String | yes  |     | 服务费用  =  固收金额 +  交易金额 * 服务费率      (20250506新增) |
| -- serviceRate                | String | yes  |     | 服务费率    (20250506新增)                          |
| -- immService                 | String | yes  |     | 固收金额    (20250506新增)                          |
| -- paymentType                | Int    | yes  |     | 真实支付方式  (20250506新增)                          |
| -- completeTime               | String    | yes  |     | 该流水的完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式  (20250506新增) |
| ~~sign~~          | String | yes  |     | 签名             (20250506删除)                   |
```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001CO0000000000000000",
    "paymentType": 204,
    "transactionAmount": "1000.00",
    "amount": "1000.00",
    "status": 2,
    "serviceAmount": "15.00",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "errorMessage": null,
    "statementList": [
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
        "paymentStatementAmount": "1000.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "代收成功",
        "serviceAmount": "15.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 204,
        "completeTime": "2025-01-01 00:00:00"
      }
    ]
  },
  "msg": "success",
  "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```
