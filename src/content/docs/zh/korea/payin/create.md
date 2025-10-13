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

## 支付方式列表（paymentType）

| 支付方式名称 | PaymentType (入参参数) |
|-------|--------------------|
| VA    | 801                |


### 请求参数

| 字段              | 类型      | 必需  | 最大长度 | 描述                                       |
|-----------------|---------|-----|------|------------------------------------------|
| merchantOrderNo | String  | yes | 32   | 商户订单号                                    |
| paymentType     | Integer | yes |      | 支付方式: 801: VA                            |
| realName        | String  | yes | 64   | 用户姓名 字母或者韩文不要超过20字符                      |
| email           | String  | no  | 50   | 用户邮箱：满足正则表达式即可                           |
| amount          | String  | yes | 20   | 代收金额 整数 单位元 (货币:KRW)                     |
| expirationTime  | Long    | no  |      | 最大两个小时，为空默认两个小时； 毫秒级时间戳 eg:1735660800000 |
| phone           | String  | no  | 20   | 用户手机号 11位数；不携带区号； 010开头                  |
| callbackUrl     | String  | no  | 200  | 代收回调地址 （若不传递，取商户后台配置的回调地址）               |
| sign            | String  | yes |      | 签名                                       |


```json title="请求示例"
{
  "merchantOrderNo":"test_001",
  "paymentType":801,
  "amount": "120",
  "realName": "realName",
  "email": "123@123.com",
  "phone":"01012343211",
  "sign": "your  sign"
}
```

### 返回参数

| 字段            | 类型       | 必需  | 长度 | 描述                      |
| --------------- | ---------- |-----| ---- |-------------------------|
| merchantOrderNo | String     | yes | 32   | 商户订单号                   |
| tradeNo         | String     | yes | 32   | 平台订单号                   |
| amount          | String     | yes | 32   | 交易金额                    |
| paymentType     | Int        | yes | 10   | 支付方式 801:VA             |
| paymentInfo     | String     | yes | 32   | 支付信息                    |
| additionalInfo  | JSONObject | no  |      | 附加信息：辅助支付信息使用           |
| status          | Int        | yes |    | 订单状态 1: 支付中  3: 支付失败    |
| errorMsg        | String     | no  |    | 错误信息,支付失败时返回  （具体参考错误码） |


### 响应示例

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "120.00",
    "tradeNo": "tradeNo",
    "additionalInfo": {},
    "merchantOrderNo": "test_001",
    "paymentInfo": null,
    "paymentType": 801,
    "status": 1
  }
}
```



### 错误码

| errorMsg                                | 描述     |
| ------------------------------------------- |--------|
| Transaction amount exceeds limit, kindly retry within allowed range. | 请求金额超限 |
| Channel request error, technicians will fix ASAP. | 渠道维护   |
| Unstable network, kindly retry later. | 渠道网络波动 |
| Parameter validation error, kindly verify and retry. | 参数上传有误 |