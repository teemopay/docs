---
title: 创建代收
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
|--------|----------------------------|
| POST   | /api/pay/payment/create/v1 |

### 头部信息（header）

| header参数  | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | KR     |
| app_code  | app编号  |

### 支付方式列表（paymentType）

| 支付方式名称         | PaymentType (入参参数) |
|----------------|--------------------|
| VA             | 801                |
| KYC VA dynamic | 802                |

### 请求参数

| 字段                  | 类型      | 必需  | 最大长度 | 描述                                                                                                                                                                                                                                                         |
|---------------------|---------|-----|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantOrderNo     | String  | yes | 32   | 商户订单号                                                                                                                                                                                                                                                      |
| paymentType         | Integer | yes |      | 支付方式 【801: VA 802: KYC VA dynamic】                                                                                                                                                                                                                         |
| realName            | String  | yes | 64   | 用户姓名 【字母或者韩文不要超过20字符】                                                                                                                                                                                                                                      |
| merchantName        | String  | yes | 64   | 收款人名称                                                                                                                                                                                                                                                      |
| email               | String  | no  | 50   | 用户邮箱 【满足正则表达式即可】                                                                                                                                                                                                                                           |
| amount              | String  | yes | 20   | 代收金额 【整数 单位元 货币:KRW】                                                                                                                                                                                                                                       |
| bankCode            | String  | no  | 20   | 银行代码 ：代表接收转账或进行认证的金融机构标识。需传输由韩国金融结算院（KFTC）定义的 3 位标准代码（例如：国民银行 004，新韩银行 088）。当支付方式 设为 802 时，系统将触发特定的 KYC 逻辑，允许可选输 accountHolderNum（账户持有人识别码）。若该代码下未传输识别码，用户需在跳转后的 H5/App 认证页面内手动补全身份信息。                                                                     |
| bankAccount         | String  | no  | 20   | 持有人账户：用于实名认证（KYC）的标识信息。当支付方式 为 802 时，本字段支持可选传输：若调用接口时携带此字段，系统将预填至 KYC 认证页面以提升用户体验；若不传输，则由用户在认证流程中手动填写。                                                                                                                                                     |
| accountHolderNumber | String  | no  | 20   | 账户持有人识别码 (accountHolderNum)：用于实名认证（KYC）的标识信息。当支付方式为 802 时，本字段支持可选传输：若调用接口时携带此字段，系统将预填至 KYC 认证页面以提升用户体验；若不传输，则由用户在认证流程中手动填写。填写规范： 1. 个人用户：请提供居民注册号码（Resident ID）的前 6 位数字，格式为生年月日 YYMMDD（例：950101）； 2. 企业用户：请提供 10 位数字的事业者登录号（Business Registration Number）。 |
| expirationTime      | Long    | no  |      | 过期时间 【最大两个小时，为空默认两个小时； 毫秒级时间戳 eg:1735660800000】                                                                                                                                                                                                            |
| phone               | String  | no  | 20   | 用户手机号 【11位数；不携带区号 010开头】                                                                                                                                                                                                                                   |
| callbackUrl         | String  | no  | 200  | 代收回调地址 【若不传递，取商户后台配置的回调地址】                                                                                                                                                                                                                                 |
| sign                | String  | yes |      | 签名                                                                                                                                                                                                                                                         |

```json title="请求示例"
{
  "realName": "TeemoPay",
  "merchantName": "MerchantNameExample",
  "amount": "1000",
  "phone": "01012345678",
  "callbackUrl": "https://www.callbackexample.com",
  "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
  "email": "TeemoPay@example.com",
  "paymentType": 801,
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段              | 类型         | 必需  | 长度 | 描述                                   |
|-----------------|------------|-----|----|--------------------------------------|
| merchantOrderNo | String     | yes | 32 | 商户订单号                                |
| tradeNo         | String     | yes | 32 | 平台订单号                                |
| amount          | String     | yes | 32 | 交易金额                                 |
| paymentType     | Int        | yes | 10 | 支付方式 【801:VA】                        |
| paymentInfo     | String     | yes | 32 | 主要付款信息 【返回的是实际用于付款的信息，例如：Va 账号，付款编号 】 |
| additionalInfo  | JSONObject | no  |    | 附加信息 【辅助支付信息使用】支付方式802返回paymentLink  |
| status          | Int        | yes |    | 订单状态 【1: 支付中  3: 支付失败】               |
| errorMsg        | String     | no  |    | 错误信息【支付失败时返回】                        |

### 响应示例

```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2405220001KR0000430564883184",
    "additionalInfo": {
      "bankCode": "IBK",
      "bankName": "기업은행",
      "expiredTime": 1761022567000,
      "paymentLink": "https://test-kr-payin.teemopay.com/TS2405220001KR0000430564883184"
    },
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "paymentInfo": "29900000000000",
    "paymentType": 801,
    "status": 1
  }
}
```

### 校验错误码

| 异常码 | 异常信息                                                                | 处理方案                       |
|-----|---------------------------------------------------------------------|----------------------------|
| 412 | Please try again later                                              | 请稍后重试                      |
| 414 | *                                                                   | 更改对应参数                     |
| 423 | This payment method is not supported                                | 对应支付方式不支持，请查阅文档，如存在则联系我们配置 |
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

### 渠道错误信息

| errorMsg                                                             | 描述     |
|----------------------------------------------------------------------|--------|
| Transaction amount exceeds limit, kindly retry within allowed range. | 请求金额超限 |
| Channel request error, technicians will fix ASAP.                    | 渠道维护   |
| Unstable network, kindly retry later.                                | 渠道网络波动 |
| Parameter validation error, kindly verify and retry.                 | 参数上传有误 |

```json title=返回示例
{
  "code": 200,
  "data": {
    "merchantOrderNo": "2C2741241kCApltr2IATMy0c992278",
    "amount": null,
    "tradeNo": "TS2405220001KR0000430564883184",
    "paymentType": 801,
    "paymentInfo": null,
    "additionalInfo": null,
    "status": 3,
    "errorMsg": "Transaction amount exceeds limit, kindly retry within allowed range."
  },
  "msg": "success",
  "traceId": "f2b58c9c394d4b1595dd4e448ac741bc.1248.17645838103706945"
}
```