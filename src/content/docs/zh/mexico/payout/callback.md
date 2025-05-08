---
title: 代付回调
description: 商户接受一个代付结果的回调
---

### 回调地址

| method | url                |
| ------ | ------------------ |
| POST   | 商户提供的回调地址 |

### 头部信息（header）

| header参数 | 入参参数描述 |
|----------|--------|
| timestamp | 请求时间戳  |
| nonce    | 随机值    |
| country  | MX     |
| appCode  | 应用编码   |

### 回调参数

| 参数              | 类型   | 必需 | 长度 | 描述                                             |
|-----------------| ------ | ---- | ---- |------------------------------------------------|
| merchantOrderNo | String | yes  | 32   | 商户订单号                                          |
| tradeNo         | String | yes  |      | 平台订单号                                          |
| amount          | String | yes  |      | 交易金额                                           |
| serviceAmount   | String | yes   |     | 服务费用  eg:18.02                                 |
| ~~remark~~      | String | yes  |      | 备注  目前固定为""   (20250506删除)                       |
| status          | Int | yes  |      | 代付状态,2:成功 3:失败 4:退款                            |
| errorCode       | number | yes  |      | 订单失败状态错误码                                      |
| errorMessage    | String | yes  |      | 订单失败错误信息，详见下方说明                                |
| completeTime    | String | yes  |     | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 (20250506新增) |
| sign            | String | yes  |      | 签名                                             |

```json title=成功回调示例
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001MX0000000000000000",
    "amount": "1000.00",
    "serviceAmount": "10.50",
    "status": 2,
    "errorCode": null,
    "errorMessage": null,
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
    
}
```

```json title=失败回调示例
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001MX0000000000000000",
    "amount": null,
    "serviceAmount": null,
    "status": 3,
    "errorCode": 9999,
    "errorMessage": "Others",
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
    
}
```

```json title=退款回调示例
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001MX0000000000000000",
    "amount": "1000.00",
    "serviceAmount": "10.50",
    "status": 4,
    "errorCode": 1000,
    "errorMessage": "The account does not exist or is restricted",
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
    
}
```

> errorCode 说明：

| errorCode | errorMessage                                                                          | 补充说明                          |
| --------- |---------------------------------------------------------------------------------------|--------------------------------|
| 1000      | The account does not exist or is restricted                                           | 建议让用户改卡                        |
| 1001      | Return                                                                                | 已退款，建议收到回调后，发起时间在 24 小时内可以重新放款 |
| 1002      | Channel server fluctuations                                                           | 通道波动，建议 10 分钟后重试               |
| 1004 | Wallet limit exceeded, kindly contact user to upgrade or restore limit.               | 收款账户超过日/月/年限额                  |
| 1005 | Transaction amount exceeds limit, kindly retry within allowed range.                  | 请求金额超限                         |
| 1007 | Abnormal user account , kindly contact user to verify account and retry.              | 用户信息错误                         |
| 1010 | Unstable network, kindly retry later.                                                 | 通道波动                           |
| 1011 | Parameter validation error, kindly verify and retry.                                  | 上传技术参数有误，未按文档要求                |
| 1012 | Payment method error, kindly select the right way and try again.                      | 支付方式错误，注意区分钱包账户和银行账户           |
| 1016 | Refund by the recipient or the recipient's bank，kindly contact user to verify account | 付款被银行拒绝，联系用户更新账户重试             |
| 9999 | Others                                                                                | 未知异常                           |

### 回调返回

| 参数    | 类型   | 必需 | 长度 | 描述                            |
| ------- | ------ | ---- | ---- | ------------------------------- |
| SUCCESS | String | yes  |      | 必须返回"SUCCESS"否则会重复回调 |

```json title=回调示例
SUCCESS
```
