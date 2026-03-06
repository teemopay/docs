---
title: 订单列表
description: 订单列表
---

### 请求地址

| method | url                            |
|--------|--------------------------------|
| POST   | /api/pay/transaction/queryList |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | BP     |
| app_code  | app 编号 |

### 注意事项

1. 提供近 90 天的实时流水查询，拉取效率： 单次查询以一个自然月（如 01 号 00:00:00 至 31 号 23:59:59）为区间。
2. 状态覆盖逻辑： 对于代付业务，部分国家系统存在“先成功后退款”的可能。请商户在处理 queryList 返回的数据时， status == 4
   refund 时，应视为该订单资金已发生回冲。请勿将其作为新订单处理，而是关联至原业务订单进行状态冲平。

### 请求参数

| 字段        | 类型      | 必需  | 长度 | 描述                                                                |
|-----------|---------|-----|----|-------------------------------------------------------------------|
| pageIndex | String  | no  |    | 游标 : 第一页请求时无需传入；非第一页必须传入，用于定位分页起始位置。                              |
| pageSize  | Integer | no  |    | 查询数量 : 默认500  最大1000。                                             |
| type      | String  | yes |    | 业务类型：PAYIN，PAYOUT，每次仅支持查询一种类型                                     |
| status    | Integer | no  |    | 状态：1: 支付中  2: 成功  3: 失败 4: 退款                                     |
| beginTime | String  | yes |    | 开始时间：格式 ：yyyy-MM-dd HH:mm:ss.SSS。 约束： 不得早于当前日期前 90天,不得晚于当前时间      |
| endTime   | String  | yes |    | 结束时间：格式：格式 yyyy-MM-dd HH:mm:ss.SSS。约束：endTime - beginTime 小于等于31天 |
| sign      | String  | yes |    | 签名                                                                |

```json title=请求示例
{
  "pageIndex": "",
  "pageSize": 500,
  "type": "PAYIN",
  "status": "1",
  "beginTime": "2026-03-01 00:00:00.000",
  "endTime": "2026-03-01 23:59:59.999",
  "sign": "YOUR_SIGN"
}
```

```json title=游标请求示例
{
  "pageIndex": "KgntH8WpwV0lKKYXQr8MY1EgdicDUz/V4l8nCk4QRty3",
  "pageSize": 500,
  "type": "PAYIN",
  "status": "1",
  "beginTime": "2026-03-01 00:00:00.000",
  "endTime": "2026-03-01 23:59:59.999",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                  | 类型     | 必需  | 长度 | 描述                                  |
|---------------------|--------|-----|----|-------------------------------------|
| pageIndex           | String | yes |    | 游标                                  |
| records             | List   | yes |    |                                     |
| — type              | String | yes |    | 业务类型：PAYIN (代收), PAYOUT (代付)        |
| — merchantOrderNo   | String | yes |    | 商户单号                                |
| — tradeNo           | String | yes |    | 平台单号                                |
| — amount            | String | yes |    | 订单原始金额                              |
| — transactionAmount | String | yes |    | 流水实际入账金额（不扣除手续费）。失败 0.00            |
| — serviceAmount     | String | yes |    | 手续费总额（固定费 + 百分比费）                   |
| — status            | String | yes |    | 状态：1-交易中, 2-成功, 3-失败,4 - 退款         |
| — settleStatus      | String | yes |    | 结算状态：0-未结, 1-已结                     |
| — createTime        | String | yes |    | 创建时间 — 当前国家时区 yyyy-MM-dd HH:mm:ss格式 |
| — completeTime      | String | yes |    | 完成时间 —当前国家时区 yyyy-MM-dd HH:mm:ss格式  |
| — settleTime        | String | yes |    | 结算时间 — 当前国家时区 yyyy-MM-dd HH:mm:ss格式 |
| — failReason        | String | yes |    | 错误原因                                |

```json title=返回示例
{
  "code": 200,
  "data": {
    "pageIndex": "KgntH8WpwV0lKKYXQr8MY1EgdicDUz/V4l8nCk4QRty3",
    "records": [
      {
        "type": "PAYIN",
        "merchantOrderNo": "2C2741241kCApltr2IATMy0c9900440",
        "tradeNo": "TS24052200000491357178416",
        "amount": "5000.00",
        "transactionAmount": "5000.00",
        "serviceAmount": "26.00",
        "status": 2,
        "settleStatus": null,
        "failReason": null,
        "createTime": "2026-02-27 03:00:47",
        "completeTime": "2026-02-27 03:01:08",
        "settleTime": null
      }
    ]
  },
  "msg": "success",
  "traceId": "70fc57471a9143e3b7806d473cf33958.90.17727811039671545"
}
```

### 错误码

| 异常码 | 异常信息                                                                                                   | 处理方案                                      |
|-----|--------------------------------------------------------------------------------------------------------|-------------------------------------------|
| 500 | Business Error                                                                                         | 请联系我们                                     |
| 600 | type field invalid parameter value                                                                     | type 字段无效参数值                              |
| 601 | Data older than 90 days cannot be queried via API. Please use the portal to export historical reports. | 超过 90 天的数据无法通过 API 进行查询  （请检查beginTime字段） |
| 602 | Query range exceeds 31 days. Please query data month by month.                                         | 查询范围超过31天                                 |
| 603 | The time cannot be later than the current time.                                                        | 时间不能晚于当前时间      （请检查beginTime字段）          |
| 604 | The start time of the application period cannot be later than the end time.                            | 申请日期的开始时间不得晚于结束时间。                        |
| 605 | status field invalid parameter value                                                                   | status 字段无效参数值                            |
| 606 | PageIndex parsing failed                                                                               | 点位分页解析失败                                  |

```json title=错误返回示例
{
    "code": 416,
    "data": null,
    "msg": "Application not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}