---
title: 操作手册
description: Teemopay 商户后台操作手册
---

## 后台管理系统

商户后台管理系统包含五个部分，分别为：首页、交易中心、财务中心、下载中心、商户中心；
以测试环境为例，以下分别向您介绍各个模块：

### 首页

在首页主要展示您账户的资金和交易数据，如果您与 Teemopay 在多个国家有业务合作，那么您可以在右上角切换所要查看的国家账户数据。

![首页](https://image.xiwu.me/2024/3b2692dd1d15ffc9e805bb01e643f82c.png)

### 交易中心

在交易中心主要展示您账户的交易数据，包括交易类型、交易金额、交易时间、交易状态等。

1. 代收订单
   交易中心代收订单展示您的程序通过 API 请求创建的代收订单，可以通过搜索查询和验证指定订单的状态和金额，在一些情况下创建一个代收订单，但您的用户可以多次支付，查看此类子订单请点击「详情」按钮。

   ![代收订单](https://image.xiwu.me/2024/186f6be0e3807f132b3934e0e96f9a67.png)

2. 代付订单
   交易中代付订单展示您的程序通过 API 请求创建的代付订单，可以通过搜索查询和验证指定订单的状态和金额。

   ![代付订单](https://image.xiwu.me/2024/bb9703e287fd045893fe7ac8a5647168.png)

### 财务中心

1. 资金管理
   财务中心资金管理是您账户资金信息的展示页面，您可以通过发起：充值、提现、商户转账工单，对资金进行管理，一旦您发起工单我们的财务人员将尽快为您通过，如果想要加急，请在提交后与我们的业务人员联系。值得一提的是，当您发起商户转账时，获知对方商户的账户号就会非常关键。

   ![资金管理](https://image.xiwu.me/2024/cea14865461bd59b38d214b75eaf359f.png)

2. 账户明细
   财务中心账户明细是您账户流水信息的展示页面，流水在交易完成后产生，系统会按天统计并展示。您可以在本页面查看前一天及之前每日的出入帐金额和各种资金数据。

   ![账户明细](https://image.xiwu.me/2024/f70e96246b7e08ef13d111d96a2cc8dc.png)

### 下载中心

1. 下载列表
   一般来说，商户每日产生的订单等数据或将非常多，为了使商户拥有更好的导出体验（不会占用您浏览页面或切换其他页面的时间，不会让您在导出时卡住），我们使用了异步导出，您在导出数据之后只需稍等，然后切换至下载中心即可下载数据文件。

   ![下载列表](https://image.xiwu.me/2024/26ff230b7604627bc1a4ad111e7ff08b.png)

### 商户中心

1. 应用列表
   当您开始使用 Teemopay 时，在接入层，我们需要约定代付和代收的回调地址，方便我们将交易结果推送给您。应用名称没有什么特别的命名要求，只是一个名称用以标识对接层从那个应用发起代付代收，您可以以此拆分不同业务线、产品或服务等。
   创建应用后进入详情，务必要点击「交换公钥」以保存 Teemopay 平台公钥并填写您的公钥。另外，建议您将服务器的 IP 地址添加到代收、代付 IP 白名单中，以保证交易过程的安全。
   这个设置步骤建议由您的开发人员完成。

   ![应用列表](https://image.xiwu.me/2024/9c7cc0049a905d256fea469aa069e529.png)

   ![应用详情](https://image.xiwu.me/2024/b44bf71abfbc119f7c33e8e29210c2f0.png)

2. 商户信息
   在商户中心的商户信息页面展示您（商户）的基本信息，便于您查看 Teemopay 为您开通的代付和代收的支付方式以及费用费率（图为测试环境，仅作为展示）。

   ![商户信息](https://image.xiwu.me/2024/19717c7ddc6a15f784e4a5c010af8db4.png)

## 测试环境手动模拟回调

为保障流程无误和您的资金安全，对接和调试过程中，尽可能测到多种情况，包括：

- 代收和代付订单创建成功和失败的情况；
- 交易结果回调为成功和失败的情况；
- 订单状态可能的反转（先成功后失败）情况；

在交易中心的「代收订单」和「代付订单」列表中可针对「交易中」状态的订单发起模拟回调，您通过 API 创建订单之后，在后台页面中点击「模拟回调」按钮进行回调，如需测试状态反转则需要我们的测试人员手动为您回调。（特别说明：对于巴基斯坦收银台创建之后需要在收银台中提交表单，订单才会进入「交易中」状态，此时方可模拟回调）

![代收订单](https://image.xiwu.me/2024/660d9e5429ec0fa9e4191ec4d6145c7a.png)

![代付订单](https://image.xiwu.me/2024/9460181b83f7964ffed749c5ab3ea92e.png)

## 附录

> 以下为部分 TG 机器人命令，具体命令在生产环境开通后详见 TG 机器人

- 查单命令：/order <order_number> 或 /o <order_number>
- 查余额命令：/balance 或 /b
- 帮助命令：/help 或 /h