---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
| ----------- | ----------- |
| timestamp   | 请求时间戳  |
| nonce       | 随机值      |
| country     | PE   |
| app_code    | app 编号    |

### 支持支付方式列表（paymentType）

| 支付方式名称              | PaymentType (入参参数) |
|---------------------| ---------------------- |
| CHECKOUT（聚合支付链接收银台） | 101                    |
| CASH（线下）            | 102                    |
| BCP                 | 105                    |
| INTERBANK           | 106                    |
| BBVA                | 107                    |
| SCOTIABANK          | 108                    |
| WALLET(包含YAPE、PLIN) | 109                    |

#### 收银台样式
![image-20240528105940814](https://image.xiwu.me/2024/903d077857edfdec8deee35a455587f4.png)


### 请求参数

| 字段            | 类型   | 必需 | 长度  | 描述                                          |
| --------------- | ------ | ---- |-----| --------------------------------------------- |
| merchantOrderNo | String | yes  | 32  | 商户订单号                                    |
| paymentType     | Int    | yes  |     | 支付方式: 101 ：checkout（支付链接收银台）    |
| amount          | String | yes  | 20  | 代收金额(索尔)                                |
| expirationTime  | Long   | no   |     | 过期时间,毫秒级时间戳 eg:1735660800000                           |
| realName        | String | yes  | 64  | 用户姓名 |
| email           | String | yes  | 50  | 用户邮箱：满足正则表达式即可                  |
| phone           | String | yes  | 9   | 电话号码 9 位数不包含区号                     |
| sign            | String | yes  |     | 签名                                          |
| callbackUrl     | String | no   | 200 | 回调地址                                      |

```json title="请求示例"
{
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "paymentType": 101,
    "amount": "10.00",
    "realName": "TeemoPay",
    "email": "TeemoPay@example.com",
    "phone": "900000000",
    "callbackUrl": "https://www.callbackexample.com",
    "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段            | 类型       | 必需 | 长度 | 描述                |
| --------------- | ---------- | ---- | ---- |-------------------|
| merchantOrderNo | String     | yes  | 32   | 商户订单号             |
| tradeNo         | String     | yes  | 32   | 平台订单号             |
| amount          | String     | yes  | 32   | 交易金额              |
| paymentType     | Int        | yes  | 10   | 支付方式,101:checkout |
| paymentInfo     | String     | yes  | 32   | 主要付款信息,收银台链接      |
| additionalInfo  | JSONObject | no   |      | 附加信息              |
| status          | Int        | yes  |      | 代收状态, 1:成功 3:失败     |
| errorMsg        | String     | no   |      | 错误信息,失败时返回        |


### 不同支付方式的响应示例：

#### 当 PaymentType 为 101 ：checkout（支付链接收银台）时：

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "10.00",
    "tradeNo": "TS2405220001PE0000430564883184",
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "paymentType": 101,
    "additionalInfo": {
      "thirdOrderNum": "12345678901"
    },
    "paymentInfo": "https://www.paymentLinkExample.com",
    "status": 1
  }
}
```

### 校验错误码
| 异常码       | 异常信息                                                                 | 处理方案                                               |
|--------------|--------------------------------------------------------------------------|--------------------------------------------------------|
| 412          | Please try again later                                                   | 请稍后重试                                             |
| 414          | *                                                                        | 更改对应参数                                           |
| 423          | This payment method is not supported                                     | 对应支付方式不支持，请查阅文档，如存在则联系我们配置        |
| 426          | merchant order duplicate                                                 | 请更换商户订单号                                       |
| 427          | The callback notification address for collection must not be empty.       | 请配置代收回调地址                                     |
| 466          | Payment method fee rate not configured.                                  | 商户代收费率配置异常，请联系我们                       |
| 473          | Merchant joint verification error: *                                      | 商户配置异常，请联系我们                               |
| 500          | Business Error                                                           | 请联系我们                                             |

```json title=失败示例
{
    "code": 426,
    "data": null,
    "msg": "merchant order duplicate",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610298"
}
```

### 渠道错误信息

| errorMsg                                | 说明    |
| ------------------------------------------- |-------|
| Channel request error, technicians will fix ASAP. | 渠道维护  |
| Unstable network, kindly retry later. |渠道网络波动|

```json title=返回示例
{
    "code": 200,
    "data": {
        "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
        "amount": null,
        "tradeNo": "TS2405220001PE0000430564883184",
        "paymentType": 1,
        "paymentInfo": null,
        "additionalInfo": null,
        "status": 3,
        "errorMsg": "Channel request error, technicians will fix ASAP."
    },
    "msg": "success",
    "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```

