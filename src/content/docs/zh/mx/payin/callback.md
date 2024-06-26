---
title: 代收回调
description: 商户接受一个代收结果的回调
---

### 回调地址

| method | url                |
| ------ | ------------------ |
| POST   | 商户提供的回调地址 |

### 代收回调

| 参数       | 类型   | 必需 | 长度 | 描述                                    |
| ---------- | ------ | ---- | ---- | --------------------------------------- |
| merchantNo | String | yes  | 32   | 商户订单号                              |
| tradeNo    | String | yes  |      | 平台订单号                              |
| method     | String | yes  |      | 支付方式: VA-线上 store-线下 url-收银台 |
| status     | String | yes  |      | 1-成功 2-失败 3-退款                    |
| remark     | String | no   |      | 商户创建订单传的值                      |
| sign       | String | yes  |      | 签名                                    |

```json title=回调示例
{
  "merchantNo": "201806251011",
  "tradeNo": "TF201806251011",
  "method": "VA",
  "paymentOrderNo": "201806251011",
  "paymentAmount": "100",
  "status": "1",
  "remark": "代收备注",
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

```json title=回调示例
{
  "SUCCESS": "SUCCESS"
}
```
