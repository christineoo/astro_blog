---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Sentry on Google Cloud Function (Python)"
author: "author"
pubDate: 2022-06-20
description: "Setup Sentry on Cloud Function and how to debug when exceptions are not captured on Sentry."
image:
  url: ""
  alt: ""
tags: ["cloud function", "sentry", "python"]
---

Sentry can be added to your Google Cloud Function to help with debugging in your application. Setting up Sentry is easy with only two steps based on the [documentation](https://sentry.io/for/google-cloud-functions/) provided by Sentry.

## Setup Sentry

First, add the `sentry-sdk` to your `requirements.txt` and then use the GCP Functions integration provided by the sentry-sdk.

```
sentry_sdk==1.5.12
```

```python
import sentry_sdk
from sentry_sdk.integrations.gcp import GcpIntegration

sentry_sdk.init(
    dsn="https://<key>@sentry.io/<project>",
    integrations=[GcpIntegration()],
)
```

Done! Time to test it out. Let's intentionally trigger some errors in cloud function.

Hmm...why no exceptions are being captured in Sentry? 🤔

## What's wrong.....

#### Debug step 1

From the documentation:

> A DSN tells a Sentry SDK where to send events so the events are associated with the correct project.

✅ Double checked to make sure I had set the correct dsn.

#### Debug step 2

There is a debug option that we can enabled.

```python
import sentry_sdk
from sentry_sdk.integrations.gcp import GcpIntegration

sentry_sdk.init(
    dsn="https://<key>@sentry.io/<project>",
    integrations=[GcpIntegration()],
    debug=True
)
```

After **debug** is enabled, sentry related logs can be seen in Google Cloud Console.

![Google Cloud Function (Click on the LOGS tab to access the logs)](https://bloggie.io/images/m0vrw2p4wzh003q7qqvw686l3ghz.png)

Ah ha...~! Found a line in the log that says **"GcpIntegration currently supports only Python 3.7 runtime environment."** ([code reference](https://github.com/getsentry/sentry-python/blob/master/sentry_sdk/integrations/gcp.py#L132-L134)). My Cloud Function is using Python 3.8, wished this warning is stated more clearly in the documentation. 😞

## Possible solution

1. Downgrade to **Python 3.7** runtime OR
2. Use the [serverless_function](https://docs.sentry.io/platforms/python/guides/serverless/) decorator.

```python {2,6}
import sentry_sdk
from sentry_sdk.integrations.serverless import serverless_function

sentry_sdk.init(
    dsn="https://<key>@sentry.io/<project>",
)

@serverless_function
def main_func():
    # This is the main function
```

I went with **option 2**. Although it is a generic integration, we can still use it without any issue and could continue to use Python 3.8 in the production environment.

Thank you for reading and I hope this helps anyone that ran into a similar issue. 👋
