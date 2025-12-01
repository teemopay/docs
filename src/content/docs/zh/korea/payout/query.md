---
title: 代付查询
description: 商户查询一个代付订单的状态
---

### 请求地址

| method | url                      |
| ------ | ------------------------ |
| POST   | /api/pay/payout/query/v1 |

###  头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country                   | KR     |
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


| 参数              | 类型     | 必需  | 长度  | 描述                                |
|-----------------|--------|-----|-----|-----------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                             |
| tradeNo         | String | yes |     | 平台订单号                             |
| amount          | String | yes |     | 代付金额                              |
| status          | Int    | yes |     | 代付状态,1: 交易中 2:成功 3:失败             |
| serviceAmount   | String | yes |     | 服务费用  =  固收金额 +  交易金额 * 服务费率      |
| immService      | String | yes |     | 固收金额                              |
| serviceRate     | String | yes |     | 服务费率                              |
| errorCode       | number | yes |     | 订单失败状态错误码                         |
| errorMessage    | String | yes |     | 订单失败错误信息                          |
| completeTime    | String | yes |     | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001KR0000000000000000",
    "amount": "1000.00",
    "status": 2,
    "serviceAmount": "15.00",
    "immService": "5.00",
    "serviceRate": "0.010",
    "errorCode": null,
    "errorMessage": null,
    "completeTime": "2025-05-01 00:00:00"
  },
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```
```json title=订单不存在返回示例
{
    "code": 400,
    "msg":"Order not found",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```

### 错误码
| 异常码 | 异常信息               | 处理方案                   |
|--------|------------------------|----------------------------|
| 412    | Please try again later  | 请稍后重试                 |
| 414    | *                      | 更改对应参数               |
| 416    | Application not found  | app_code异常，请更改       |
| 417    | Merchant account not found | 商户账户未找到，请联系我们 |
| 418    | Merchant account is closed | 商户账户已关闭，请联系我们 |
| 434    | Merchant order not exist | 请检查提交的订单号   |
| 500    | Business Error         | 请联系我们                 |