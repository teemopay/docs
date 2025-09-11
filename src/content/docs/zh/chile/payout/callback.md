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
| country  | CL     |
| appCode  | 应用编码   |

### 回调参数

| 参数            | 类型   | 必需 | 长度 | 描述                                                                    |
| --------------- | ------ | ---- | ---- | ----------------------------------------------------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                                                              |
| tradeNo         | String | yes  |      | 平台订单号                                                              |
| amount          | String | yes  |      | 交易金额                                            |
| serviceAmount   | String | yes   |     | 服务费用  eg:18.02 |
| status          | String | Int  |      | 代付状态,2:成功 3:失败                                           |
| errorCode       | number | yes  |      | 订单失败状态错误码                                                      |
| errorMessage    | String | yes  |      | 订单失败错误信息，详见下方说明 |
| completeTime    | String | yes  |     | 完成时间 当前国家时区 yyyy-MM-dd HH:mm:ss格式  |
| sign            | String | yes  |      | 签名                                                                    |

```json title=回调示例
{
  "merchantOrderNo": "OrderNoExample",
  "tradeNo": "TF201806251011",
  "status": 2,
  "amount":"1000.00",
  "serviceAmount":"60.00",
  "sign": "TEEMO_SIGN"
}
```

> errorCode 说明：

| errorCode | errorMessage                                                                                                                              | 建议                                                    |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------- |
| 1000      | The account does not exist or is restricted                                                                                               | 建议让用户改卡                                          |
| 1001      | Return                                                                                                                                    | 已退款，建议收到回调后，发起时间在 24 小时内可以重新放款 |
| 1002      | Channel server fluctuations                                                                                                               | 通道波动，建议 10 分钟后重试                            |
| 1018      |Invalid account number (may be due to mismatch with ID number, presence of special characters, or incorrect length），kindly verify and retry. |账户无效（可能因为与ID不符、特殊字符或长度错误|
| 1019      | Invalid rut,kindly verify and retry.                                                                                                      |无效RUT|
| 1020      | Unsupported bank. Please select a different bank and try again.                                                                           |不支持的银行|
| 1021      | Invalid document id（may be due to incorrect length，format or mismatch with user's information）,kindly verify and retry.                   |无效id，可能是长度错误、格式错误或与用户信息不符|
| 1022      | Account number does not match the account type,kindly verify and retry.                                                                   |账户号与账户类型不符|
| 9999      | Others                                                                                                                                    | 其他，建议取消订单                                      |

### 回调返回

| 参数    | 类型   | 必需 | 长度 | 描述                            |
| ------- | ------ | ---- | ---- | ------------------------------- |
| SUCCESS | String | yes  |      | 必须返回"SUCCESS"否则会重复回调 |

```json title=回调示例
SUCCESS
```
