---
title: KYC创建
description: 商户为用户创建KYC认证申请
---

KYC认证通过，系统将直接提高用户代付代收额度；若认证失败，则用户需再次发起申请并重新上传资料。

### 请求地址

| method | url                         |
|--------|-----------------------------|
| POST   | /api/pay/kyc/kycApplyFor    |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | KH     |
| app_code  | app 编号 |

### 请求参数

| 字段           | 类型     | 必需  | 长度  | 描述                              |
|--------------|--------|-----|-----|---------------------------------|
| idCardNumber | String | yes | 50  | 商户侧用户ID                         |
| phone        | String | yes | 8-9 | 用户真实手机号（柬埔寨手机号格式：8-9位，不含区号） |
| realName     | String | yes | 64  | 用户姓名                            |
| callbackUrl  | String | yes | 200 | 回调地址                            |
| sign         | String | yes |     | 签名                              |

```json title=请求示例
{
  "idCardNumber": "UserReferenceExample",
  "phone": "12345678",
  "realName": "TeemoPay",
  "callbackUrl": "https://www.callbackexample.com/kyc",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 字段                   | 类型     | 必需  | 长度  | 描述                              |
|----------------------|--------|-----|-----|---------------------------------|
| phone                | String | yes | 8-9 | 用户真实手机号（柬埔寨手机号格式：8-9位，不含区号） |
| authenticationStatus | String | yes |     | 认证状态：0-待认证、1-审核中、2-已批准、3-已拒绝、4-已失败 |
| authenticationUrl    | String | yes |     | 认证地址；如果状态为已拒绝，可通过该地址重新提交认证信息  |
| errorMsg             | String | yes |     | 失败原因                            |

```json title=成功示例
{
  "msg": "success",
  "code": "200",
  "data": {
    "phone": "12345678",
    "authenticationStatus": "0",
    "authenticationUrl": "https://www.kycexample.com/verify",
    "errorMsg": ""
  }
}
```

### 错误码

| 异常码 | 异常信息                                                                | 处理方案                 |
|-----|---------------------------------------------------------------------|----------------------|
| 412 | Please try again later                                              | 请稍后重试                |
| 614 | You already have a KYC apply that is either pending.                 | 您已有一个待处理的KYC申请       |
| 615 | Your KYC apply has been approved. No further verification is required. | 您的KYC申请已通过，无需进一步验证 |
| 500 | Business Error                                                      | 请联系我们                |
