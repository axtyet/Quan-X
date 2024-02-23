/******************************

Plantapp
下载地址：https://apps.apple.com/cn/app/plant-app-plant-identifier/id1595795215

Mimic：Ai动态图片制作
下载地址：https://apps.apple.com/cn/app/mimic-ai%E7%85%A7%E7%89%87%E9%9D%A2%E9%83%A8%E5%8A%A8%E7%94%BB%E5%88%B6%E4%BD%9C/id1590841930


[rewrite_local]

https://api.adapty.io/api/v1/sdk/in-apps/apple/receipt/validate/ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/PlantApp.js

[mitm] 

hostname = api.adapty.io

*******************************/

var objc = JSON.parse($response.body);

    objc = {
  "data": {
    "type": "adapty_inapps_apple_receipt_validation_result",
    "id": "59fe2e63-0211-42ac-b34a-968265040237",
    "attributes": {
      "app_id": "f0400c70-89aa-47ef-9fee-7e85eecf3d2c",
      "total_revenue_usd": 0,
      "customer_user_id": "DE21D2D730A441469B8756F968913E0C",
      "subscriptions": {
        "plantapp.lifetime.sub": {
          "vendor_transaction_id": "220001751110666",
          "offer_id": null,
          "billing_issue_detected_at": null,
          "is_lifetime": false,
          "store": "app_store",
          "vendor_product_id": "plantapp.lifetime.sub",
          "vendor_original_transaction_id": "220001751110666",
          "will_renew": false,
          "renewed_at": "2023-10-06T01:47:25.000000+0000",
          "cancellation_reason": null,
          "active_promotional_offer_id": null,
          "active_promotional_offer_type": null,
          "unsubscribed_at": "2023-10-06T06:43:57.110174+0000",
          "is_active": true,
          "activated_at": "2023-10-06T01:47:26.000000+0000",
          "is_refund": false,
          "is_in_grace_period": false,
          "active_introductory_offer_type": "free_trial",
          "expires_at": "2099-10-13T01:47:25.000000+0000",
          "starts_at": null,
          "is_sandbox": false
        }
      },
      "promotional_offer_eligibility": false,
      "custom_attributes": {
      },
      "profile_id": "59fe2e63-0211-42ac-b34a-968265040237",
      "paid_access_levels": {
        "premium": {
          "id": "premium",
          "is_lifetime": false,
          "vendor_product_id": "retouch_lifetime_ios",
          "active_promotional_offer_type": null,
          "cancellation_reason": null,
          "billing_issue_detected_at": null,
          "unsubscribed_at": "2023-10-06T06:43:57.115521+0000",
          "expires_at": "2099-10-13T01:47:25.000000+0000",
          "will_renew": false,
          "is_active": true,
          "offer_id": null,
          "is_in_grace_period": false,
          "activated_at": "2023-10-06T01:47:26.000000+0000",
          "active_promotional_offer_id": null,
          "renewed_at": "2023-10-06T01:47:25.000000+0000",
          "is_refund": false,
          "active_introductory_offer_type": "free_trial",
          "store": "app_store",
          "starts_at": null
        }
      },
      "introductory_offer_eligibility": false,
      "apple_validation_result": {
        "environment": "Production",
        "receipt": {
          "receipt_type": "Production",
          "app_item_id": 1637817985,
          "receipt_creation_date": "2023-10-06 06:40:08 Etc\/GMT",
          "bundle_id": "com.scaleup.plantid",
          "original_purchase_date": "2023-10-06 01:41:29 Etc\/GMT",
          "in_app": [
            {
              "quantity": "1",
              "purchase_date_ms": "1696556845000",
              "expires_date": "2099-10-13 01:47:25 Etc\/GMT",
              "expires_date_pst": "2023-10-12 18:47:25 America\/Los_Angeles",
              "is_in_intro_offer_period": "false",
              "transaction_id": "220001751110666",
              "is_trial_period": "true",
              "original_transaction_id": "220001751110666",
              "purchase_date": "2023-10-06 01:47:25 Etc\/GMT",
              "product_id": "retouch_lifetime_ios",
              "original_purchase_date_pst": "2023-10-05 18:47:26 America\/Los_Angeles",
              "in_app_ownership_type": "PURCHASED",
              "original_purchase_date_ms": "1696556846000",
              "web_order_line_item_id": "220000798337860",
              "expires_date_ms": "4095510443000",
              "purchase_date_pst": "2023-10-05 18:47:25 America\/Los_Angeles",
              "original_purchase_date": "2023-10-06 01:47:26 Etc\/GMT"
            }
          ],
          "adam_id": 1637817985,
          "receipt_creation_date_pst": "2023-10-05 23:40:08 America\/Los_Angeles",
          "request_date": "2023-10-06 06:43:57 Etc\/GMT",
          "request_date_pst": "2023-10-05 23:43:57 America\/Los_Angeles",
          "version_external_identifier": 855359449,
          "request_date_ms": "1696574637083",
          "original_purchase_date_pst": "2023-10-05 18:41:29 America\/Los_Angeles",
          "application_version": "7",
          "original_purchase_date_ms": "1696556489000",
          "receipt_creation_date_ms": "1696574408000",
          "original_application_version": "7",
          "download_id": 502842088787971977
        },
        "pending_renewal_info": [
          {
            "product_id": "plantapp.lifetime.sub",
            "original_transaction_id": "220001751110666",
            "auto_renew_product_id": "plantapp.lifetime.sub",
            "auto_renew_status": "0"
          }
        ],
        "status": 0,
        "latest_receipt_info": [
          {
            "quantity": "1",
            "purchase_date_ms": "1696556845000",
            "expires_date": "2099-10-13 01:47:25 Etc\/GMT",
            "expires_date_pst": "2023-10-12 18:47:25 America\/Los_Angeles",
            "is_in_intro_offer_period": "false",
            "transaction_id": "220001751110666",
            "is_trial_period": "true",
            "original_transaction_id": "220001751110666",
            "purchase_date": "2023-10-06 01:47:25 Etc\/GMT",
            "product_id": "plantapp.lifetime.sub",
            "original_purchase_date_pst": "2023-10-05 18:47:26 America\/Los_Angeles",
            "in_app_ownership_type": "PURCHASED",
            "subscription_group_identifier": "21057385",
            "original_purchase_date_ms": "1696556846000",
            "web_order_line_item_id": "220000798337860",
            "expires_date_ms": "4095510443000",
            "purchase_date_pst": "2023-10-05 18:47:25 America\/Los_Angeles",
            "original_purchase_date": "2023-10-06 01:47:26 Etc\/GMT"
          }
        ],
        "latest_receipt": "MIIUhwYJKoZIhvcNAQcCoIIUeDCCFHQCAQExCzAJBgUrDgMCGgUAMIIDxQYJKoZIhvcNAQcBoIIDtgSCA7IxggOuMAoCARQCAQEEAgwAMAsCAQMCAQEEAwwBNzALAgETAgEBBAMMATcwCwIBGQIBAQQDAgEDMAwCAQoCAQEEBBYCNCswDAIBDgIBAQQEAgIA5jANAgENAgEBBAUCAwJKVTAOAgEBAgEBBAYCBGGfHoEwDgIBCQIBAQQGAgRQMzAyMA4CAQsCAQEEBgIEB14qVjAOAgEQAgEBBAYCBDL7v9kwEgIBDwIBAQQKAggG+nQ3MFKPiTAUAgEAAgEBBAwMClByb2R1Y3Rpb24wGAIBBAIBAgQQDdvlYqLixtsB8ZrylX6bYDAcAgEFAgEBBBQ64Rz7egKRACMOjSqkfSL5QbPESzAeAgECAgEBBBYMFGNvbS5zY2FsZXVwLmZhY2VwbHVzMB4CAQgCAQEEFhYUMjAyMy0xMC0wNlQwNjo0MDowOFowHgIBDAIBAQQWFhQyMDIzLTEwLTA2VDA2OjQzOjU3WjAeAgESAgEBBBYWFDIwMjMtMTAtMDZUMDE6NDE6MjlaMEACAQcCAQEEOFOKyw3lWqtKC91y9GLnLdDvpZexTOxFsNKmTo6Kcf4RjknkwSRzYoXplNASAD8+jRknn5ylBq2XMFICAQYCAQEESo3jX+dPvDNIFTQDf+QFoxxZHKVvpfC9H9ey0TXLD80zAV+a9yhb7xX1th7XQKKIURwiJw2u4KMvnM3YLjQysLLAM4ri25GryE9DMIIBlAIBEQIBAQSCAYoxggGGMAsCAgatAgEBBAIMADALAgIGsAIBAQQCFgAwCwICBrICAQEEAgwAMAsCAgazAgEBBAIMADALAgIGtAIBAQQCDAAwCwICBrUCAQEEAgwAMAsCAga2AgEBBAIMADAMAgIGpQIBAQQDAgEBMAwCAgarAgEBBAMCAQMwDAICBrECAQEEAwIBATAMAgIGtwIBAQQDAgEAMAwCAga6AgEBBAMCAQAwEAICBq4CAQEEBwIFAYAxtcUwEgICBq8CAQEECQIHAMgW7W9rRDAaAgIGpwIBAQQRDA8yMjAwMDE3NTExMTA2NjYwGgICBqkCAQEEEQwPMjIwMDAxNzUxMTEwNjY2MB8CAgaoAgEBBBYWFDIwMjMtMTAtMDZUMDE6NDc6MjVaMB8CAgaqAgEBBBYWFDIwMjMtMTAtMDZUMDE6NDc6MjZaMB8CAgasAgEBBBYWFDIwMjMtMTAtMTNUMDE6NDc6MjVaMCICAgamAgEBBBkMF3JldG91Y2hfeWVhcmx5XzdkZnRfaW9zoIIO4jCCBcYwggSuoAMCAQICEC2rAxu91mVz0gcpeTxEl8QwDQYJKoZIhvcNAQEFBQAwdTELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAsMAkc3MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTAeFw0yMjEyMDIyMTQ2MDRaFw0yMzExMTcyMDQwNTJaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA3cautOi8bevBfbXOmFn2UFi2QtyV4xrF9c9kqn\/SzGFM1hTjd4HEWTG3GcdNS6udJ6YcPlRyUCIePTAdSg5G5dgmKRVL4yCcrtXzJWPQmNRx+G6W846gCsUENek496v4O5TaB+VbOYX\/nXlA9BoKrpVZmNMcXIpsBX2aHzRFwQTN1cmSpUYXBqykhfN3XB+F96NB5tsTEG9t8CHqrCamZj1eghXHXJsplk1+ik6OeLtXyTWUe7YAzhgKi3WVm+nDFD7BEDQEbbc8NzPfzRQ+YgzA3y9yu+1Kv+PIaQ1+lm0dTxA3btP8PRoGfWwBFMjEXzFqUvEzBchg48YDzSaBAgMBAAGjggI7MIICNzAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFF1CEGwbu8dSl05EvRMnuToSd4MrMHAGCCsGAQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93d2RyZzcuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHJnNzAxMIIBHwYDVR0gBIIBFjCCARIwggEOBgoqhkiG92NkBQYBMIH\/MDcGCCsGAQUFBwIBFitodHRwczovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL3d3ZHJnNy5jcmwwHQYDVR0OBBYEFLJFfcNEimtMSa9uUd4XyVFG7\/s0MA4GA1UdDwEB\/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEAd4oC3aSykKWsn4edfl23vGkEoxr\/ZHHT0comoYt48xUpPnDM61VwJJtTIgm4qzEslnj4is4Wi88oPhK14Xp0v0FMWQ1vgFYpRoGP7BWUD1D3mbeWf4Vzp5nsPiakVOzHvv9+JH\/GxOZQFfFZG+T3hAcrFZSzlunYnoVdRHSuRdGo7\/ml7h1WGVpt6isbohE0DTdAFODr8aPHdpVmDNvNXxtif+UqYPY5XY4tLqHFAblHXdHKW6VV6X6jexDzA6SCv8m0VaGIWCIF+v15a2FoEP+40e5e5KzMcoRsswIVK6o5r7AF5ldbD6QopimkS4d3naMQ32LYeWhg5\/pOyshkyzCCBFUwggM9oAMCAQICFDQYWP8B\/gY\/jvGfH+k8AbTBRv\/JMA0GCSqGSIb3DQEBBQUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0yMjExMTcyMDQwNTNaFw0yMzExMTcyMDQwNTJaMHUxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQLDAJHNzFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCsrtHTtoqxGyiVrd5RUUw\/M+FOXK+z\/ALSZU8q1HRojHUXZc8o5EgJmHFSMiwWTniOklZkqd2LzeLUxzuiEkU3AhliZC9\/YcbTWSK\/q\/kUo+22npm6L\/Gx3DBCT7a2ssZ0qmJWu+1ENg\/R5SB0k1c6XZ7cAfx4b2kWNcNuAcKectRxNrF2CXq+DSqX8bBeCxsSrSurB99jLfWI6TISolVYQ3Y8PReAHynbsamfq5YFnRXc3dtOD+cTfForLgJB9u56arZzYPeXGRSLlTM4k9oAJTauVVp8n\/n0YgQHdOkdp5VXI6wrJNpkTyhy6ZawCDyIGxRjQ9eJrpjB8i2O41ElAgMBAAGjge8wgewwEgYDVR0TAQH\/BAgwBgEB\/wIBADAfBgNVHSMEGDAWgBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjBEBggrBgEFBQcBAQQ4MDYwNAYIKwYBBQUHMAGGKGh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtYXBwbGVyb290Y2EwLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwHQYDVR0OBBYEFF1CEGwbu8dSl05EvRMnuToSd4MrMA4GA1UdDwEB\/wQEAwIBBjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEAUqMIKRNlt7Uf5jQD7fYYd7w9yie1cOzsbDNL9pkllAeeITMDavV9Ci4r3wipgt5Kf+HnC0sFuCeYSd3BDIbXgWSugpzERfHqjxwiMOOiJWFEif6FelbwcpJ8DERUJLe1pJ8m8DL5V51qeWxA7Q80BgZC\/9gOMWVt5i4B2Qa\/xcoNrkfUBReIPOmc5BlkbYqUrRHcAfbleK+t6HDXDV2BPkYqLK4kocfS4H2\/HfU2a8XeqQqagLERXrJkfrPBV8zCbFmZt\/Sw3THaSNZqge6yi1A1FubnXHFibrDyUeKobfgqy2hzxqbEGkNJAT6pqQCKhmyDiNJccFd62vh2zBnVsDCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN\/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm\/IlA7pVj01dDfFkNSMVSxVZHbOU9\/acns9QusFYUGePCLQg98usLCBvcLY\/ATCMt0PPD5098ytJKBrI\/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs\/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP\/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH\/BAQDAgEGMA8GA1UdEwEB\/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME\/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr\/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q\/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy\/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ\/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAbEwggGtAgEBMIGJMHUxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQLDAJHNzFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkCEC2rAxu91mVz0gcpeTxEl8QwCQYFKw4DAhoFADANBgkqhkiG9w0BAQEFAASCAQB9NNeWDzCOjnaFZbGu7Y0gF4bUYBd6ppEls5x1UlpZo6SwvprE4bKMq+Y96bQD5M9KS1+9dQXt1u\/L+BVzWwEOwWNqnOdlrLeykC6SlkzY7G57ZE1rnk2XZDQB6YaQQruyp\/Yt4GvIkEKlTnTXWMvOQ8cO0zCUho2D0z8IeLF+4pK5GY1ZiXPRehr87Eth7w43fVLv0ReF8BBd9rvdahzmx928HZ5ei9joN+ucvjOpQg1vwYc2WBlWLt9MxDPShHUlz5xUNHAZpJuXxiHsOath8VvwOwHrTU8dem0mrNtUSmT8HKI\/ad35Jli2t0kh03AWFiOd1zhuUtewbdIlyHl4"
      },
      "non_subscriptions": null
    }
  }
}

$done({body : JSON.stringify(objc)});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
