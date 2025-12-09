---
title: 创建代付
description: 商户请求创建一个代付订单
---

### 请求地址

| method | url                       |
| ------ | ------------------------- |
| POST   | /api/pay/payout/create/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|--------|
| timestamp                 | 请求时间戳  |
| nonce                     | 随机值    |
| country                   | PK |
| app_code                  | app编号  |

### 请求参数

| 字段              | 类型   | 必需  | 最大长度 | 描述                               |
|-----------------| ------ |-----|------|----------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                            |
| amount          | String | yes | 20   | 代付金额 巴基斯坦卢比 需传整数                 |
| bankCode        | String | yes | 50   | 银行编码  301取bankCode，302时取WalletCode |
| bankName        | String | yes | 50   | 银行名称 与银行编码字段相同                   |
| accountType     | Int    | yes |      | 账户类型 301(BANK) 302(E-Wallet)     |
| bankAccount     | String | yes | 50  | 银行/钱包账户                          |
| realName        | String | yes | 255  | 客户姓名                             |
| idCardNumber    | String | yes | 13   | 证件号   13位数字                      |
| idType          | Stirng | yes | 32   | 固定传CERT                          |
| phone           | Stirng | yes | 10   | 用户电话  10位数字                      |
| email           | Stirng | no  | 64   | 用户邮箱                             |
| userIBAN        | Stirng | no  | 64   | 国际银行账号                           |
| callbackUrl     | String | no  | 200  | 代付回调地址，（若不传递，取商户后台配置的回调地址）     |
| sign            | String | yes |      | 签名                               |

```json title=请求示例
{
    "merchantOrderNo": "2503231308020924",
    "amount": "1000",
    "bankCode": "EASYPAISA",
    "bankName": "EASYPAISA",
    "accountType": "302",
    "bankAccount": "3000000000",
    "realName": "TEEMO",
    "idCardNumber": "3000000000000",
    "idType": "CERT",
    "phone": "3000000000",
    "callbackUrl": "https://www.callbackexample.com",
    "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数            | 类型   | 必需 | 长度 | 描述                          |
| --------------- | ------ | ---- | ---- | ----------------------------- |
| merchantOrderNo | String | yes  | 32   | 商户订单号                    |
| tradeNo         | String | yes  |      | 平台订单号                    |
| status          | Int | yes  |      | 代付状态,1:支付中 3:失败(可以重新发起) |
| amount          | String | yes  |      | 交易金额                      |

```json title=成功示例
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
    "code": 200,
    "data": {
        "amount": "1000",
        "merchantOrderNo": "OrderNoExample",
        "status": 1,
        "tradeNo": "TF2501010001CPK0000000000000000"
    }
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
| 469                  | The wallet code is not support                                            | 不支持的wallet code，请检查并更改          |
| 470                  | The bank name is not support                                              | 不支持的银行，请检查并更改                 |
| 471                  | The ID type is not support                                               | 不支持的证件号，请检查并更改               |
| 473                  | Merchant joint verification error: *                                      | 商户配置异常，请联系我们                   |
| 500                  | Business Error                                                           | 请联系我们                                 |


```json title=返回示例
{
    "code": 425,
    "data": null,
    "msg": "Insufficient merchant balance",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```