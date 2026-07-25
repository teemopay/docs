---
title: FAQ
description: Common questions and notes for merchant technical integration
---

#### Integration Mode

Q: How should we integrate if we only want to use one payment method?

> If you already know which payment method you want to use, create orders directly with the corresponding `paymentType` in the country API documentation.

> If you want users to choose from multiple payment methods, use the cashier or aggregated payment page. This is usually a better fit when a country has multiple payment options or when you plan to add more methods later.

Q: What is the difference between direct API integration and the cashier page?

> Direct API integration is suitable when your own product already handles payment method selection, user information collection, and front-end display.

> The cashier page is suitable when you want TeemoPay to handle payment method selection, part of the user confirmation flow, and payment redirection. Supported modes may vary by country, so always follow the corresponding country documentation.

#### Signature And Keys

Q: Which fields are included in the signature?

> All non-empty business fields in the request body are included in the signature. Empty values and empty strings are excluded. The `sign` field itself is also excluded.

> We recommend logging the exact string before signing during integration. This makes signature troubleshooting much faster.

Q: Should the private key include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`?

> Usually no. The integration examples use the private key content without PEM headers or footers.

> If your key generation tool exports a PEM file with headers and footers, make sure the actual value passed to your signing method is handled consistently, including line breaks and spaces.

Q: Where can we find the platform public key?

> After creating an application in the TeemoPay merchant dashboard, open the application details and use the public key exchange function to view the platform public key.

> During integration:

> 1. You sign requests with your merchant private key.
> 2. TeemoPay verifies your requests with the merchant public key you uploaded. You can also verify TeemoPay callbacks with the platform public key.

#### Callback

Q: Which callback URL is used: the `callbackUrl` in the request or the dashboard configuration?

> If `callbackUrl` is provided when creating an order, TeemoPay uses that URL first.

> If `callbackUrl` is not provided in the request, TeemoPay uses the callback URL configured for the application in the merchant dashboard. We recommend keeping the dashboard callback URL available in production as a fallback.

Q: Why might we receive multiple callbacks for the same order?

> The most common reason is that your callback endpoint did not return uppercase `SUCCESS`.

> After TeemoPay sends a callback, if the response is not recognized as successful, the notification may be retried. Please make sure:

> - Return plain text uppercase `SUCCESS` after processing the callback successfully.
> - Do not return lowercase `success`.
> - Make your callback logic idempotent so repeated notifications do not cause duplicate balance changes or duplicate status updates.

Q: Are unpaid, expired, or processing orders sent by callback?

> In general, TeemoPay sends callbacks for final states that need merchant notification, such as successful payin or final payout result.

> Unpaid, expired, or still-processing orders usually do not produce a success callback. Use the query API to actively check order status.

Q: What should we do if a successful callback was not received?

> Use the following checklist:

> 1. Query the order status with the query API.
> 2. Check whether your callback service was reachable and whether it returned timeout or 5xx responses.
> 3. Confirm that your callback endpoint returned uppercase `SUCCESS`.
> 4. If the order is successful on TeemoPay but your system did not receive the callback, contact TeemoPay technical support for investigation or resend assistance.

#### Orders And Status

Q: Does `code=200` mean the transaction is successful?

> Not necessarily.

> `code=200` means the API request was processed successfully, for example the order creation request was accepted by TeemoPay. The transaction result should be determined by `data.status`, the query API, or callback notification.

Q: What does a payout status such as “processing” or “accepted” mean?

> It means the payout order has been created and entered the processing flow. It does not mean the payout has reached its final successful state.

> Use callback notifications or the query API to confirm the final result.

Q: What happens if the merchant order number is duplicated?

> `merchantOrderNo` must be unique. If the same merchant order number is submitted more than once, TeemoPay returns a duplicate order error such as `merchant order duplicate`.

> Generate a unique merchant order number for every business order. When retrying order creation, avoid creating a new order number for the same business request unless your system intentionally creates a new order.

#### Environment, Configuration, And Troubleshooting

Q: Are test and production API domains the same?

> No.

> Please make sure the API domain matches the target country and environment. Common checks include:

> - Whether a test domain is being used with a production application.
> - Whether a production domain is being used with a test application.
> - Whether `app_code` belongs to the current environment.
> - Whether the `country` request header matches the API domain and enabled country.

Q: What does `Merchant joint verification error: The merchant has not configured the corresponding payment method fee rate` mean?

> This usually means the merchant application is not fully configured for the selected payment method, for example:

> - The payment method fee rate is not configured.
> - The country or payment method permission is not enabled.
> - Test and production configurations are inconsistent.
> - Routing or channel configuration has not taken effect.

> When this happens, provide the request environment, country, `app_code`, `paymentType`, and order number to your TeemoPay integration contact.

Q: What should we check first if the API request cannot connect?

> Start with the following:

> - API domain and environment.
> - Whether the merchant application is enabled.
> - Whether the server outbound IP is allowlisted.
> - Whether the request method is `POST`.
> - Whether request headers include `app_code`, `country`, `nonce`, and `timestamp`.
> - Whether the request body is valid JSON.

> If your server cannot connect to the TeemoPay API domain, provide the server outbound IP and request time for network or allowlist troubleshooting.

Q: How do we know whether an order failed because of request parameters or a payment channel result?

> First validate the request against the corresponding country documentation, especially:

> - Amount format and min/max amount.
> - Phone number format.
> - Document type and document number format.
> - Bank code, account type, and beneficiary account.
> - Whether `paymentType` is enabled for the merchant.

> If the parameters match the documentation but the order still fails, check `msg`, `errorMsg`, `remark`, or the query result. When contacting TeemoPay technical support, provide the full request, response, platform order number, and merchant order number.

#### Funds And Settlement

Q: Can payin funds be used directly for payout?

> Yes, but funds usually become available only after the settlement cycle or release rule is satisfied.

> If an order is successful but the balance has not been released, first check the settlement cycle for the country and merchant, then review payin details and settlement status in the dashboard.

Q: What are common reasons for frozen funds?

> Common reasons include:

> - A payin order is successful but has not reached settlement time.
> - A payout order is still processing and the funds are temporarily held.
> - The order requires manual review or exception handling.
> - The account or funds are temporarily held because of risk control, complaint handling, or payment channel processing.

> The release time depends on the order type, country, settlement cycle, and exception reason.

Q: Should withdrawal fees be included in the local-currency withdrawal amount?

> Usually no.

> Enter the local-currency amount you want to withdraw. Fees are deducted from the merchant balance according to your merchant configuration and can be viewed in withdrawal records or balance details.
