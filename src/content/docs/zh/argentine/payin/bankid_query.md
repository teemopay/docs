---
title: 根据凭证ID查询悬账流水
---

### 请求地址

| method | url                                          |
|--------|----------------------------------------------|
| POST   | /api/pay/payment/query/suspense/orderInfo/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | AR     |
| app_code  | app 编号 |

### 请求参数

| 字段     | 类型     | 必需  | 长度 | 描述                    |
|--------|--------|-----|----|-----------------------|
| bankId | String | yes | 64 | 凭证id：阿根廷bankId、印度：utr |
| sign   | String | yes |    | 签名                    |

```json title=请求示例
{
  "bankId": "WY7ZEPN6MPRZZGJO2Q0M51",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数                   | 类型      | 必需  | 长度 | 描述                    |
|----------------------|---------|-----|----|-----------------------|
| suspenseAmount       | String  | yes |    | 单次入账金额                |
| theoreticalAmount    | String  | yes |    | 建议金额 (补单范围)           |
| suspenseStatus       | Integer | yes |    | 0 ：（未认领） 1: （已认领）     |
| suspenseIdCardNumber | String  | yes |    | 实际付款人身份信息（CUIT 或 DNI） |
| suspenseRealName     | String  | yes |    | 实际付款人姓名               |
| suspenseCallbackTime | String  | yes |    | 该流水入账时间               |

```json title=返回示例
{
  "code": 200,
  "msg": "success",
  "data": {
    "suspenseAmount": "1000.00",
    "suspenseStatus": 0,
    "suspenseIdCardNumber": "27382938192",
    "suspenseRealName": "CARLOS ALVAREZ",
    "suspenseCallbackTime": "2026-03-16 05:02:23"
  },
  "traceId": "0b12131dd4951a36d19022a31b303.11.1742356800"
}
```

### 错误码

| 异常码  | 异常信息                            | 处理方案            |
|------|---------------------------------|-----------------|
| 401  | INVALID_PARAMS                  | bankId长度不能超过64位 |
| 700  | BANK_ID_ALREADY_CLAIMED_SUCCESS | bankId已被认领      |
| 701  | BANK_ID_NOT_EXIST               | 传输的bankId不存在    |
| 702  | SUSPENSE_ACCOUNT_STATUS_ERROR   | 悬帐状态异常（请与我们联系）  |
| 703  | ORDER_NOT_RECEIVED_YET          | 订单尚未入帐          |
| 500  | Business Error                  | 业务异常 （请与我们联系）   |
| 非200 | 其他异常                            | 请与我们联系          |

```json title=错误返回示例
{
  "code": 701,
  "data": null,
  "msg": "BANK_ID_NOT_EXIST",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.95.17739950014371593"
}
```