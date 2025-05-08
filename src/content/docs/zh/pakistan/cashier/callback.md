---
title: 代收回调
description: 商户接受一个代收结果的回调
---

### 回调地址

| method | url                |
| ------ | ------------------ |
| POST   | 商户提供的回调地址 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country  | PK     |
| appCode  | 应用编码   |

### 代收回调

| 参数              | 类型   | 必需  | 长度  | 描述                                                  |
|-----------------| ------ |-----|-----|-----------------------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                                               |
| tradeNo         | String | yes |     | 平台订单号                                               |
| paymentOrderNo  | String | yes | 30  | 平台代收当次支付流水号                                         |
| status          | Int | yes |     | 2:成功 3:失败                                           |
| paymentAmount   | String | yes |     | 当次实际支付金额                                            |
| serviceAmount   | String | yes |     | 服务费用  eg:18.02                                      |
| paymentInfo     | String | yes |     | 主要付款信息，返回的是实际用于付款的信息                                |
| paymentType     | Int | yes |     | 真实支付方式 303:easypaisa ,304:jazzcash,305:bankTransfer |
| completeTime    | String | yes |     | 该流水的完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式 (20250506新增)  |
| errorMessage    | String | no  |     | 订单失败错误信息                                            |
| sign            | String | yes |     | 签名                                                  |

```json title=成功回调示例
{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001PK0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 2,
    "paymentAmount": "1000.00", 
    "serviceAmount": "10.00",
    "paymentInfo": "https://www.paymentLinkExample.com",
    "paymentType": 304,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": null,
    "sign": "TEEMO_SIGN"
}
```

```json title=失败回调示例

{
    "merchantOrderNo": "OrderNoExample",
    "tradeNo": "TS2501010001PK0000000000000000",
    "paymentOrderNo": "TSOPaymentOrderNoExample",
    "status": 3,
    "paymentAmount": "1000.00",
    "serviceAmount": "0.00",
    "paymentInfo": "jazzcash",
    "paymentType": 304,
    "completeTime": "2025-01-01 00:00:00",
    "errorMessage": "Unstable network, kindly retry later.",
    "sign": "TEEMO_SIGN"
}
```

### 错误信息说明

| errorMessage                                |    补充说明                            |
| ------------------------------------------- |--------------------------------|
| Wallet limit exceeded, kindly contact user to upgrade or restore limit. | EP/JZ超过日/月/年限额 |
| Transaction amount exceeds limit, kindly retry within allowed range. | 请求金额100-50000超限 |
| Wallet account frozen, kindly contact user to change card and retry. | 用户钱包被风控（冻结、休眠、临时管控） |
| Wallet account abnormal, kindly contact user to verify account and retry. | 用户钱包信息错误（卡号或CNIC填错、未激活、未通过认证） |
| Request field error, kindly verify and retry. | 上传技术参数有误，未按文档要求 |
| Channel request error, technicians will fix ASAP. | 维护 |
| Unstable network, kindly retry later. | 网络波动 |
| User canceled the payment on wallet. | 订单已提交，但用户未通过钱包支付 |
| Account inexist or CNIC mismatch, kindly verify or register wallet then retry. | 用户钱包信息错误（卡号或CNIC填错、未激活、未通过认证） |
| Parameter validation error, kindly verify and retry. | 上传技术参数有误，未按文档要求 |
| Insufficient balance, kindly contact user to recharge and retry. | 余额不足 |
| Others | 由于银行端给定信息不足而导致的其他不明因素 |


### 回调返回

<Table
thead={["字段", "类型", "必需", "描述"]}
tbody={[["SUCCESS", "String", "yes", '必须返回"SUCCESS"否则会重复回调']]}
/>

| 参数    | 类型   | 必需 | 长度 | 描述                            |
| ------- | ------ | ---- | ---- | ------------------------------- |
| SUCCESS | String | yes  |      | 必须返回"SUCCESS"否则会重复回调 |

```json title=回调示例
SUCCESS
```

