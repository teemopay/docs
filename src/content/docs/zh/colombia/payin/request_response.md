---
title: 直连支付方式请求和响应示例
description: 哥伦比亚直连支付方式请求和响应示例
---

## **PSE（网银支付 ACH） \- 201**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000040",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 201,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000040",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010033",
        "paymentType": 201,
        "paymentInfo": "https://mock/pse/",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833191761712117"
}
```



## **WALLET \(****NEQUI\_PSE****\) 支付链接 \- 202**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000042",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 202,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000042",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010035",
        "paymentType": 202,
        "paymentInfo": "https://mock/nequi/",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833223479926545"
}
```



## **CHECKOUT（包含所有方式支付链接） \- 204**



\(将于8月1号下架\)



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000043",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 204,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000043",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010036",
        "paymentType": 204,
        "paymentInfo": "https://mock/checkout/",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.111.17833223854885533"
}
```



## **EFECTY（线下） \- 205**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000052",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 205,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000052",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010045",
        "paymentType": 205,
        "paymentInfo": "https://mock/effecty",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833226914067027"
}
```



## **Transfiya \- 209**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000053",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 209,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000053",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010046",
        "paymentType": 209,
        "paymentInfo": null,
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.111.17833227364565669"
}
```



## **MOVII \- 210**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000044",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 210,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000044",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010037",
        "paymentType": 210,
        "paymentInfo": "https://mock/MOVII/",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.108.17833224470100937"
}
```



## **DALE \- 211**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000051",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 211,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000051",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010044",
        "paymentType": 211,
        "paymentInfo": "https://mock/dale",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.108.17833226564021067"
}
```



## **BREB \- 212**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000054",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 212,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
        "code": 200,
        "data": {
                "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000054",
                "amount": "30000.00",
                "tradeNo": "TS2405220001CO0000000000010047",
                "paymentType": 212,
                "paymentInfo": "https://mock/breb",
                "additionalInfo": {
                        "paymentFactory": "@mockdakjfjsdf"
                },
                "status": 1,
                "errorMsg": null
        },
        "msg": "success",
        "traceId": "30c38418a758434dba4da32fe73b5fd2.108.17833227537161157"
}
```



## **NEQUI\_PUSH（钱包直连） \- 213**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000047",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 213,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000047",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010040",
        "paymentType": 213,
        "paymentInfo": null,
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.111.17833225481095601"
}
```



## **BRE\_B\_QR \- 214**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000055",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 214,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
        "code": 200,
        "data": {
                "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000055",
                "amount": "30000.00",
                "tradeNo": "TS2405220001CO0000000000010048",
                "paymentType": 214,
                "paymentInfo": "https://mock/breb-qr",
                "additionalInfo": {
                        "paymentFactory": "mockqrString"
                },
                "status": 1,
                "errorMsg": null
        },
        "msg": "success",
        "traceId": "30c38418a758434dba4da32fe73b5fd2.111.17833228205815697"
}
```



## **DAVIPLATA \- 207**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000049",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 207,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000049",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010042",
        "paymentType": 207,
        "paymentInfo": "https://mock/daviplata",
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833225779426893"
}
```



## **CO\_DAVIPLATA\_PUSH \- 215**



请求



```json
{
    "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000050",
    "realName": "OPQRST UVWXYZ ABCDEFG HIJKLMN",
    "amount": "30000.00",
    "callbackUrl": "http://192.168.110.138:8075/sys/dictionary/test",
    "paymentType": 215,
    "email": "12123123@ss.com",
    "phone": "1234567890",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "uOunEdixuTptztITS1xVQK7EokviXGkNjnSupauc/keqQogkyigiks8R9gXG66RPAXgkMNFnM9xTOu0YBkajFE+oiQU+hvmiXg1TcPAy6RF0TZTmrI7Ya06NWtRUzIOPO0a6GyOjHA86hfIP3tfXRBB07F2AwnOXv8nzCKUGUY4=",
    "expirationTime": 1718409600000
}
```



响应



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "C0041241HmIRUJ6qsqV9UHz8n0000050",
        "amount": "30000.00",
        "tradeNo": "TS2405220001CO0000000000010043",
        "paymentType": 215,
        "paymentInfo": null,
        "additionalInfo": {},
        "status": 1,
        "errorMsg": null
    },
    "msg": "success",
    "traceId": "30c38418a758434dba4da32fe73b5fd2.106.17833226186646939"
}
```
