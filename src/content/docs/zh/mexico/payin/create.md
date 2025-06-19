---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header参数                  | 入参参数描述 |
|---------------------------|-------|
| timestamp                 | 请求时间戳 |
| nonce                     | 随机值   |
| country                   | MX    |
| app_code                  | app编号 |

## 支持支付方式列表（paymentType）

| 支付方式名称                           | PaymentType (入参参数) |
|----------------------------------|--------------------|
| VA (SPEI 线上网银支付)                 | 1                  |
| PayCashOnce（线下网点现金支付单次）          | 4                  |
| PayCashRecurrent (线下网点现金支付同金额多次) | 5                  |
| OXXO (OXXO 线下网点现金支付)             | 6                  |

### 注意事项
1. 当paymentType支付方式为1:VA,还款金额和次数由用户决定,可能出现不足额或者超过期望收款金额的情况,也可能出现多次还款的情况。商户必须正确处理该逻辑。多次还款时通过回调报文中paymentOrderNo字段作为每笔还款的唯一标识。
2. 当paymentType支付方式为5:PayCashRecurrent,可能出现多次还款的情况。多次还款时通过回调报文中paymentOrderNo字段作为每笔还款的唯一标识。
### 请求参数

| 字段              | 类型   | 必需  | 最大长度 | 描述                                                |
|-----------------| ------ |-----|------|---------------------------------------------------|
| merchantOrderNo | String | yes | 32   | 商户订单号                                             |
| paymentType     | Int    | yes |      | 支付方式: 1:VA 4:PayCashOnce 5:PayCashRecurrent |
| realName        | String | yes | 64   | 用户姓名                                              |
| email           | String | no  | 50   | 用户邮箱：满足正则表达式即可                                    |
| amount          | String | yes | 20   | 代收金额(比索)                                          |
| expirationTime  | Long   | no  |      | 过期时间 当 paymentType 为 4、5时有效,默认为一天 毫秒级时间戳 eg:1735660800000                |
| phone           | String | no  | 20   | 手机号                                               |
| callbackUrl     | String | no  | 200  | 代付回调地址，若不传, 则以商户配置为准                              |
| sign            | String | yes |      | 签名                                                |


```json title="请求示例"
{
    "realName": "TeemoPay",
    "amount": "1000.00",
    "phone": "1000000000",
    "sign": "YOUR_SIGN",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample",
    "email": "TeemoPay@example.com",
    "paymentType": 1
}
```

### 返回参数

| 字段            | 类型       | 必需  | 长度 | 描述                                              |
| --------------- | ---------- |-----| ---- |-------------------------------------------------|
| merchantOrderNo | String     | yes | 32   | 商户订单号                                           |
| tradeNo         | String     | yes | 32   | 平台订单号                                           |
| amount          | String     | yes | 32   | 交易金额                                            |
| paymentType     | Int        | yes | 10   | 支付方式 1:VA 4:PayCashOnce 5:PayCashRecurrent |
| paymentInfo     | String     | yes | 32   | 主要付款信息，返回的是实际用于付款的信息，例如：Va 账号，付款编号              |
| additionalInfo  | JSONObject | no  |      | 附加信息：辅助主要信息使用                         |
| status          | Int        | yes |    | 1-订单创建成功  3-失败                                  |
| errorMsg        | String     | no  |    | 错误信息,失败时返回                                      |


### 不同支付方式的响应示例

#### 当 PaymentType 为 1 时（VA）：

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "additionalInfo": {
      "paymentLink": "https://test-mx-payin.teemopay.com/TS2405220001MX0000315772003922"
    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "684180093000000000",
    "paymentType": 1,
    "status": 1
  }
}
```

#### 当 PaymentType 为 4 时（PayCashOnce）：

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 4,
    "additionalInfo": {
      "paymentLink": "https://www.paycashLinkExample.com"
    },
    "paymentInfo": "1420000000000",
    "status": 1
  }
}
```

#### 当 PaymentType 为 5 时（PayCashRecurrent）：

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610297",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001MX0000000000000000",
    "merchantOrderNo": "OrderNoExample",
    "paymentType": 4,
    "additionalInfo": {
      "paymentLink": "https://www.paycashLinkExample.com"
    },
    "paymentInfo": "1420000000000",
    "status": 1
  }
}
```
#### 当 PaymentType 为 6 时（OXXO）：

```json
{
  "amount": "1000.00",
  "tradeNo": "TS2404070001MX0000205873135769",
  "merchantOrderNo": "ABCDEFG",
  "paymentType": 6,
  "additionalInfo": {
    "paymentLink": "https://www.paycashglobXXXXXXXm/formato.php?referencia=ATQyMDY0OTczNDIzMg==&interno=1"
  },
  "paymentInfo": "1420649734231",
  "status": 1
}
```

> errorMsg 说明：

| errorMsg                                | 说明    |
| ------------------------------------------- |-------|
| Transaction amount exceeds limit, kindly retry within allowed range. | 请求金额超限 |
| Channel request error, technicians will fix ASAP. | 渠道维护  |
| Unstable network, kindly retry later. |渠道网络波动|
| Parameter validation error, kindly verify and retry. | 参数上传有误|