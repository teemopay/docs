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
| --------- | -- |
| timestamp | 请求时间戳 |
| nonce     | 随机值 |
| country   | BR |
| app_code  | app编号 |

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

| 参数                | 类型     | 必需 | 长度  | 描述                                             |
|-------------------|--------| ---- |-----|------------------------------------------------|
| merchantOrderNo   | String | yes  | 32  | 商户订单号                                          |
| tradeNo           | String | yes  |     | 平台订单号                                          |
| amount            | String | yes  |     | 代付金额                                           |
| status            | Int    | yes  |     | 代付状态,2:成功 3:失败                                 |
| serviceAmount     | String | yes  |     | 服务费用  =  固收金额 +  交易金额 * 服务费率       |
| immService        | String | yes  |     | 固收金额                               |
| serviceRate       | String | yes  |     | 服务费率                               |
| errorCode         | number | yes  |     | 订单失败状态错误码                          |
| errorMessage      | String | yes  |     | 订单失败错误信息                           |
| completeTime     | String | yes  |     | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式  |

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

```json title=返回示例
{
    "code": 416,
    "data": null,
    "msg": "Application not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```