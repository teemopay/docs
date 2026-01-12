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
| country   | MX     |
| app_code  | app编号  |

### 注意事项

1. 代付订单有成功转为失败的场景，普遍原因为收款账号格式正确但不存在或者收款账号状态异常。该场景一般在创建订单的五分钟内完成两次回调。此类情况会先回调商户成功状态，再回调商户退款状态，商户必须正确处理该逻辑。
2. 当账户类型为借记卡时bankAccount长度必须是16位；且bankAccount前6位请参考银行列表中银行编码对应的bin列表。若银行列表bin列表为空，平台将不校验bankAccount。
3. 当账户类型为CLABE时bankAccount长度必须是18位；且bankAccount前3位和bankCode的后3位必须保持一致，若银行列表不存在bankCode，平台将不校验bankAccount。

### 请求参数

| 字段              | 类型     | 必需  | 最大长度 | 描述                                                  |
|-----------------|--------|-----|------|-----------------------------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                                               |
| amount          | String | yes | 20   | 代付金额(比索)                                            |
| bankCode        | String | yes | 50   | 银行编码                                                |
| bankName        | String | yes | 50   | 银行名称                                                |
| accountType     | Int    | yes |      | 账户类型 3:借记卡 40:CLABE                     |
| bankAccount     | String | yes | 50   | 收款账号  【请参考注意事项】                                                 |
| realName        | String | yes | 40   | 用户姓名。不得包含特殊字符，建议使用全大写，长度不少于 2 个字母；无需严格校验，但需符合正常姓名格式。 |
| idCardNumber    | String | yes | 50   | 收款人 ID 号码                                           |
| callbackUrl     | String | no  | 200  | 代付回调地址，若不传, 则以商户配置为准                                |
| sign            | String | yes |      | 签名                                                  |

```json title=请求示例
{
  "bankAccount": "123456789987654321",
  "realName": "TEEMO",
  "bankCode": "40002",
  "amount": "1000.00",
  "phone": "1000000000",
  "accountType": 40,
  "idCardNumber": "GAPG00000000000000",
  "sign": "YOUR_SIGN",
  "bankName": "BANAMEX",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "OrderNoExample"
}
```

### 返回参数

| 参数              | 类型     | 必需  | 长度 | 描述                      |
|-----------------|--------|-----|----|-------------------------|
| merchantOrderNo | String | yes | 32 | 商户订单号                   |
| tradeNo         | String | yes |    | 平台订单号                   |
| status          | Int    | yes |    | 代付状态,1:支付中 3:失败(可以重新发起) |
| amount          | String | yes |    | 交易金额                    |

```json title=成功示例
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "merchantOrderNo": "OrderNoExample",
    "status": 1,
    "tradeNo": "TF2501010001MX0000000000000000"
  }
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                   |
|-----|---------------------------------------------------------------------|------------------------|
| 412 | Please try again later                                              | 请稍后重试                  |
| 414 | *                                                                   | 更改对应参数                 |
| 417 | Merchant account not found                                          | 商户账户未找到，请联系我们          |
| 421 | This payout method is not supported                                 | 不支持该代付方式               |
| 425 | Insufficient merchant balance                                       | 商户账户余额不足               |
| 426 | merchant order duplicate                                            | 请更换商户订单号               |
| 427 | The callback notification address for collection must not be empty. | 未配置代收回调地址，请配置代收回调地址    |
| 429 | The card number does not match the bank code.                       | 卡号与银行编码不匹配，请检查并更改      |
| 430 | The card number length is incorrect.                                | 卡号长度异常，请检查并更改          |
| 432 | *                                                                   | 卡号，银行号，支付方式匹配异常，请检查并更改 |
| 455 | The account type error.                                             | 账户类型异常，请检查并更改          |
| 462 | This request failed due to blacklist blocking                       | 进入黑名单，请更改参数，重新拉起       |
| 473 | Merchant joint verification error: *                                | 商户配置异常，请联系我们           |
| 481 | The bank account length is incorrect.（The card number is fixed at 16 digits.）                                                                    | 卡号长度异常                 |
| 482 | The bank account does not meet the requirements.                                | 该银行账户不符合要求                 |
| 500 | Business Error                                                      | 请联系我们                  |

```json title=返回示例
{
  "code": 425,
  "data": null,
  "msg": "Insufficient merchant balance",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```