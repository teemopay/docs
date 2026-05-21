---
title: 悬账订单列表
---

### 请求地址

| method | url                                  |
|--------|--------------------------------------|
| POST   | /api/pay/payment/queryAccountInfo/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | AR     |
| app_code  | app 编号 |

### 注意事项

专门用于 AR（阿根廷）市场，查询商户下30天内的悬账未处理流水。

### 请求参数

| 字段        | 类型      | 必需  | 长度 | 描述                                                            |
|-----------|---------|-----|----|---------------------------------------------------------------|
| pageIndex | String  | no  |    | 游标 : 第一页请求时无需传入；非第一页必须传入，用于定位分页起始位置。                          |
| pageSize  | Integer | no  |    | 查询数量 : 默认500  最大1000。                                         |
| beginTime | String  | yes |    | 开始时间：格式 ：yyyy-MM-dd HH:mm:ss。 约束： 不得早于当前日期前 30天。              |
| endTime   | String  | yes |    | 结束时间：格式：格式 yyyy-MM-dd HH:mm:ss。约束：endTime - beginTime 小于等于31天 |
| sign      | String  | yes |    | 签名                                                            |

```json title=请求示例
{
  "pageIndex": "",
  "beginTime": "2026-03-10 00:00:00",
  "endTime": "2026-03-17 23:59:59",
  "pageSize": 1,
  "sign": "SIGN_STR_XXXX"
}
```

### 返回参数

| 参数                     | 类型     | 必需  | 长度 | 描述                    |
|------------------------|--------|-----|----|-----------------------|
| pageIndex              | String | yes |    | 游标                    |
| records                | List   | yes |    | 悬账流水信息                |
| — suspenseBankId       | String | yes |    | 单次次入账凭证id （bankid）    |
| — suspenseAmount       | String | yes |    | 单次入账金额                |
| — theoreticalAmount    | String | yes |    | 建议金额 (补单范围)           |
| — suspenseIdCardNumber | String | yes |    | 实际付款人身份信息（CUIT 或 DNI） |
| — suspenseRealName     | String | yes |    | 实际付款人姓名               |
| — suspenseCallbackTime | String | yes |    | 该流水入账时间               |
| — cvu                  | String | yes |    | 入账cvu 账号              |

```json title=返回示例
{
  "code": 200,
  "data": {
    "records": [
      {
        "suspenseBankId": "86VRPQ2GM4KDKQ1G2GLY0M",
        "suspenseAmount": "400.00",
        "suspenseIdCardNumber": "000000000",
        "suspenseRealName": "Teemopay",
        "suspenseCallbackTime": "2026-03-16 23:17:19",
        "cvu": "0000111100000015127521"
      }
    ],
    "pageIndex": "hRCyv/Q0jH/igldiVBxgUelKl3QGc/d/ZXcskEATHQ=="
  },
  "msg": "success",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.95.17739933448283365"
}
```

### 错误码

| 异常码  | 异常信息                                                                                                   | 处理方案                        |
|------|--------------------------------------------------------------------------------------------------------|-----------------------------|
| 602  | Query range exceeds 31 days. Please query data month by month.                                         | endTime - beginTime 大于 31 天 |
| 603  | The time cannot be later than the current time                                                         | 开始时间不能晚于当前时间                |
| 604  | The start time of the application period cannot be later than the end time.                            | 开始时间不能晚于结束时间                |
| 607  | Data older than 30 days cannot be queried via API. Please use the portal to export historical reports. | 超过30天的数据无法查询                |
| 500  | Business Error                                                                                         | 业务异常 （请与我们联系）               |
| 非200 | 其他异常                                                                                                   | 请与我们联系                      |

```json title=错误返回示例
{
  "code": 602,
  "data": null,
  "msg": "Query range exceeds 31 days. Please query data month by month.",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.98.17739944725617763"
}
```