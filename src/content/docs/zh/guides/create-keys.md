---
title: 创建密钥
description: 商户创建和使用公私钥
---

## 步骤说明

1. 创建公钥和私钥（两种方法选其一）
   1. 方法一：使用命令行创建；
   2. 方法二：使用密钥生成工具创建（建议使用此方法）；
2. 在 Teemopay 填写生成的公钥并保存好您的私钥；
3. 接口调用时加密和验签；

## 操作示例

### 第一步：创建公钥和私钥（两种方法选其一）

#### 方法一：使用命令行创建

如果您使用的 Windows 系统，请打开「命令提示符」（CMD）或「PowerShell」，执行以下命令：

```bash
# 生成 1024 位的私钥
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:1024

# 从私钥生成公钥
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

如果您使用的是 macOS 系统，请打开「终端」，执行以下命令：

```bash
# 如果您没有安装 openssl 请先安装，若已安装请跳过本步骤
brew install openssl

# 生成 1024 位的私钥
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:1024

# 从私钥生成公钥
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

#### 方法二：使用密钥生成工具创建（建议使用此方法）

访问网址：[公私钥生成在线工具](https://uutool.cn/rsa-generate/)

密钥长度选择：1024

格式选择：PKCS8

![公私钥生成在线工具](https://image.xiwu.me/2024/812b469da11fd34b0ccc5357893a4917.png)

此时我们得到：公钥和私钥（使用时不要有空格和换行，请妥善保管私钥，公钥将在本文第二步中使用）

:::caution[注意]
以下密钥仅作为示例，请勿直接使用，造成安全事故请自负责任！！！
:::

```shell
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYYiW70DK6/dmiLw7Aj1WIxFnD
Yt5AFYYMskeN00xcBPC8qWjn1tkfJncBdBMCdXBvtw1K2QcIHJ8xcSAjhxkySjeO
N7ufpqyDLzv5MWMTWjnIxhLdP3D29tAwkdY/lnG2qlhWz17YzOuDfY26h85TqigN
uB6XscZ0EuFNbHX8xwIDAQAB
-----END PUBLIC KEY-----

-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANhiJbvQMrr92aIv
DsCPVYjEWcNi3kAVhgyyR43TTFwE8LypaOfW2R8mdwF0EwJ1cG+3DUrZBwgcnzFx
ICOHGTJKN443u5+mrIMvO/kxYxNaOcjGEt0/cPb20DCR1j+WcbaqWFbPXtjM64N9
jbqHzlOqKA24HpexxnQS4U1sdfzHAgMBAAECgYEAtmiupJATY/0BDS6cQgnSsjPL
8+ERuHYsheF4Xn/EfEIR6wjpDZ/ZcuALLGd8avMzcImgo/smaVkvfg9+Z1TJEEYM
LBoR//zJUTlSkXHKYPibMFS1gnOhu1izq6l+qOQA5GPa4zMSifzo2Otq/6+Rtr2I
2UswwxGtyRcIfsXp8wkCQQDvs3dwq2GEN3v7XzqNBpLfvPS0WHGfNutFI5ZICPR7
V8+FufoOOnJ16nTWya8vWWWuKdMLdh/fn8HxWikkD42dAkEA5xjI7NGTZ9T/VN+9
OiI+NiOnBnIfxo5gCQiyTd5tWcmQ5YBOwsGFK7BQr4FiBrTfrclrV6blYQApqeVi
MAhYswJAAo9sKyvpcrwU+u5ddbwoPXOLOZHoRMcVZDupE0PlOJwLf2YpIZXGOzQx
40lsMZlG2MFhm7G7TWwraiSIY/Y2kQJBANAJ+edni6Gvl+RaPsk0xniKg/RDjON8
jGvVjl6XXC22TWCtrzmYaUA5S4mTmiGbdrnGV4Hi1yAJu3gc7dV7zg0CQDEnqvJg
hWrWrRlt0KpVg0a6nsXDLxPtrzPTARsFGAt/qfvuozsiviIWzKKL/Iq6vsJvpuyO
ldfIyZPoMCcJuqc=
-----END PRIVATE KEY-----
```

### 第二步：在 Teemopay 填写生成的公钥并保存好您的私钥

页面路径：商户中心 >> 应用列表

如果此时您没有应用，请点击「添加应用」创建一个；

如果您已经有了应用，请点击小齿轮图标，进入应用设置页面；

![应用列表](https://image.xiwu.me/2024/9c7cc0049a905d256fea469aa069e529.png)

在应用设置页面，点击「交换公钥」按钮，并在弹窗中输入谷歌码验证；

![应用设置](https://image.xiwu.me/2024/5932597de507a9164989ff96b5ae13fe.png)

验证完谷歌码，我们将在弹窗中看到如下界面：

1. 我们将上一个步骤生成的 公钥 填写到弹窗中 「商户公钥」 的位置；
2. 填写时不需要「-----BEGIN PUBLIC KEY-----」和「-----END PUBLIC KEY-----」部分；
3. 复制并保存 「平台公钥」，后续将使用；
4. 注意：密钥是成对的，如果您更换了公钥私钥，需要再次更改您的商户公钥；

![交换公钥](https://image.xiwu.me/2024/6ca888a3247afdba1b8a72be1ebb0bbf.png)

### 第三步：接口调用时加密和验签

参考 [鉴权示例](/zh/guides/authentication) 章节。
