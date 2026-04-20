---
title: Payout Query
description: Merchant queries the status of a payout order
---

### Request URL

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

### Header Information

| Header Parameter | Description       |
| --------------- |-------------------|
| timestamp      | Request timestamp |
| nonce          | Random value      |
| country        | Country code (BR) |
| app_code       | Application ID    |

### Request Parameters

| Field           | Type   | Required | Length | Description           |
| --------------- | ------ | -------- | ------ | --------------------- |
| merchantOrderNo | String | yes      | 32     | Merchant order number |
| sign           | String | yes      |        | Signature            |

```json title="Request Example"
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

### Response Parameters

| Parameter          | Type    | Required | Length | Description                                                       |
| ----------------- | ------- | -------- | ------ | ----------------------------------------------------------------- |
| merchantOrderNo   | String | yes | 32 | 商户订单号                             |
| tradeNo           | String | yes |    | 平台订单号                             |
| amount            | String | yes |    | 代付金额                              |
| status            | Int    | yes |    | 代付状态,2:成功 3:失败                    |
| serviceAmount     | String | yes |    | 服务费用  =  固收金额 +  交易金额 * 服务费率      |
| immService        | String | yes |    | 固收金额                              |
| serviceRate       | String | yes |    | 服务费率                              |
| totalRefundAmount | String | yes |    | 退款总金额                             |
| refundDetails     | Array  | yes |    | 退款明细                              |
| - refundNo        | String | yes |    | 退款单号                              |
| - refundAmount    | String | yes |    | 当次退款金额                            |
| - refundStatus    | String | yes |    | 当次退款状态  0（部分退款）1（全额退款）            |
| - refundTime      | String | yes |    | 当次退款时间                            |
| errorCode         | number | yes |    | 订单失败状态错误码                         |
| errorMessage      | String | yes |    | 订单失败错误信息                          |
| completeTime      | String | yes |    | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 |

```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2405220001BR0000509326631881",
    "amount": "300.11",
    "status": 1,
    "serviceRate": "0.0500",
    "serviceAmount": "20.01",
    "immService": "5.00",
    "completeTime": null,
    "errorCode": null,
    "errorMessage": null
  },
  "msg": "success",
  "traceId": "2e0e38e3e9a24b60b4f57c6d2ced196a.115.17744291515713103"
}

```

```json title=退款示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2405220001BR0000509326631881",
    "errorMessage": "FINAL_FAILURE_MANUAL",
    "amount": "1000.00",
    "status": 4,
    "serviceRate": "0.0500",
    "serviceAmount": "55.00",
    "immService": "5.00",
    "completeTime": "2026-04-17 00:23:24",
    "errorCode": 1024,
    "cepUrl": null,
    "totalRefundAmount": "1000.00",
    "refundDetails": [
      {
        "refundNo": "R001-20260417002149463108",
        "refundAmount": "500.00",
        "refundStatus": 2,
        "refundTime": "2026-04-17 00:21:50"
      },
      {
        "refundNo": "R001-20260417002149463108123123",
        "refundAmount": "500.00",
        "refundStatus": 2,
        "refundTime": "2026-04-17 00:21:50"
      }
    ]
  },
  "msg": "success",
  "traceId": "dcf1aee524564c5485a655d09a02aa02.86.17766720253031143"
}

```

```json title="Order Not Found Response Example"
{
  "code": 400,
  "msg": "Order not found",
  "success": false
}
