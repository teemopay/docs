---
title: 代收查询
description: 商户查询一个代收订单的状态
---

### 请求地址

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/payment/query/v1 |

### 头部信息（header）

| header参数  | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | MX     |
| app_code  | app编号  |

### 请求参数

| 字段              | 类型     | 必需  | 长度 | 描述    |
|-----------------|--------|-----|----|-------|
| merchantOrderNo | String | yes | 32 | 商户订单号 |
| sign            | String | yes |    | 签名    |

```json title=请求示例
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                            | 类型     | 必需  | 长度 | 描述                                          |
|-------------------------------|--------|-----|----|---------------------------------------------|
| merchantOrderNo               | String | yes | 32 | 商户订单号                                       |
| tradeNo                       | String | yes |    | 平台订单号                                       |
| paymentType                   | Int    | yes |    | 支付方式: 1:VA 4:PayCashOnce 5:PayCashRecurrent |
| transactionAmount             | String | yes |    | 订单交易金额                                      |
| amount                        | String | yes |    | 收款金额                                        |
| status                        | String | yes |    | 1-支付中(未收款或未全额收款),2-成功 ,3-失败                 |
| serviceAmount                 | String | yes |    | 服务费用  eg:18.02                              |
| paymentInfo                   | String | yes |    | 主要付款信息，返回的是实际用于付款的信息                        |
| errorMessage                  | String | no  |    | 订单失败错误信息                                    |
| statementList                 | Object | no  |    | 代收流水信息                                      |
| -- paymentSingleOrderNo       | String | yes |    | 单次支付流水号                                     |
| -- paymentStatementAmount     | String | yes |    | 单次代收金额                                      |
| -- paymentStatementStatus     | Int    | yes |    | 单次代收交易状态: 2-代收成功                            |
| -- paymentStatementStatusName | String | yes |    | 交易状态名称                                      |
| -- serviceAmount              | String | yes |    | 服务费用  =  固收金额 +  交易金额 * 服务费率                |
| -- serviceRate                | String | yes |    | 服务费率                                        |
| -- immService                 | String | yes |    | 固收金额                                        |
| -- paymentType                | Int    | yes |    | 真实支付方式                                      |
| -- completeTime               | String | yes |    | 该流水的完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式       |
| -- claveRastreo               | String | yes |    | 渠道返回的付款凭证,部分渠道返回为null值                      |
| -- payerBankCode              | String | yes |    | 银行编号                                        |
| -- payerName                  | String | yes |    | 付款人姓名                                       |
| -- payerAccount               | String | yes |    | 付款人银行账户                                     |
| -- identifier                 | String | yes |    | 支付流水号                                       |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": "1500.00",
    "transactionAmount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "paymentType": 1,
    "paymentInfo": "684180093000000000",
    "status": 2,
    "serviceAmount": "30.00",
    "statementList": [{
      "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
      "paymentStatementAmount": "500.00",
      "paymentStatementStatus": 2,
      "paymentStatementStatusName": "代收成功",
      "completeTime": "2025-01-01 00:00:00",
      "serviceAmount": "10.00",
      "serviceRate": "0.0100",
      "immService": "5.00",
      "paymentType": 1,
      "payerBankCode": "90684",
      "payerName": "Test User Name",
      "payerAccount": "684180118094272991",
      "identifier": "TE00060z462ztlvnyh8g7"
    },
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample2",
        "paymentStatementAmount": "500.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "代收成功",
        "completeTime": "2025-01-01 01:00:00",
        "serviceAmount": "10.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 1,
        "payerBankCode": "90684",
        "payerName": "Test User Name",
        "payerAccount": "684180118037658938",
        "identifier": "TE000ahp328l2y7in3qtx"
      },
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample3",
        "paymentStatementAmount": "500.00",
        "paymentStatementStatus": 2,
        "paymentStatementStatusName": "代收成功",
        "completeTime": "2025-01-01 02:00:00",
        "serviceAmount": "10.00",
        "serviceRate": "0.0100",
        "immService": "5.00",
        "paymentType": 1,
        "payerBankCode": "90684",
        "payerName": "Test User Name",
        "payerAccount": "684180118037658925",
        "identifier": "TE000bhiv619ftngdn60g"
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