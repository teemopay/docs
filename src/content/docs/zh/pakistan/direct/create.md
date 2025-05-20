---
title: 直连接口
description: 
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

| 字段名               | 类型     | 是否必填 | 最大长度 | 描述                   |
| ----------------- | ------ | ---- | ---- |----------------------|
| `merchantOrderNo` | String | 是    | 32   | 商户订单号                |
| `paymentType`     | Int    | 是    | -    | 支付方式，例如：303          |
| `idCardNumber`    | String | 是    | 13   | 客户身份证号码（13位数字）       |
| `amount`          | String | 是    | 20   | 金额（以巴基斯坦卢比为单位，必须为整数） |
| `realName`        | String | 是    | 40   | 用户姓名（全大写，不包含特殊字符）    |
| `email`           | String | 是    | 50   | 用户邮箱（格式正确即可）         |
| `phone`           | String | 是    | 10   | 电话号码（10位，不包含区号）      |
| `sign`            | String | 是    | -    | 签名                   |
| `callbackUrl`     | String | 否    | 200  | 支付成功或失败后的回调地址        |






```json title= "请求示例"
{
  "amount": 100,
  "callbackUrl": "https://pk.api.starpago.com/api/v2/payment/pk_teemopay/notify",
  "email": "Marion@gmail.com",
  "idCardNumber": "3149586651931",
  "merchantOrderNo": "dsdd6e634d1df95541199d236f77d6",
  "paymentType": "303",
  "phone": "3474449652",
  "realName": "AMARISTAMM",
  "sign": "WuKuruntcaj1Yx4AgopSYqP1GKVBF0HDaPAVvAtvvnufx4tHFgLZHrjs07FklKksnx3dd3jk4S1Utogncj93klPHrHDAGURbdx7kZX+BAbhMnj+4qMzqUMeZbVvM8WyuK08YHxspajuw3dBnn/8VCRFKfhIZ8xE3tZHXgKfB68w="
}
```



### 返回参数

| 字段名               | 类型         | 是否必填 | 描述                         |
| ----------------- | ---------- | ---- | -------------------------- |
| `merchantOrderNo` | String     | 是    | 商户订单号                      |
| `tradeNo`         | String     | 是    | 平台交易号                      |
| `amount`          | String     | 是    | 交易金额                       |
| `paymentType`     | Int        | 是    | 支付方式，如：302                 |
| `paymentInfo`     | String     | 是    | 支付信息，实际用于支付的 ID，如付款编号等     |
| `additionalInfo`  | JSONObject | 否    | 附加信息，如 `availableChannels` |
| `status`          | Int        | 是    | 订单状态：1-创建成功，3-失败           |
| `errorMsg`        | String     | 否    | 错误信息（仅失败时返回）               |




```json title= 返回示例（303 支付方式）
{
  "amount": "100",
  "tradeNo": "TS2504190001PK0000295066026360",
  "merchantOrderNo": "dsdd6e634d1df95541199d236f77d6",
  "paymentType": 303,
  "additionalInfo": {},
  "status": 1
}
```