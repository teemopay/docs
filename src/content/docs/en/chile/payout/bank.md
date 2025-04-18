---
title: Bank List
description: Supported Bank List for Payout
---

| bankCode | bankName                                 |
|----------|------------------------------------------|
| 001      | Banco de Chile - Edwards                 |
| 009      | Banco Internacional                      |
| 012      | Banco Estado (Banco del Estado de Chile) |
| 014      | Scotiabank                               |
| 016      | BCI (Bco de Credito e Inv)               |
| 017      | Banco do Brasil                          |
| 027      | Itau-Corpbanca                           |
| 028      | Banco Bice                               |
| 031      | Hsbc Bank                                |
| 035      | Banco Santiago                           |
| 037      | Banco Santander                          |
| 039      | Itau Chile                               |
| 041      | JP Morgan Chase Bank N.A.                |
| 043      | Banco de La Nacion Argentina             |
| 045      | The Bank of Tokyo-Mitsubishi Ufj Ltd     |
| 049      | Banco Security                           |
| 051      | Banco Falabella                          |
| 052      | Deutsche Bank (Chile)                    |
| 053      | Banco Ripley                             |
| 054      | Rabobank                                 |
| 055      | Banco Consorcio                          |
| 056      | Banco Penta                              |
| 057      | Banco Paris                              |
| 059      | Banco BTG Pactual                        |
| 099      | Banco Nuevo                              |
| 152      | Prepago Los Heroes                       |
| 504      | BBVA (Bco Bilbao Vizcaya Arg)            |
| 507      | Banco del Desarrollo                     |
| 672      | Coopeuch                                 |


ACCOUNT TPYE：

| ID  | 描述                           |
|-----|------------------------------|
| 601 | AHORRO （SAVING ACCOUNT）             |
| 602 | CORRIENTE （CHECKING ACCOUNT） |
| 603 | VISTA  (VISTA ACCOUNT)       |
| 604 | RUT  (RUT ACCOUNT)                |
| 605 | SALARY  ( SALARY ACCOUNT)         |


 DOCUMENT TYPE

| DOCUMENT TYPE | EXAMPLE     | LENGTH                  | DESCRIPTION                                               | RULES                                                                                  |
|---------------|-------------|--------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------|
| RUT           | 12345678K   | 9 digits (8 numbers + 1 check digit) | Rol Único Tributario, Chilean tax ID used for individuals and companies. | The check digit can be a number or the letter 'K'. Format: xxxxxxxx-z. API should send it as xxxxxxxxz (alphanumeric only). |
| RUN           | 23456789K   | 9 digits (8 numbers + 1 check digit) | Rol Único Nacional, a unique ID for Chilean residents, foreign residents, or anyone staying in Chile on non-tourist visas. | Same format as RUT: 8 digits + 1 check digit (number or 'K'), use alphanumeric only (e.g., 23456789K). |
| CE            | 34567890123 | 9 to 16 digits           | Carnet de Extranjería, foreign national ID (e.g., Colombia).              | Numbers only, length between 9 to 16 digits.                                            |
| PASS          | A1234567890 | 9 to 16 characters       | Passport, used for identification of non-national residents.              | Can include both letters and numbers, length 9–16, send as-is.                          |
