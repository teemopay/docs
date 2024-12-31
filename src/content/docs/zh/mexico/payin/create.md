---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述  |
|---------------------------|---------|
| timestamp                 | 请求时间戳   |
| nonce                     | 随机值     |
| country                   | 国家码(MX) |
| app_code                  | app编号   |

## 支持支付方式列表（paymentType）

| 支付方式名称                     | PaymentType (入参参数) |
| ------------------------------ | ---------------------- |
| VA (线上银行转账单次和多次)      | 1                      |
| BankTranfer （线上银行转账单次） | 3                      |
| PayCashOnce（现金付款单次）      | 4                      |
| PayCashRecurrent (现金付款多次)  | 5                      |

#### additionalInfo （附加字段）字段说明：


##### 当支付方式为 4 时 additionalInfo 返回包含：

| 字段名      | 类型 | 是否必传 | 说明                             |
| ----------- | ---- | -------- | -------------------------------- |
| expiredTime | Long | 是       | 过期时间（为请求接口时传输时间） |

##### 当支付方式为 5 时 additionalInfo 返回包含：

| 字段名      | 类型 | 是否必传 | 说明                             |
| ----------- | ---- | -------- | -------------------------------- |
| expiredTime | Long | 是       | 过期时间（为请求接口时传输时间） |

### 请求参数

| 字段              | 类型   | 必需  | 长度  | 描述                                                                             |
|-----------------| ------ |-----|-----|--------------------------------------------------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                                                                          |
| paymentType     | Int    | yes |     | 支付方式: 1-还款码 4-PayCashOnce（线下收款单次）5-PayCashRecurrent（线下多次） |
| realName        | String | yes | 64  | 用户姓名                                                                           |
| email           | String | no  | 50  | 用户邮箱：满足正则表达式即可                                                                 |
| amount          | String | yes | 20  | 代收金额(比索)                                                                       |
| expirationTime  | Long   | no  |     | 过期时间 当 paymentType 为 4、5时有效,默认为一天                                              |
| phone           | String | no  | 20  | 手机号                                                                            |
| callbackUrl     | String | no  | 200 | 代付回调地址，若不传, 则以商户配置为准                                                           |
| sign            | String | yes |     | 签名                                                                             |

```json title="请求示例"
{
  "merchantOrderNo": "DADSADSADSADSADSAD",
  "realName": "TestPay",
  "amount": "20",
  "callbackUrl": "YOUR_CALLBACKURL",
  "paymentType": 5,
  "email": "231231231231@qq.com",
  "phone": "213213213213213",
  "sign": "YOUR_SIGN",
  "expirationTime": 1717048800000
}
```

### 返回参数

| 字段            | 类型       | 必需 | 长度 | 描述                                                                                    |
| --------------- | ---------- | ---- | ---- | --------------------------------------------------------------------------------------- |
| merchantOrderNo | String     | yes  | 32   | 商户订单号                                                                              |
| tradeNo         | String     | yes  | 32   | 平台订单号                                                                              |
| amount          | String     | yes  | 32   | 交易金额                                                                                |
| paymentType     | Int        | yes  | 10   | 支付方式: 1-还款码 4-PayCashOnce（线下收款单次）5-PayCashRecurrent（线下多次） |
| paymentInfo     | String     | yes  | 32   | 主要付款信息，返回的是实际用于付款的信息，例如：Va 账号，付款编号                       |
| additionalInfo  | JSONObject | No   |      | 附加信息：当 2，3，4，5 辅助主要信息使用                                                |
| status          | Int        | yes |    | 1-订单创建成功  3-失败               |
| errorMsg        | String     | no  |    | 错误信息,失败时返回                   |
#### 不同支付方式的响应示例：

#### 当 PaymentType 为 1 时（Va）：

```json
{
  "msg": "success",
  "code": 200,
  "data": {
    "amount": "2800.00",
    "tradeNo": "sdasdasdsadsadsadsad",
    "merchantOrderNo": "lhax41zzb939q79y696sh83r895j7r4x",
    "paymentType": 1,
    "additionalInfo": null,
    "paymentInfo": "6841800930023213210",
    "status": 1
  },
  "success": true
}
```

#### 当 PaymentType 为 4 时（PaycashOnce）：

```json
{
  "amount": "100",
  "tradeNo": "wqewqewqewqewq",
  "merchantOrderNo": "qewqewqewqewqeqw",
  "paymentType": 4,
  "additionalInfo": {
    "expiredTime": 1717048800000
  },
  "paymentInfo": "1251269870973",
  "status": 1
}
```

#### 当 PaymentType 为 5 时（PaycashRecurrent）：

```json
{
  "amount": "100",
  "tradeNo": "wqewqewqewqewq",
  "merchantOrderNo": "qewqewqewqewqeqw",
  "paymentType": 5,
  "additionalInfo": {
    "expiredTime": 1717048800000
  },
  "paymentInfo": "1251269870973",
  "status": 1
}
```
