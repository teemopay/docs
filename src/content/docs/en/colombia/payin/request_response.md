---
title: Direct Payment Method Request and Response Examples
description: Colombia direct payment method request and response examples
---

## **PSE \- 201**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 201,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **WALLET（NEQUI_PSE） \- 202**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 202,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **CHECKOUT \- 204**



(Will be deprecated on August 1)



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 204,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **EFECTY \- 205**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 205,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **TRANSFIYA \- 209**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 209,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **MOVII (MOVIL_PSE) \- 210**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 210,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **DALE (DALE_PSE) \- 211**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 211,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **BREB_KEY \- 212**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 212,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
        "code": 200,
        "data": {
                "merchantOrderNo": "OrderNoExample",
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



## **NEQUI_PUSH \- 213**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 213,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **BREB_QR \- 214**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 214,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
        "code": 200,
        "data": {
                "merchantOrderNo": "OrderNoExample",
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



## **DAVIPLATA (DAVIPLATA_PSE) \- 207**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 207,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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



## **DAVIPLATA_PUSH \- 215**



Request



```json
{
    "merchantOrderNo": "OrderNoExample",
    "realName": "TeemoPay",
    "amount": "30000.00",
    "callbackUrl": "https://www.callbackexample.com",
    "paymentType": 215,
    "email": "TeemoPay@example.com",
    "phone": "3000000000",
    "bankCode": "1040",
    "idType" : "CC",
    "idCardNumber" : "123456789",
    "sign": "YOUR_SIGN",
    "expirationTime": 1718409600000
}
```



Response



```json
{
    "code": 200,
    "data": {
        "merchantOrderNo": "OrderNoExample",
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
