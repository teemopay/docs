---
title: 代付回调
description: 商户接受一个代付结果的回调
---

### 回调地址

| method | url                |
| ------ | ------------------ |
| POST   | 商户提供的回调地址 |

### 回调参数

| 参数            | 类型   | 必需 | 长度 | 描述                                                                    |
| --------------- | ------ | ---- | ---- | ----------------------------------------------------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                                                              |
| tradeNo         | String | yes  |      | 平台订单号                                                              |
| amount          | String | yes  |      | 交易金额                                            |
| remark          | String | yes  |      | 备注                                                      |
| status          | String | yes  |      | 2-代付成功 3-代付失败 4-已退款                                          |
| errorCode       | number | yes  |      | 订单失败状态错误码                                                      |
| errorMessage    | String | yes  |      | 订单失败错误信息：1000-卡有误或限额 1001-已退款 1002-通道波动 9999-其他 |
| sign            | String | yes  |      | 签名                                                                    |

```json title=回调示例
{
  "merchantOrderNo": "201806251011",
  "tradeNo": "TF201806251011",
  "remark": "代付备注",
  "status": 2,
  "sign": "TEEMO_SIGN"
}
```

> errorCode 说明：

| errorCode | errorMessage                                | 建议                                                     |
| --------- | ------------------------------------------- | -------------------------------------------------------- |
| 1000      | The account does not exist or is restricted | 建议让用户改卡                                           |
| 1001      | Return                                      | 已退款，建议收到回调后，发起时间在 24 小时内可以重新放款 |
| 1002      | Channel server fluctuations                 | 通道波动，建议 10 分钟后重试                             |
| 9999      | Others                                      | 其他，建议取消订单                                       |

### 回调返回

| 参数    | 类型   | 必需 | 长度 | 描述                            |
| ------- | ------ | ---- | ---- | ------------------------------- |
| SUCCESS | String | yes  |      | 必须返回"SUCCESS"否则会重复回调 |

```json title=回调示例
{
  "SUCCESS": "SUCCESS"
}
```
