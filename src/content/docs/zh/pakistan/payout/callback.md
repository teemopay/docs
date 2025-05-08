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
| country  | PK     |
| appCode  | 应用编码   |


### 回调参数


| 参数              | 类型   | 必需 | 长度 | 描述                                             |
|-----------------| ------ | ---- | ---- |------------------------------------------------|
| merchantOrderNo | String | yes  | 32   | 商户订单号                                          |
| tradeNo         | String | yes  |      | 平台订单号                                          |
| amount          | String | yes  |      | 交易金额                                           |
| serviceAmount   | String | yes   |     | 服务费用  eg:18.02                                 |
| ~~remark~~      | String | yes  |      | 备注  目前固定为""   (20250506删除)                       |
| status          | Int | yes  |      | 代付状态,2:成功 3:失败                             |
| errorCode       | number | yes  |      | 订单失败状态错误码                                      |
| errorMessage    | String | yes  |      | 订单失败错误信息，详见下方说明                                |
| completeTime    | String | yes  |     | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 (20250506新增) |
| sign            | String | yes  |      | 签名                                             |

```json title=成功回调示例
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TF2501010001PK0000000000000000",
    "amount": "1000.00",
    "serviceAmount": "25.50",
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
    "tradeNo": "TF2501010001PK0000000000000000",
    "amount": null,
    "serviceAmount": null,
    "status": 3,
    "errorCode": 1004,
    "errorMessage": "Wallet limit exceeded, kindly contact user to upgrade or restore limit.",
    "completeTime": "2025-05-01 00:00:00",
    "sign": "TEEMO_SIGN"
    
}
```

### 错误信息说明

| errorCode | errorMessage                                                                                                                  |    补充说明                            |
| --------- |-------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| 1003 | Multiple failures within 30 minutes. Kindly refer to the previous reason, contact the user to change the card or retry later. | 前述原因是指，最近两次的失败原因，需要根据此原因决定改卡或重试 |
| 1004 | Wallet limit exceeded, kindly contact user to upgrade or restore limit.                                                       | EP/JZ超过日/月/年限额 |
| 1005 | Transaction amount exceeds limit, kindly retry within allowed range.                                                          | 请求金额100-50000超限 |
| 1006 | Wallet account frozen, kindly contact user to change card and retry.                                                          | 用户钱包被风控（冻结、休眠、临时管控） |
| 1007 | Wallet account abnormal, kindly contact user to verify account and retry.                                                     | 用户钱包信息错误（卡号或CNIC填错、未激活、未通过认证） |
| 1008 | Request field error, kindly verify and retry.                                                                                 | 上传技术参数有误，未按文档要求 |
| 1009 | Channel request error, technicians will fix ASAP.                                                                             | 维护 |
| 1010 | Unstable network, kindly retry later.                                                                                         | 网络波动 |
| 1011 | Parameter validation error, kindly verify and retry.                                                                          | 上传技术参数有误，未按文档要求 |
| 1012 | Payment method error, kindly select the right way and try again.                                                              | 注意区分钱包账户和银行账户 |
| 1013 | Invalid receiver information, kindly verify and retry.                                                                        | 请求用户参数问题，用户信息无效 |
| 1014 | Account inexist or CNIC mismatch, kindly verify or register wallet then retry.                                                | 用户钱包信息错误（卡号或CNIC填错、未激活、未通过认证） |
| 1015 | Insufficient balance, kindly contact user to recharge and retry.                                                              | 余额不足 |
| 9999 | Others	                        | 由于银行端给定信息不足而导致的其他不明因素 |
### 回调返回

| 参数    | 类型   | 必需 | 长度 | 描述                            |
| ------- | ------ | ---- | ---- | ------------------------------- |
| SUCCESS | String | yes  |      | 必须返回"SUCCESS"否则会重复回调 |

```json title=回调示例
SUCCESS
```
