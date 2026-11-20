---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
|--------|---------------------------|
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header参数  | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | KR     |
| appCode   | app编号  |

### 请求参数

| 字段              | 类型      | 必需  | 最大长度 | 描述                                                            |
|-----------------|---------|-----|------|---------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32   | 商户订单号                                                         |
| amount          | String  | yes | 20   | 代付金额 【整数 单位元 货币:KRW】                                          |
| bankCode        | String  | yes | 50   | 银行编码  【参考银行列表中的银行编码】                                          |
| bankName        | String  | yes | 50   | 银行名称  【参考银行列表中的银行名称】                                          |
| accountType     | Integer | yes |      | 账户类型 </br> 801: BANK_TRANSFER   </br>   802: BANKTRANSFER_KYC |
| bankAccount     | String  | yes | 50   | 收款账号                                                          |
| realName        | String  | yes | 40   | 用户姓名。不得包含特殊字符，建议使用全大写，长度不少于 2 个字母；无需严格校验，但需符合正常姓名格式。          |
| idType          | String  | yes | 50   | 收款人类型 ：RRN （个人）CO（企业）                                         |
| phone           | Stirng  | yes | 11   | 用户手机号，固定 11 位数字且以 010 开头；                                     |
| callbackUrl     | String  | no  | 200  | 代付回调地址，若不传, 则以商户配置为准                                          |
| userDepositCount | Integer | no | | 用户在商户侧的历史成功出账总笔数；非负整数，如 `0`、`1`、`5`。<br>1. 统计口径：仅统计该用户在商户侧已出账成功（终态成功）的出账订单总笔数，不含待支付、已取消、失败或退款/冲正订单。<br>2. 边界说明：`0` 或不传代表该用户在商户侧暂无历史成功出账记录（或尚未完成首次出账）。<br>3. 使用说明：本字段作为出款风控评估与路由分流的参考因子之一，平台将结合自身历史交易记录综合判定。 |
| userFirstDepositTime | Long | no | | 用户在商户侧的首次成功出账时间；13 位毫秒级时间戳，与代收 `expirationTime` 的时间戳规范一致，如 `1732929200000`。<br>1. 统计口径：取该用户在商户侧第一笔成功出账订单的完成/入账时间，非用户注册时间或当前代付请求时间。<br>2. 边界说明：当 `userDepositCount` 为 `0` 或无历史成功出账记录时，本字段无需传递；请确保传入时间戳格式合法且不晚于当前请求时间，若数值异常或与出账次数逻辑冲突，平台将不采纳该参考值。<br>3. 使用说明：本字段作为出款风控评估与路由分流的参考因子之一，平台将结合自身历史交易记录综合判定。 |
| sign            | String  | yes |      | 签名                                                            |

```json title=请求示例
{
  "merchantOrderNo": "OrderNoExample",
  "amount": "1000",
  "bankCode": "088",
  "bankName": "Shinhan Bank",
  "accountType": 801,
  "bankAccount": "12345678998765",
  "realName": "TeemoPay",
  "idType": "RRN",
  "callbackUrl": "https://www.callbackexample.com",
  "userDepositCount": 5,
  "userFirstDepositTime": 1732929200000,
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数              | 类型      | 必需  | 长度 | 描述                                                                                                                              |
|-----------------|---------|-----|----|---------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo | String  | yes | 32 | 商户订单号                                                                                                                           |
| tradeNo         | String  | yes |    | 平台订单号                                                                                                                           |
| status          | Integer | yes |    | `0` 受理中（等同于pending，非终态。创建订单请求已接收，进入风控审批等待审核）<br>`1` 支付中（pending，非终态。订单已进入出款链路处理）<br>`3` 失败（failed，终态。订单创建校验 / 前置审批失败，可按需重新发起代付） |
| amount          | String  | yes |    | 交易金额                                                                                                                            |

```json title=成功示例
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "merchantOrderNo": "OrderNoExample",
    "status": 1,
    "tradeNo": "TF2501010001KR0000000000000000"
  }
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                   |
|-----|---------------------------------------------------------------------|------------------------|
| 412 | Please try again later                                              | 请稍后重试                  |
| 414 | *                                                                   | 更改对应参数                 |
| 417 | Merchant account not found                                          | 商户账户未找到，请联系我们          |
| 425 | Insufficient merchant balance                                       | 商户账户余额不足               |
| 426 | merchant order duplicate                                            | 请更换商户订单号               |
| 427 | The callback notification address for collection must not be empty. | 未配置代收回调地址，请配置代收回调地址    |
| 430 | The card number length is incorrect.                                | 卡号长度异常，请检查并更改          |
| 431 | The bank code does not supported.                                   | 银行编号异常，请检查并更改          |
| 432 | *                                                                   | 卡号，银行号，支付方式匹配异常，请检查并更改 |
| 455 | The account type error.                                             | 账户类型异常，请检查并更改          |
| 462 | This request failed due to blacklist blocking                       | 进入黑名单，请更改参数，重新拉起       |
| 473 | Merchant joint verification error: *                                | 商户配置异常，请联系我们           |
| 475 | The id card type is error                                           | 证件类型异常，请检查并更改          |
| 500 | Business Error                                                      | 请联系我们                  |

```json title=返回示例
{
  "code": 425,
  "data": null,
  "msg": "Insufficient merchant balance",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```