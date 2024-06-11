---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

## 支持支付方式列表（paymentType）

| 支付方式名称 | PaymentType (入参参数) |
| ------------ | ---------------------- |
| 201          | PSE (网银)             |
| 202          | NEQUI （电子钱包）     |
| 203          | BANCOLOMBIA (线下)     |
| 204          | 展示全部               |

#### additionalInfo （附加字段）字段说明：

| 字段名      | 类型       | 是否必传 | 说明     |
| ----------- | ---------- | -------- | -------- |
| paymentLink | String(32) | 是       | 支付链接 |

##### 

### 请求参数

| 字段            | 类型   | 必需 | 长度 | 描述                                          |
| --------------- | ------ | ---- | --- | --------------------------------------------- |
| merchantOrderNo | String | yes  | 32  | 商户订单号                                    |
| paymentType     | Int    | yes  |     | 支付方式: 支付方式列表 |
| amount          | String | yes  |     | 代收金额(索尔)                                |
| expirationTime  | Long   | yes  |     | 过期时间                                      |
| realName        | String | yes  |     | 用户姓名：大写，不包含特殊字符，40 个字符以内 |
| email           | String | yes  |     | 用户邮箱：满足正则表达式即可                  |
| phone           | String | yes  |     | 电话号码 9 位数不包含区号                     |
| remark          | String | no   |     | 交易备注                                      |
| sign            | String | yes  |     | 签名                                          |
| callbackUrl     | String | yes  |     | 回调地址                                      |

```json title="请求示例"
{
  "merchantOrderNo": "C27412415HkF6U9SnXRrxitBWD647lw7",
  "realName": "aaaaaa",
  "amount": "100",
  "callbackUrl": "http://test.domin.com",
  "paymentType": 101,
  "email": "1QWWQWQ2891@qq.com",
  "phone": "123456789",
  "sign": "YOUR SIGN",
  "expirationTime": 1717092000000,
  "timestamp": "1716276918582",
  "nonce": "Eppo2cbbVwWlN5ES0vAMPAbgxiQXXDdw",
  "country": "CO",
  "app_code": "YOUR APPCODDE"
}
```

### 返回参数

| 字段            | 类型       | 必需 | 长度 | 描述                                                     |
| --------------- | ---------- | ---- | ---- | -------------------------------------------------------- |
| merchantOrderNo | String     | yes  | 32   | 商户订单号                                               |
| tradeNo         | String     | yes  | 32   | 平台订单号                                               |
| amount          | String     | yes  | 32   | 交易金额                                                 |
| paymentType     | Int        | yes  | 10   | 支付方式                                                 |
| paymentInfo     | String     | yes  | 32   | 主要付款信息，返回的是实际用于付款的信息，例如：付款编号 |
| additionalInfo  | JSONObject | No   |      | 附加信息                                                 |

```json
{
  "msg": "success",
  "code": 200,
  "data": {
    "amount": "100",
    "tradeNo": "TS2405220001MX0000048362685411",
    "merchantOrderNo": "C31412415HkF6U9SnXRrxitBWD647lw7",
    "paymentType": 204,
    "additionalInfo": {
      "paymentLink": "Xsdsadsadsad.com"
    },
    "paymentInfo": "awqewqewqewqe",
    "status": 1
  },
  "success": true,
  "present": true
}
```

####
