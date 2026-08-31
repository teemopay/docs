---
title: KYC状态查询
description: 商户查询用户的KYC认证状态
---

### 请求地址

| method | url                           |
|--------|-------------------------------|
| POST   | /api/pay/kyc/kycStatusQuery   |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | KH     |
| app_code  | app 编号 |

### 请求参数

| 字段    | 类型     | 必需  | 长度  | 描述                       |
|-------|--------|-----|-----|--------------------------|
| phone | String | yes | 8-9 | 用户真实手机号，柬埔寨本地号码，不含国家区号 |
| sign  | String | yes |     | 签名                       |

```json title=请求示例
{
  "phone": "104837292",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段                   | 类型     | 必需  | 长度 | 描述                            |
|----------------------|--------|-----|----|-------------------------------|
| authenticationStatus | String | yes |    | 认证状态：0-待认证、1-审核中、2-已批准、3-已拒绝、4-已失败 |
| errorMsg             | String | yes |    | 失败原因                          |

```json title=成功示例
{
  "msg": "success",
  "code": "200",
  "data": {
    "authenticationStatus": "3",
    "errorMsg": "The file and type do not match"
  }
}
```

### 错误码

| 异常码 | 异常信息                               | 处理方案       |
|-----|------------------------------------|------------|
| 412 | Please try again later             | 请稍后重试      |
| 619 | This user phone is not registered. | 此用户手机未注册 |
| 500 | Business Error                     | 请联系我们      |
