# Query Collection (PayIn) Order

## Request

| Method | URL |
|--------|-----|
| POST | `/api/pay/payment/query/v1` |

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
| merchantOrderNo | String | Yes | 32 | Merchant order number |
| sign | String | Yes | — | Signature |

**Request Example**
```json
{
  "merchantOrderNo": "OrderNoExample",
  "sign": "YOUR_SIGN"
}
```

## Response Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| merchantOrderNo | String | Yes | Merchant order number |
| tradeNo | String | Yes | Platform order number |
| paymentType | Int | Yes | Payment method: `1001` (Aggregated Page), `1002` (QR), `1003` (PHONEPE), `1004` (PAYTM) |
| transactionAmount | String | Yes | Transaction amount |
| amount | String | Yes | Received amount |
| status | String | Yes | Order status: `1` Processing, `2` Success, `3` Failed |
| serviceAmount | String | Yes | Service fee (e.g., 18.02) |
| paymentInfo | String | Yes | Primary payment information — actual details used for the payment |
| errorMessage | String | No | Error message if order failed |
| statementList | Object | No | Collection transaction records |
| — paymentSingleOrderNo | String | Yes | Single-payment transaction number |
| — paymentStatementAmount | String | Yes | Amount collected in this transaction |
| — paymentStatementStatus | Int | Yes | Single transaction status: `2` Success, `3` Failed |
| — paymentStatementStatusName | String | Yes | Status label |
| — serviceAmount | String | Yes | Service fee = fixed fee + transaction amount × service rate |
| — serviceRate | String | Yes | Service rate |
| — immService | String | Yes | Fixed fee |
| — paymentType | Int | Yes | Actual payment method used |
| — identifier | String | Yes | Voucher / Bank ID |
| — idCardNumber | String | Yes | Actual payer's ID document |
| — payerName | String | Yes | Actual payer's name |
| — completeTime | String | Yes | Completion time — local timezone, format: `yyyy-MM-dd HH:mm:ss` |

**Response Example**
```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
        "amount": "1000.00",
        "transactionAmount": "1000.00",
        "tradeNo": "TS2501010001AR0000000000000000",
        "paymentType": 901,
        "paymentInfo": "123haiaerioe13123890128390123",
        "status": 2,
        "serviceAmount": "15.00",
        "statementList": [
            {
                "paymentSingleOrderNo": "TSOPaymentOrderNoExample1",
                "paymentStatementAmount": "1000.00",
                "paymentStatementStatus": 2,
                "paymentStatementStatusName": "Collection Success",
                "completeTime": "2025-01-01 00:00:00",
                "serviceAmount": "15.00",
                "serviceRate": "0.0100",
                "immService": "5.00",
                "paymentType": 901,
                "identifier": "2321312321222",
                "idCardNumber": "Carlos",
                "payerName": "WEUSISH28282SDSAS"
            }
        ]
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
| 434 | Merchant order not exist | Check the submitted order number |
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
