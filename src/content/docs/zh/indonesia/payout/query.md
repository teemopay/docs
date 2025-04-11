---
title: 代付查询
description: 商户查询一个代付订单的状态
---

### 请求地址

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

### 头部信息（header）

| header参数  | 入参参数描述 |
| --------- |--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | ID     |
| app_code  | app编号  |

### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述    |
| --------------- | ------ | --- | --- | ----- |
| merchantOrderNo | String | yes | 32  | 商户订单号 |
| sign            | String | yes |     | 签名    |

```json
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                 | 类型      | 必需  | 长度  | 描述                       |
| ------------------ | ------- | --- | --- | ------------------------ |
| code               | Integer | yes |     | 请求响应码                    |
| msg                | String  | yes |     | 响应信息                     |
| data               | Object  | yes |     | 响应数据                     |
| -- merchantOrderNo | String  | yes | 32  | 商户订单号                    |
| -- tradeNo         | String  | yes |     | 平台订单号                    |
| -- amount          | String  | yes |     | 代付金额                     |
| -- remark          | String  | yes |     | 备注                       |
| -- status          | Int     | yes |     | 代付状态,2:成功 3:失败     |
| -- sign            | String  | yes |     | 签名                       |

```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": "10000.00",
    "transactionAmount": "10000.00",
    "tradeNo": "TS2501010001ID0000000000000000",
    "paymentType": 501,
    "status": 2,
    "remark": null,
    "statementList": [
      {
        "paymentSingleOrderNo": "TSOPaymentOrderNoExample",
        "paymentStatementAmount": "10000.00",
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

```json
{
  "code": 400,
  "msg": "Order not found",
  "success": false
}
```
