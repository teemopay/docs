---
title: Create a payin order
description: 商户请求创建一个代收订单
---

### 请求地址

| method | url                        |
| ------ | -------------------------- |
| POST   | /api/pay/payment/create/v1 |

### Header

| Header Field | Description       |
| ------------ |-------------------|
| timestamp    | Request timestamp |
| nonce        | Random value      |
| country      | BP                |
| app\_code    | Application ID    |



### Request Parameters


| Field           | Type   | Required | Max Length | Description                                                                               |
| --------------- | ------ | -------- | ---------- | ----------------------------------------------------------------------------------------- |
| merchantOrderNo | String | yes      | 32         | Merchant order number                                                                     |
| amount          | String | yes      | 20         | Payment collection amount                                                                 |
| callbackUrl     | String | no       | 200        | Callback URL for collection result (if not provided, merchant configuration will be used) |
| sign            | String | yes      |            | Signature                                                                                 |



```json title="Sample Request"
{
    "amount": "1000",
    "sign": "YOUR_SIGN",
    "callbackUrl": "https://www.callbackexample.com",
    "merchantOrderNo": "OrderNoExample"
}
```

### Response Parameters

| Field           | Type       | Required | Length | Description                                                  |
| --------------- | ---------- | -------- | ------ | ------------------------------------------------------------ |
| merchantOrderNo | String     | yes      | 32     | Merchant order number                                        |
| tradeNo         | String     | yes      | 32     | Platform order number                                        |
| amount          | String     | yes      | 32     | Transaction amount                                           |
| paymentType     | Int        | yes      | 10     | Payment method (e.g., 10001)                                 |
| paymentInfo     | String     | yes      | 32     | Main payment information, such as a payment URL or reference |
| additionalInfo  | JSONObject | no       |        | Additional information: address and currency info            |
| status          | Int        | yes      |        | Order status: 1 = created successfully, 3 = failed           |
| errorMsg        | String     | no       |        | Error message, returned if the request failed                |



### 响应示例
```json
{
  "msg": "success",
  "traceId": "747bbf80261844ed85b809212aab0d81.85.17422898158610299",
  "code": 200,
  "data": {
    "amount": "1000.00",
    "tradeNo": "TS2501010001BP0000000000000000",
    "additionalInfo": {
      "addresses": [
        {
          "coin": "usdt_trc20",
          "address": "TAX9SYsqbedDyeR6ysS9spx8cXQNC8raR3"
        }
      ]
    },
    "merchantOrderNo": "OrderNoExample",
    "paymentInfo": "https://www.linkExample.com",
    "paymentType": 1,
    "status": 1
  }
}

```

```
