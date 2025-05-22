---
title: 直连接口
description: 直连Easypaisa和Jazzcash
---

### 请求地址

| method | url                         |
|--------|-----------------------------|
| POST   | /api/pay/payment/create/v1 |


### 头部信息（header）

| header 参数   | 入参参数描述  |
|-------------|---------|
| timestamp   | 请求时间戳   |
| nonce       | 随机值     |
| country     | PK  |
| app_code    | app编号   |



### 支持的支付方式（paymentType）

| 支付方式名称                           | PaymentType (入参参数) |
|----------------------------------|--------------------|
| Easypaisa                        | 303                |
| Jazzcash                         | 304                |




### 请求参数

| 字段名          | 类型     | 是否必填 | 最大长度 | 描述                                            |
|--------------| ------ |------| ---- |-----------------------------------------------|
| merchantOrderNo | String | 是    | 32   | 商户订单号                                         |
| paymentType | Int    | 是    | -    | 支付方式，例如：303,304                               |
| idCardNumber | String | 否    | 13   | 客户身份证号码（13位数字），当paymentType为304:Jazzcash时,必传。 |
| amount     | String | 是    | 20   | 金额（以巴基斯坦卢比为单位，必须为整数）                          |
| realName   | String | 是    | 40   | 用户姓名（全大写，不包含特殊字符）                             |
| email      | String | 是    | 50   | 用户邮箱（格式正确即可）                                  |
| phone      | String | 是    | 10   | 电话号码（10位，不包含区号）                               |
| sign       | String | 是    | -    | 签名                                            |
| callbackUrl | String | 否    | 200  | 支付成功或失败后的回调地址                                 |






```json title= "请求示例"
{
    "merchantOrderNo": "OrderNoExample",
    "amount": "1000",
    "paymentType": 304,
    "email": "TeemoPay@example.com",
    "idCardNumber": "1234567890123",
    "callbackUrl": "https://www.callbackexample.com",
    "phone": "03000000000",
    "realName" : "TEEMO",
    "sign": "YOUR_SIGN"
}
```



### 返回参数

| 字段名               | 类型         | 是否必填 | 描述                       |
| ----------------- | ---------- |-----|--------------------------|
| merchantOrderNo | String     | 是   | 商户订单号                    |
| tradeNo         | String     | 是   | 平台交易号                    |
| amount          | String     | 是   | 交易金额                     |
| paymentType     | Int        | 是   | 支付方式，如：304               |
| paymentInfo     | String     |  否  | 无                        |
| additionalInfo  | JSONObject | 否   | 附加信息，如 availableChannels |
| status          | Int        | 是   | 订单状态：1-创建成功，3-失败         |
| errorMsg        | String     | 否   | 错误信息（仅失败时返回）             |




```json title= 返回示例
{
    "msg": "success",
    "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
    "code": 200,
    "data": {
        "amount": "1000.00",
        "tradeNo": "TS2501010001PK0000000000000000",
        "paymentType": 304,
        "merchantOrderNo": "OrderNoExample",
        "additionalInfo": {},
        "status": 1
    }
}
```
