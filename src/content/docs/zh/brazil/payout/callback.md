---
title: 代付回调
description: 商户接受一个代付结果的回调
---

### 回调地址

| method | url       |
|--------|-----------|
| POST   | 商户提供的回调地址 |

### 头部信息（header）

| header参数  | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | BR     |
| appCode   | 应用编码   |

### 回调参数

| 参数              | 类型     | 必需  | 长度 | 描述                                                 |
|-----------------|--------|-----|----|----------------------------------------------------|
| merchantOrderNo | String | yes | 32 | 商户订单号                                              |
| tradeNo         | String | yes |    | 平台订单号                                              |
| amount          | String | yes |    | 交易金额                                               |
| serviceAmount   | String | yes |    | 服务费用  eg:18.02   【部分退款服务费0】                        |
| status          | Int    | yes |    | 代付状态,2:成功 3:失败 4: 已退款 5: 部分退款                      |
| refundNo        | Int    | yes |    | 当次退款单号"T00X-" X代表退款次数，比如第一次退款就为1；T001-TF2501010001 |
| refundAmount    | Int    | yes |    | 当次退款金额                                             |
| refundStatus    | Int    | yes |    | 当次退款状态：0（部分退款）1（全额退款）                              |
| refundTime      | Int    | yes |    | 当次退款时间                                             |
| errorCode       | number | yes |    | 订单失败状态错误码                                          |
| errorMessage    | String | yes |    | 订单失败错误信息，详见下方说明                                    |
| completeTime    | String | yes |    | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式                  |
| sign            | String | yes |    | 签名                                                 |

```json title=成功回调示例
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001BR0000000000000000",
  "amount": "1000.00",
  "serviceAmount": "25.50",
  "status": 2,
  "errorCode": null,
  "errorMessage": null,
  "completeTime": "2025-05-01 00:00:00",
  "sign": "TEEMO_SIGN"

}
```

```json title=部分退款回调示例
{
  "amount": "300",
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF2501010001BR0000000000000000",
  "refundTime": "2026-04-20 04:17:29",
  "completeTime": "2026-04-20 04:17:29",
  "refundStatus": 2,
  "serviceAmount": "0",
  "refundNo": "R002-TF2405220001BR0000527108668641",
  "status": 5,
  "refundAmount": "200",
  "errorMessage": null,
  "errorCode": null,
  "sign": ""
}
```

> errorCode 说明：

| errorCode | errorMessage                                | 建议                             |
|-----------|---------------------------------------------|--------------------------------|
| 1000      | The account does not exist or is restricted | 建议让用户改卡                        |
| 1001      | Return                                      | 已退款，建议收到回调后，发起时间在 24 小时内可以重新放款 |
| 1002      | Channel server fluctuations                 | 通道波动，建议 10 分钟后重试               |
| 9999      | Others                                      | 其他，建议取消订单                      |

### 回调返回

| 参数      | 类型     | 必需  | 长度 | 描述                   |
|---------|--------|-----|----|----------------------|
| SUCCESS | String | yes |    | 必须返回"SUCCESS"否则会重复回调 |

```json
SUCCESS
```
