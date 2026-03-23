---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header参数  | 入参参数描述 |
| --------- | ------ |
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | BR |
| app_code  | app编号  |

### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述                                                                             |
| --------------- | ------ | --- | --- | ------------------------------------------------------------------------------ |
| merchantOrderNo | String | yes | 32  | 商户订单号                                                                          |
| amount          | String | yes | 20  | 代付金额(雷亚尔),小数点不能超过两位                                                            |
| bankCode        | String | no | 50  | 银行编码                                                                           |
| bankName        | String | no  | 50  | 银行名称                                                                           |
| accountType     | Int    | yes |     | <b>CPF-401(个人税号:11位数字)</b><br><b>CNPJ-402</b>(巴西企业税号:14位数字)<br><b>PHONE-403</b>(手机号码。格式：+55后面11位数字。例如：+5512345678901。提示:如果手机号换了主人，PIX 别名可能被迁移)<br><b>EMAIL-404</b>(邮箱：用户在银行 APP 验证过的邮箱；一个人可能有多个邮箱，分别绑定在不同的银行，放款前需确认用户当前激活的是哪一个。)<br><b>EVP-405</b>(随机密钥/ 虚拟支付地址；后台通常使用 EVP。自动生成,不需要用户手动记忆.格式类似UUID的字符串 例如:01eb9090-73e5-4187-b43d-0d80a149e1dc)<br>五个参数根据实际情况选择一个 |
| bankAccount     | String | yes | 50 | 收款账号：传输账户类型对应的信息                                                                           |
| realName        | String | yes | 255 | 用户姓名                                                                           |
| idCardNumber    | String | yes | 50  | 收款人证件号码                                                                        |
| idType          | Stirng | yes | 32  | CPF(11位数字),CNPJ(14位数字)                                                         |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传, 则以商户配置为准                                                           |
| sign            | String | yes |     | 签名                                                                             |

```json
{
    "merchantOrderNo": "ds111ad111022911111111111131",
    "realName": "Carlos",
    "bankCode": "1",
    "bankName": "BANK",
    "accountType": 401,
    "bankAccount": "12345678901",
    "amount": "1000.01",
    "callbackUrl": "http://127.0.0.1:8075/sys/dictionary/test",
    "sign": "YOUR SIGN",
    "idType": "CPF",
    "phone": "+5512345678901",
    "idCardNumber": "12345678901"
}
```

### 返回参数

| 参数              | 类型     | 必需  | 长度  | 描述                 |
| --------------- | ------ | --- | --- | ------------------ |
| merchantOrderNo | String | yes | 32  | 商户订单号              |
| tradeNo         | String | yes |     | 平台订单号              |
| status          | Int    | yes |     | 代付状态,1:支付中 3:失败(可以重新发起) |
| amount          | String | yes |     | 交易金额               |

```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "ds111ad111002911111111111131",
        "tradeNo": "TF2405220001MX0000048840060444",
        "amount": "1000.01",
        "status": 1
    },
    "msg": "success",
    "success": true
}
```

### 错误码
| 异常码               | 异常信息                                                                 | 处理方案                                   |
|----------------------|--------------------------------------------------------------------------|--------------------------------------------|
| 412                  | Please try again later                                                   | 请稍后重试                                 |
| 414                  | *                                                                        | 更改对应参数                               |
| 417                  | Merchant account not found                                               | 商户账户未找到，请联系我们                 |
| 421                  | This payout method is not supported                                      | 对应支付方式不支持，请查阅文档，如存在则联系我们配置        |
| 425                  | Insufficient merchant balance                                            | 商户账户余额不足                           |
| 426                  | merchant order duplicate                                                 | 请更换商户订单号                           |
| 427                  | The callback notification address for collection must not be empty.      | 未配置代收回调地址，请配置代收回调地址     |
| 432                  | *                                                                        | 卡号，银行号，支付方式匹配异常，请检查并更改 |
| 455                  | The account type error.                                                  | 账户类型异常，请检查并更改                 |
| 462                  | This request failed due to blacklist blocking                            | 进入黑名单，请更改参数，重新拉起           |
| 473                  | Merchant joint verification error: *                                     | 商户配置异常，请联系我们                   |
| 475                  | The id card type is error                                                | 证件类型异常，请检查并更改                 |
| 476                  | The id card number is error                                              | 证件号异常，请检查并更改                   |
| 482                  | The bank account does not meet the requirements.                         | 收款账号不符合对应支付方式的要求，请检查并更改   |
| 500                  | Business Error                                                           | 请联系我们                                 |

```json title=返回示例
{
    "code": 417,
    "data": null,
    "msg": "Merchant account not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```