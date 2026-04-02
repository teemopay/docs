# Balance Inquiry

## Request

| Method | URL |
|--------|-----|
| POST | `/api/pay/merchant/balance` |

## Request Headers

| Header | Description |
|--------|-------------|
| timestamp | Request timestamp |
| nonce | Random value |
| country | IN |
| app_code | Application code |

## Request Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| sign | String | Yes | — | Signature |

**Request Example**
```json
{
  "sign": "YOUR_SIGN"
}
```

## Response Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| totalAmount | String | Yes | Total balance |
| frozenAmount | String | Yes | Frozen amount |
| availAmount | String | Yes | Available balance |

**Response Example**
```json
{
    "code": 200,
    "data": {
        "totalAmount": "12000.00",
        "frozenAmount": "2000.00",
        "availAmount": "10000.00"
    },
    "msg": "success",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```

## Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| 412 | Please try again later | Retry later |
| 414 | * | Correct the corresponding parameter |
| 416 | Application not found | Invalid `app_code`, please update |
| 417 | Merchant account not found | Merchant account not found, contact us |
| 500 | Business Error | Contact us |

**Error Response Example**
```json
{
    "code": 416,
    "data": null,
    "msg": "Application not found",
    "traceId": "0801113131dd4951a36d19022a31b303.94.17423567008990449"
}
```