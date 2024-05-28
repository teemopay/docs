---
title: 代付查询
description: 商户查询一个代付订单的状态
---

### 请求地址

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

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

| 参数            | 类型   | 必需 | 长度 | 描述                                  |
| --------------- | ------ | ---- | ---- | ------------------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                            |
| tradeNo         | String | yes  |      | 平台订单号                            |
| remark          | String | yes  |      | 商户创建订单传的值                    |
| status          | String | yes  |      | 1-支付中 2-代付成功 3-代付失败 4-退款 |
| sign            | String | yes  |      | 签名                                  |

```json title=返回示例
{
  "merchantOrderNo": "201806251011",
  "tradeNo": "TF201806251011",
  "remark": "代付备注",
  "status": "1",
  "sign": "TEEMO_SIGN"
}
```
