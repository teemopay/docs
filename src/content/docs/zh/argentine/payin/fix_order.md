---
title: 补单接口
---

### 请求地址

| method | url                          |
|--------|------------------------------|
| POST   | /api/pay/payment/fixOrder/v1 |

### 头部信息（header）

| header 参数 | 入参参数描述 |
|-----------|--------|
| timestamp | 请求时间戳  |
| nonce     | 随机值    |
| country   | AR     |
| app_code  | app 编号 |

### 请求参数

| 字段              | 类型     | 必需  | 长度 | 描述                               |
|-----------------|--------|-----|----|----------------------------------|
| bankId          | String | yes | 32 | 用户支付银行单号，凭证id：阿根廷为bankid、印度：utr. |
| merchantOrderNo | String | yes |    | 商户订单号                            |
| sign            | String | yes |    | 签名                               |

```json title=请求示例
{
  "bankId": "pvbankid104",
  "merchantOrderNo": "cvu_test_204",
  "sign": "YOUR_SIGN"
}
```

### 返回参数

| 参数           | 类型     | 必需  | 长度 | 描述                        |
|--------------|--------|-----|----|---------------------------|
| amount       | Number | yes |    | 入账金额                      |
| tradeNo      | String | yes |    | 平台单号                      |
| bankId       | String | yes |    | 凭证id                      |
| mchOrderId   | String | yes |    | 商户订单号                     |
| callbackTime | String | yes |    | 流水创建时间                    |
| status       | String | yes |    | 认领成功状态  0 ：（未认领） 1: （已认领） |

```json title=返回示例
{
  "code": 200,
  "data": {
    "amount": "5.00",
    "tradeNo": "TS2405220001AR0000505867138310",
    "bankId": "xiashjadyuqwgbeqwe——1638",
    "mchOrderId": "cvu_test_212",
    "callbackTime": "2026-03-20 05:50:24",
    "status": 1
  },
  "msg": "success",
  "traceId": "54cb0821b4d940639bc11917e24c43a7.95.17739966234947325"
}
```

### 错误码

| 异常码  | 异常信息                            | 处理方案            |
|------|---------------------------------|-----------------|
| 401  | INVALID_PARAMS                  | bankId长度不能超过32位 |
| 700  | BANK_ID_ALREADY_CLAIMED_SUCCESS | bankId已被认领      |
| 701  | BANK_ID_NOT_EXIST               | 传输的bankId不存在    |
| 702  | SUSPENSE_ACCOUNT_STATUS_ERROR   | 悬帐状态异常（请与我们联系）  |
| 703  | ORDER_NOT_RECEIVED_YET          | 订单尚未入帐          |
| 704  | MERCHANT_ORDER_NO_NOT_EXIST     | 商户订单号不存在        |
| 705  | MERCHANT_NO_ALREADY_BOUND       | 商户订单已被绑定        |
| 706  | BANK_ID_AMOUNT_NOT_MATCH_ORDER  | 悬帐金额与订单金额不一致    |
| 500  | Business Error                  | 业务异常 （请与我们联系）   |
| 非200 | 其他异常                            | 请与我们联系          |

```json title=错误返回示例
{
  "code": 706,
  "data": null,
  "msg": "BANK_ID_AMOUNT_NOT_MATCH_ORDER",
  "traceId": "0b12131dd4951a36d19022a31b303.11.1742356800"
}
```