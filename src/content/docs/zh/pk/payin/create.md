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
| country                   | 国家码(PK) |
| app_code                  | app编号   |

## 支持支付方式列表（paymentType）

| 支付方式名称 | PaymentType (入参参数) |
| ------------ | ---------------------- |
| 支付信息     | 302                    |


#### additionalInfo （附加字段）字段说明：

##### 当支付方式为 302：additionalInfo 返回包含以下字段：

| 字段名            | 类型       | 长度 | 是否必传 | 说明                    |
| ----------------- | ---------- | ---- | -------- | ----------------------- |
| availableChannels | 字符串列表 |      | 是       | 包含easypaisa和jazzcash |

##### 

### 请求参数

| 字段            | 类型   | 必需  | 长度  | 描述                       |
| --------------- | ------ |-----|-----|--------------------------|
| merchantOrderNo | String | yes | 32  | 商户订单号                    |
| paymentType     | Int    | yes |     | 支付方式: 302                |
| idCardNumber    | String    | yes | 13  | 客户身份证ID 13位整数            |
| amount          | String | yes | 20  | 代收金额(巴基斯坦卢比) 金额需传整数      |
| realName        | String | yes | 40  | 用户姓名：大写，不包含特殊字符，40 个字符以内 |
| email           | String | yes | 50  | 用户邮箱：满足正则表达式即可           |
| phone           | String | yes | 10  | 电话号码 10 位数不包含区号          |
| sign            | String | yes |     | 签名                       |
| callbackUrl     | String | no  | 200 | 回调地址                     |

```json title="请求示例"
{
    "merchantOrderNo": "1234567890",
    "realName": "CESHI",
    "amount": "300000",
    "callbackUrl": "http://ceshi/test",
    "paymentType": 302,
    "email": "1234567890@qq.com",
    "phone": "1234567890",
    "sign": "Teemopay_sign",
    "idCardNumber": "1234567890"
}
```

### 返回参数

| 字段            | 类型       | 必需 | 长度 | 描述                                                         |
| --------------- | ---------- | ---- | ---- | ------------------------------------------------------------ |
| merchantOrderNo | String     | yes  | 32   | 商户订单号                                                   |
| tradeNo         | String     | yes  | 32   | 平台订单号                                                   |
| amount          | String     | yes  | 32   | 交易金额                                                     |
| paymentType     | Int        | yes  | 10   | 支付方式：302                                                |
| paymentInfo     | String     | yes  | 32   | 主要付款信息，返回的是实际用于付款的信息，例如：付款编号，订单号ID |
| additionalInfo  | JSONObject | No   |      | 附加信息                                                     |
| status          | Int        | yes |    | 1-订单创建成功  3-失败               |
| errorMsg        | String     | no  |    | 错误信息,失败时返回                   |
#### 不同支付方式的响应示例：

#### 当 PaymentType 为 302 ：

```json
{
  "merchantOrderNo": "1234567890",
  "amount": "300000",
  "tradeNo": "TS2405210000MX0000075312734955",
  "paymentType": 302,
  "paymentInfo": "",
  "additionalInfo": {
    "availableChannels": [
      "easypaisa",
      "jazzcash"
    ]
  },
  "status": 0,
  "errorMsg": null
}
```

