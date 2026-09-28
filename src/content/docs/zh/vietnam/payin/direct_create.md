---
title: 直连接口
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | VN     |
| appCode  | app 编号 |

## 支持支付方式列表（paymentType）

| 支付方式名称 | PaymentType |
|---|---:|
| QR | 2101 |
| VA | 2102 |
| Wallet | 2103 |



### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述                                                                                                  |
|-----------------|--------|-----|-----|-----------------------------------------------------------------------------------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                                                                                               |
| paymentType     | Int    | yes |     | 支付方式，详见[支付方式列表](#支持支付方式列表paymenttype) |
| amount          | String | yes | 20  | 代收金额（VND），仅支持整数 |
| realName        | String | yes | 64  | 付款人姓名 |
| email           | String | yes | 50  | 付款人邮箱：满足正则表达式即可 |
| phone           | String | yes | 50  | 电话号码，以 0 开头的 10 位数字 |
| bankCode        | String | no  | 50  | 银行编码，参考[银行列表](./bank)；`paymentType` 为 2102（VA）时必填 |
| sign            | String | yes |     | 签名                                                                                                  |
| callbackUrl     | String | no  | 200 | 回调地址                                                                                                |

```json title="请求示例"
{
  "merchantOrderNo": "OrderNoExample",
  "realName": "TeemoPay",
  "amount": "30000",
  "callbackUrl": "https://www.callbackexample.com",
  "paymentType": 2101,
  "email": "TeemoPay@example.com",
  "phone": "0900000000",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度 | 描述                           |
|-----------------|------------|-----|----|------------------------------|
| merchantOrderNo | String     | yes | 32 | 商户订单号                        |
| tradeNo         | String     | yes |    | 平台订单号 |
| amount          | String     | yes |    | 交易金额 |
| paymentType     | Int        | yes |    | 支付方式 |
| paymentInfo     | String     | yes |    | 主要付款信息，返回上游返回的支付链接 |
| additionalInfo  | JSONObject | no  |    | 附加信息，原始二维码 |
| status          | Int        | yes |    | 代收状态, 1:支付中 3:已失败 |
| errorMsg        | String     | no  |    | 错误信息,失败时返回                   |

```json
{
  "code": 200,
  "data": {
    "merchantOrderNo": "OrderNoExample",
    "amount": "30000",
    "tradeNo": "TS2501010001VN0000000000000000",
    "paymentType": 2101,
    "paymentInfo": "https://mock/payment/",
    "additionalInfo": {},
    "status": 1,
    "errorMsg": null
  },
  "msg": "success",
  "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833191761712117"
}
```

### 校验错误码

| 异常码 | 异常信息                                                                | 处理方案                       |
|-----|---------------------------------------------------------------------|----------------------------|
| 412 | Please try again later                                              | 请稍后重试                      |
| 414 | *                                                                   | 更改对应参数                     |
| 423 | This payment method is not supported                                | 对应支付方式不支持，请查阅文档，如存在则请联系我们配置 |
| 426 | merchant order duplicate                                            | 请更换商户订单号                   |
| 427 | The callback notification address for collection must not be empty. | 请配置代收回调地址                  |
| 466 | Payment method fee rate not configured.                             | 商户代收费率配置异常，请联系我们           |
| 473 | Merchant joint verification error: *                                | 商户配置异常，请联系我们               |
| 500 | Business Error                                                      | 请联系我们                      |

```json title=返回示例
{
  "code": 426,
  "data": null,
  "msg": "merchant order duplicate",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.2256.17645844263770017"
}
```
