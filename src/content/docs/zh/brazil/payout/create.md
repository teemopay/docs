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
| accountType     | Int    | yes |     | CPF-401<br>CNPJ-402 <br>PHONE-403 <br>EMAIL-404 <br>EVP-405 <br>五个参数根据实际情况选择一个 |
| bankAccount     | String | yes | 50 | 收款账号                                                                           |
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
                "accountType": 101,
                "bankAccount": "1234567890123456",
                "amount": "100000",
                "callbackUrl": "http://127.0.0.1:8075/sys/dictionary/test",
                "sign": "YOUR SIGN",
                "idType": "DNI",
                "phone": "13175025118",
                "idCardNumber": "12345678"
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
        "amount": "100",
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
| 425                  | Insufficient merchant balance                                             | 商户账户余额不足                           |
| 426                  | merchant order duplicate                                                 | 请更换商户订单号                           |
| 427                  | The callback notification address for collection must not be empty.       | 未配置代收回调地址，请配置代收回调地址     |
| 432                  | *                                                                        | 卡号，银行号，支付方式匹配异常，请检查并更改 |
| 455                  | The account type error.                                                  | 账户类型异常，请检查并更改                 |
| 462                  | This request failed due to blacklist blocking                            | 进入黑名单，请更改参数，重新拉起           |
| 473                  | Merchant joint verification error: *                                      | 商户配置异常，请联系我们                   |
| 475                  | The id card type is error                                               | 证件类型异常，请检查并更改                 |
| 476                  | The id card number is error                                              | 证件号异常，请检查并更改                   |
| 500                  | Business Error                                                           | 请联系我们                                 |

```json title=返回示例
{
    "code": 417,
    "data": null,
    "msg": "Merchant account not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```