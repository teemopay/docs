---
title: 银行列表
description: 代付支持的银行列表
---

| 银行编码 | 银行名称                                     |
|------|------------------------------------------|
| 001  | Banco de Chile - Edwards                 |
| 009  | Banco Internacional                      |
| 012  | Banco Estado (Banco del Estado de Chile) |
| 014  | Scotiabank                               |
| 016  | BCI (Bco de Credito e Inv)               |
| 017  | Banco do Brasil                          |
| 027  | Itau-Corpbanca                           |
| 028  | Banco Bice                               |
| 031  | Hsbc Bank                                |
| 035  | Banco Santiago                           |
| 037  | Banco Santander                          |
| 039  | Itau Chile                               |
| 041  | JP Morgan Chase Bank N.A.                |
| 043  | Banco de La Nacion Argentina             |
| 045  | The Bank of Tokyo-Mitsubishi Ufj Ltd     |
| 049  | Banco Security                           |
| 051  | Banco Falabella                          |
| 052  | Deutsche Bank (Chile)                    |
| 053  | Banco Ripley                             |
| 054  | Rabobank                                 |
| 055  | Banco Consorcio                          |
| 056  | Banco Penta                              |
| 057  | Banco Paris                              |
| 059  | Banco BTG Pactual                        |
| 099  | Banco Nuevo                              |
| 152  | Prepago Los Heroes                       |
| 504  | BBVA (Bco Bilbao Vizcaya Arg)            |
| 507  | Banco del Desarrollo                     |
| 875  | Mercado Pago                             |
| 732  | Los Andes                                |
| 730  | Tenpo                                    |


账户类型：

| ID  | 描述                        |
|-----|---------------------------|
| 601 | AHORRO （SAVING 储蓄账户）      |
| 602 | CORRIENTE （CHECKING 活期账户） |
| 603 | VISTA  (VISTA 账户)         |
| 604 | RUT  (RUT 账户)             |
| 605 | SALARY  ( SALARY 账户)      |


证件类型：

| 证件类型 | 示例         | 格式长度        | 描述                                                         | 规则说明                                                                 |
|----------|--------------|-----------------|--------------------------------------------------------------|--------------------------------------------------------------------------|
| RUT      | 12345678K    | 9 位（8 位数字 + 校验位） | Rol Único Tributario，智利的税号，适用于个人和公司。                | 校验位可为数字或字母 K，格式为：xxxxxxxx-z，API中应传为 xxxxxxxxz，仅使用字母数字字符。 |
| RUN      | 23456789K    | 9 位（8 位数字 + 校验位） | Rol Único Nacional，智利居民、外籍居民或非旅游签证入境者的唯一身份证号。 | 与 RUT 格式相同，8 位数字 + 1 校验码（数字或 K），仅传 alphanumeric 值（如 23456789K）。 |
| CE       | 34567890123  | 9 到 16 位数字   | Carnet de Extranjería，外籍身份证（如哥伦比亚等国家）。              | 只能为数字，长度 9~16。                                                  |
| PASS     | A1234567890  | 9 到 16 位字符   | Passport 护照，用于非本国居民的身份证明。                          | 可包含字母与数字，长度 9~16，保持原样传输。                              |


