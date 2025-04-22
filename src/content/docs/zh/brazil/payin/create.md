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
| --------- | ------ |
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | BR |
| app_code  | app 编号 |

## 支持支付方式列表（paymentType）

| 支付方式名称      | PaymentType (入参参数) |
| ----------- | ------------------ |
| PIX(线上银行转账) | 401                |

### additionalInfo （附加字段）字段说明

| 字段名 | 类型  | 是否必传 | 说明  |
| --- | --- | ---- | --- |
| -   | -   | -    | -   |

### 请求参数

| 字段              | 类型     | 必需  | 长度  | 描述                  |
| --------------- | ------ | --- | --- |---------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号               |
| paymentType     | Int    | yes |     | 支付方式: 401-PIX       |
| amount          | String | yes | 20  | 代收金额(雷亚尔),小数点不能超过2位 |
| expirationTime  | Long   | no  |     | 过期时间,毫秒级时间戳 eg:1735660800000     |
| realName        | String | no  | 64  | 用户姓名                |
| email           | String | no  | 50  | 用户邮箱：满足正则表达式即可      |
| phone           | String | no  | 50  | 电话号码                |
| idCardNumber    | String | no  | 50  | 身份证号码               |
| sign            | String | yes |     | 签名                  |
| callbackUrl     | String | no  | 200 | 回调地址                |

```json
{
  "merchantOrderNo": "C27412415HkF6U9SnXRrxitBWD647lw7",
  "realName": "aaaaaa",
  "amount": "100.1",
  "callbackUrl": "http://test.domin.com",
  "paymentType": 401,
  "email": "1QWWQWQ2891@qq.com",
  "phone": "123456789",
  "idCardNumber": "1234567890",
  "sign": "YOUR SIGN",
  "expirationTime": 1717092000000
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度  | 描述                           |
| --------------- | ---------- | --- | --- | ---------------------------- |
| merchantOrderNo | String     | yes | 32  | 商户订单号                        |
| tradeNo         | String     | yes | 32  | 平台订单号                        |
| amount          | String     | yes | 32  | 交易金额                         |
| paymentType     | Int        | yes | 3   | 支付方式                         |
| paymentInfo     | String     | yes | 32  | 主要付款信息，返回的是实际用于付款的信息，例如：付款编号 |
| additionalInfo  | JSONObject | no  |     | 扩展信息                         |
| status          | Int        | yes |     | 代收状态, 1:成功 3:失败                |
| errorMsg        | String     | no  |     | 错误信息,失败时返回                   |

```json
{
  "msg": "success",
  "code": 200,
  "data": {
    "amount": "100",
    "tradeNo": "TS2405220001MX0000048362685411",
    "merchantOrderNo": "C31412415HkF6U9SnXRrxitBWD647lw7",
    "paymentType": 204,
    "additionalInfo": {},
    "paymentInfo": "Xsdsadsadsad.com",
    "status": 1
  },
  "success": true
}
```
