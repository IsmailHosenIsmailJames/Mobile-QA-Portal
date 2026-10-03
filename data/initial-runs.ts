import { TestRun } from "@/types/test-run";

export const initialTestRuns: TestRun[] = [
  {
    "id": "run-20261003-205651",
    "title": "Rewardly E2E Test Run (main)",
    "branch": "main",
    "commitHash": "737303a",
    "commitMessage": "feat(customer): implement wallet summary cards, notification center, scan celebration, and worker constraints",
    "author": "Ismail Hossain",
    "triggerType": "local_cli",
    "environment": {
      "os": "Linux 7.2.8-200.fc44.x86_64",
      "device": "Android 17 / Pixel 8 Pro",
      "flutterVersion": "3.29.0",
      "dartVersion": "3.7.0",
      "runnerHost": "fedora"
    },
    "startTime": "2026-10-03T14:57:30Z",
    "endTime": "2026-10-03T14:57:30.761Z",
    "totalDurationSeconds": 163,
    "status": "passed",
    "customerApp": {
      "appType": "customer_app",
      "appName": "Rewardly Customer",
      "packageName": "com.rolality.customer_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "customer_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/customer_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "18M",
      "apkSizeBytes": 18400601,
      "videoFileName": "customer_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/customer_app_integration.mp4",
      "videoSizeFormatted": "1.85 MB",
      "videoSizeBytes": 1935524,
      "status": "passed",
      "totalSteps": 16,
      "passedSteps": 16,
      "failedSteps": 0,
      "durationSeconds": 74,
      "steps": [
        {
          "stepNumber": 1,
          "id": "cust-01",
          "name": "Phone Number Login Screen",
          "description": "Initialize auth state, load phone prefix selector, validate digits input and consent checkbox.",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:00",
          "videoTimestampSec": 0,
          "screenshotFileName": "01_customer_login_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/01_customer_login_screen.png",
          "logOutput": "I/flutter (23841): [Auth] Initializing phone login cubit\nI/flutter (23841): 📸 [Screenshot Captured]: 01_customer_login_screen",
          "tags": [
            "Auth",
            "Login"
          ]
        },
        {
          "stepNumber": 2,
          "id": "cust-02",
          "name": "Language Selector Bottom Sheet",
          "description": "Open multilingual picker modal, switch locale dynamically, ensure RTL/LTR alignment.",
          "status": "passed",
          "durationMs": 2400,
          "timestamp": "00:04",
          "videoTimestampSec": 4,
          "screenshotFileName": "02_customer_language_sheet.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/02_customer_language_sheet.png",
          "logOutput": "I/flutter (23841): [Locale] Selected language code: en_US\nI/flutter (23841): 📸 [Screenshot Captured]: 02_customer_language_sheet",
          "tags": [
            "i18n",
            "Localization"
          ]
        },
        {
          "stepNumber": 3,
          "id": "cust-03",
          "name": "SMS OTP Verification",
          "description": "Simulate OTP SMS arrival, autofill 6-digit Pinput field, submit token to backend.",
          "status": "passed",
          "durationMs": 4200,
          "timestamp": "00:08",
          "videoTimestampSec": 8,
          "screenshotFileName": "03_customer_otp_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/03_customer_otp_screen.png",
          "logOutput": "I/flutter (23841): [OTP] Code '123456' verified successfully\nI/flutter (23841): 📸 [Screenshot Captured]: 03_customer_otp_screen",
          "tags": [
            "Auth",
            "Security"
          ]
        },
        {
          "stepNumber": 4,
          "id": "cust-04",
          "name": "Customer Home Dashboard",
          "description": "Hydrate loyalty feed, verify points balance card, render partner merchant carousels.",
          "status": "passed",
          "durationMs": 4800,
          "timestamp": "00:15",
          "videoTimestampSec": 15,
          "screenshotFileName": "04_customer_home_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/04_customer_home_screen.png",
          "logOutput": "I/flutter (23841): [Home] Loaded 8 merchants, active points: 420\nI/flutter (23841): 📸 [Screenshot Captured]: 04_customer_home_screen",
          "tags": [
            "Home",
            "Dashboard"
          ]
        },
        {
          "stepNumber": 5,
          "id": "cust-05",
          "name": "Outlet & Mall Selector",
          "description": "Trigger branch selector bottom sheet, filter stores by shopping mall district.",
          "status": "passed",
          "durationMs": 3100,
          "timestamp": "00:20",
          "videoTimestampSec": 20,
          "screenshotFileName": "05_customer_location_selector.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/05_customer_location_selector.png",
          "logOutput": "I/flutter (23841): [Location] Nearby outlet filtered: 'Downtown Flagship'\nI/flutter (23841): 📸 [Screenshot Captured]: 05_customer_location_selector",
          "tags": [
            "Geo",
            "Branches"
          ]
        },
        {
          "stepNumber": 6,
          "id": "cust-06",
          "name": "Notification Center",
          "description": "Verify stamp award alerts, promotional push notifications, unread badge counters.",
          "status": "passed",
          "durationMs": 3300,
          "timestamp": "00:25",
          "videoTimestampSec": 25,
          "screenshotFileName": "06_customer_notification_center.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/06_customer_notification_center.png",
          "logOutput": "I/flutter (23841): [Notifs] 3 unread notifications rendered\nI/flutter (23841): 📸 [Screenshot Captured]: 06_customer_notification_center",
          "tags": [
            "Notifications"
          ]
        },
        {
          "stepNumber": 7,
          "id": "cust-07",
          "name": "Merchant Detail Page",
          "description": "Inspect store profile, tier benefits, operating hours, and location map pin.",
          "status": "passed",
          "durationMs": 4100,
          "timestamp": "00:31",
          "videoTimestampSec": 31,
          "screenshotFileName": "07_customer_merchant_detail.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/07_customer_merchant_detail.png",
          "logOutput": "I/flutter (23841): [Merchant] Opened store 'Artisan Coffee Roasters'\nI/flutter (23841): 📸 [Screenshot Captured]: 07_customer_merchant_detail",
          "tags": [
            "Merchant",
            "Store"
          ]
        },
        {
          "stepNumber": 8,
          "id": "cust-08",
          "name": "Merchant Offers & Stamp Card",
          "description": "Render interactive 10-stamp card (8/10 active), unlockable free beverage reward.",
          "status": "passed",
          "durationMs": 3600,
          "timestamp": "00:36",
          "videoTimestampSec": 36,
          "screenshotFileName": "08_customer_merchant_offers.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/08_customer_merchant_offers.png",
          "logOutput": "I/flutter (23841): [StampCard] Current stamps: 8/10. Reward ready at 10.\nI/flutter (23841): 📸 [Screenshot Captured]: 08_customer_merchant_offers",
          "tags": [
            "Stamps",
            "Rewards"
          ]
        },
        {
          "stepNumber": 9,
          "id": "cust-09",
          "name": "Dynamic QR Scanner Viewport",
          "description": "Open camera scanner viewport, check camera overlay HUD, flashlight toggle control.",
          "status": "passed",
          "durationMs": 4500,
          "timestamp": "00:41",
          "videoTimestampSec": 41,
          "screenshotFileName": "09_customer_qr_scanner_viewport.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/09_customer_qr_scanner_viewport.png",
          "logOutput": "I/flutter (23841): [Scanner] Camera stream bound, HUD initialized\nI/flutter (23841): 📸 [Screenshot Captured]: 09_customer_qr_scanner_viewport",
          "tags": [
            "Camera",
            "QR"
          ]
        },
        {
          "stepNumber": 10,
          "id": "cust-10",
          "name": "Member Wallet & Vouchers",
          "description": "Inspect customer vouchers list, active coupon barcodes, validity expiration counters.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "00:48",
          "videoTimestampSec": 48,
          "screenshotFileName": "10_customer_wallet_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/10_customer_wallet_screen.png",
          "logOutput": "I/flutter (23841): [Wallet] 2 active vouchers found: 'Free Latte', '20% Off'\nI/flutter (23841): 📸 [Screenshot Captured]: 10_customer_wallet_screen",
          "tags": [
            "Wallet",
            "Coupons"
          ]
        },
        {
          "stepNumber": 11,
          "id": "cust-11",
          "name": "Activity & Transaction History",
          "description": "Review comprehensive points ledger, timestamped transactions, and reward redemptions.",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:53",
          "videoTimestampSec": 53,
          "screenshotFileName": "11_customer_activity_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/11_customer_activity_screen.png",
          "logOutput": "I/flutter (23841): [Activity] Ledger paginated: 15 entries loaded\nI/flutter (23841): 📸 [Screenshot Captured]: 11_customer_activity_screen",
          "tags": [
            "History",
            "Ledger"
          ]
        },
        {
          "stepNumber": 12,
          "id": "cust-12",
          "name": "Customer Profile & Settings",
          "description": "Display user profile card, membership tier badge, biometric toggles, and help link.",
          "status": "passed",
          "durationMs": 3500,
          "timestamp": "00:58",
          "videoTimestampSec": 58,
          "screenshotFileName": "12_customer_profile_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/12_customer_profile_screen.png",
          "logOutput": "I/flutter (23841): [Profile] User 'Ahmed Al-Mansoor', Gold Member\nI/flutter (23841): 📸 [Screenshot Captured]: 12_customer_profile_screen",
          "tags": [
            "Profile"
          ]
        },
        {
          "stepNumber": 13,
          "id": "cust-13",
          "name": "Digital Loyalty Pass Modal",
          "description": "Generate high-resolution dynamic rotating QR pass with live time-based TOTP hash.",
          "status": "passed",
          "durationMs": 3200,
          "timestamp": "01:03",
          "videoTimestampSec": 63,
          "screenshotFileName": "13_customer_digital_pass_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/13_customer_digital_pass_modal.png",
          "logOutput": "I/flutter (23841): [Pass] Dynamic TOTP QR rendered: 'ROL-8839-2938'\nI/flutter (23841): 📸 [Screenshot Captured]: 13_customer_digital_pass_modal",
          "tags": [
            "Pass",
            "QR"
          ]
        },
        {
          "stepNumber": 14,
          "id": "cust-14",
          "name": "Referral & Earn Points Screen",
          "description": "Load referral link generator, copy button, milestone progress bar for bonus stamps.",
          "status": "passed",
          "durationMs": 2900,
          "timestamp": "01:07",
          "videoTimestampSec": 67,
          "screenshotFileName": "14_customer_referral_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/14_customer_referral_screen.png",
          "logOutput": "I/flutter (23841): [Referral] Invite code generated: 'AHMED_GOLD'\nI/flutter (23841): 📸 [Screenshot Captured]: 14_customer_referral_screen",
          "tags": [
            "Referral",
            "Growth"
          ]
        },
        {
          "stepNumber": 15,
          "id": "cust-15",
          "name": "Sign Out Confirmation Dialog",
          "description": "Trigger secure log out dialog modal, ensure cancel & confirm action bindings.",
          "status": "passed",
          "durationMs": 2200,
          "timestamp": "01:10",
          "videoTimestampSec": 70,
          "screenshotFileName": "15_customer_sign_out_dialog.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/15_customer_sign_out_dialog.png",
          "logOutput": "I/flutter (23841): [Auth] User clicked sign out, dialog presented\nI/flutter (23841): 📸 [Screenshot Captured]: 15_customer_sign_out_dialog",
          "tags": [
            "Auth",
            "Dialog"
          ]
        },
        {
          "stepNumber": 16,
          "id": "cust-16",
          "name": "Session Reset & Logged Out",
          "description": "Purge secure tokens from storage, teardown user session, redirect to welcome view.",
          "status": "passed",
          "durationMs": 2500,
          "timestamp": "01:12",
          "videoTimestampSec": 72,
          "screenshotFileName": "16_customer_session_logged_out.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/16_customer_session_logged_out.png",
          "logOutput": "I/flutter (23841): [Auth] Session cleared. Navigated to welcome screen.\nI/flutter (23841): 📸 [Screenshot Captured]: 16_customer_session_logged_out",
          "tags": [
            "Auth",
            "Teardown"
          ]
        }
      ],
      "logs": [
        "[09:48:15] [INFO] Runner connecting to device emulator-5554 (Pixel 8 Pro)",
        "[09:48:17] [INFO] Granting permissions: CAMERA, POST_NOTIFICATIONS, ACCESS_FINE_LOCATION",
        "[09:48:20] [INFO] Launching flutter drive --target=integration_test/customer_app_e2e_test.dart",
        "[09:48:23] [STEP 1/16] Testing Phone Number Login screen...",
        "[09:48:27] [STEP 2/16] Opening Language Selector modal sheet...",
        "[09:48:30] [STEP 3/16] Submitting SMS OTP verification code...",
        "[09:48:35] [STEP 4/16] Validating Customer Home screen layout & loyalty points...",
        "[09:48:38] [STEP 5/16] Testing Mall / Location picker drawer...",
        "[09:48:42] [STEP 6/16] Opening Notification Center & checking push events...",
        "[09:48:47] [STEP 7/16] Navigating to Merchant Detail page...",
        "[09:48:52] [STEP 8/16] Checking interactive Stamp Card (8/10 active stamps)...",
        "[09:48:57] [STEP 9/16] Launching QR Scanner camera viewport...",
        "[09:49:03] [STEP 10/16] Opening Member Wallet & digital vouchers...",
        "[09:49:08] [STEP 11/16] Reviewing Activity ledger & points audit trail...",
        "[09:49:13] [STEP 12/16] Checking Customer Profile & security options...",
        "[09:49:17] [STEP 13/16] Generating Digital Pass modal with dynamic QR...",
        "[09:49:21] [STEP 14/16] Testing Referral screen & shareable invite code...",
        "[09:49:24] [STEP 15/16] Opening Sign Out confirmation modal...",
        "[09:49:28] [STEP 16/16] Completing session purge and return to login...",
        "[09:49:30] [SUCCESS] All 16 Customer App integration steps passed in 74.0s."
      ]
    },
    "vendorApp": {
      "appType": "vendor_app",
      "appName": "Rewardly Vendor & POS",
      "packageName": "com.rolality.vendor_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "vendor_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/vendor_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "18M",
      "apkSizeBytes": 18057957,
      "videoFileName": "vendor_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/vendor_app_integration.mp4",
      "videoSizeFormatted": "2.53 MB",
      "videoSizeBytes": 2656684,
      "status": "passed",
      "totalSteps": 18,
      "passedSteps": 18,
      "failedSteps": 0,
      "durationSeconds": 89,
      "steps": [
        {
          "stepNumber": 1,
          "id": "vend-01",
          "name": "Cashier Terminal Login",
          "description": "Initialize terminal session, enter staff credential PIN, validate staff role.",
          "status": "passed",
          "durationMs": 4100,
          "timestamp": "00:00",
          "videoTimestampSec": 0,
          "screenshotFileName": "01_cashier_login_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/01_cashier_login_screen.png",
          "logOutput": "I/flutter (24102): [CashierAuth] Cashier authenticated: 'Sarah Jenkins'\nI/flutter (24102): 📸 [Screenshot Captured]: 01_cashier_login_screen",
          "tags": [
            "POS",
            "Auth"
          ]
        },
        {
          "stepNumber": 2,
          "id": "vend-02",
          "name": "Store Outlet Selector Dialog",
          "description": "Select POS branch register from multi-location store directory.",
          "status": "passed",
          "durationMs": 3200,
          "timestamp": "00:05",
          "videoTimestampSec": 5,
          "screenshotFileName": "02_outlet_picker_dialog.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/02_outlet_picker_dialog.png",
          "logOutput": "I/flutter (24102): [Terminal] Register assigned: 'Downtown Counter #2'\nI/flutter (24102): 📸 [Screenshot Captured]: 02_outlet_picker_dialog",
          "tags": [
            "POS",
            "Outlet"
          ]
        },
        {
          "stepNumber": 3,
          "id": "vend-03",
          "name": "Cashier Shift Initialization",
          "description": "Open cash float verification screen, enter opening balance, start shift clock.",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:09",
          "videoTimestampSec": 9,
          "screenshotFileName": "03_start_shift_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/03_start_shift_screen.png",
          "logOutput": "I/flutter (24102): [Shift] Shift #1082 started at 09:50 AM with float $200.00\nI/flutter (24102): 📸 [Screenshot Captured]: 03_start_shift_screen",
          "tags": [
            "Shift",
            "POS"
          ]
        },
        {
          "stepNumber": 4,
          "id": "vend-04",
          "name": "Cashier POS Dashboard",
          "description": "Render cashier terminal dashboard, quick action buttons, shift stats card.",
          "status": "passed",
          "durationMs": 4400,
          "timestamp": "00:14",
          "videoTimestampSec": 14,
          "screenshotFileName": "04_cashier_home_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/04_cashier_home_screen.png",
          "logOutput": "I/flutter (24102): [POS] Terminal ready for customer scan\nI/flutter (24102): 📸 [Screenshot Captured]: 04_cashier_home_screen",
          "tags": [
            "Dashboard",
            "POS"
          ]
        },
        {
          "stepNumber": 5,
          "id": "vend-05",
          "name": "Vendor Camera Scanner Viewport",
          "description": "Activate merchant camera scanner, frame QR code with illuminated targeting crosshair.",
          "status": "passed",
          "durationMs": 4600,
          "timestamp": "00:19",
          "videoTimestampSec": 19,
          "screenshotFileName": "05_scanner_viewport.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/05_scanner_viewport.png",
          "logOutput": "I/flutter (24102): [Camera] High-speed QR scanner listening for pass\nI/flutter (24102): 📸 [Screenshot Captured]: 05_scanner_viewport",
          "tags": [
            "Camera",
            "Scan"
          ]
        },
        {
          "stepNumber": 6,
          "id": "vend-06",
          "name": "Manual Code Entry Fallback",
          "description": "Provide manual alphanumeric voucher entry pad for damaged QR codes.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "00:25",
          "videoTimestampSec": 25,
          "screenshotFileName": "06_manual_code_entry.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/06_manual_code_entry.png",
          "logOutput": "I/flutter (24102): [ManualEntry] Code entered: 'REW-9902'\nI/flutter (24102): 📸 [Screenshot Captured]: 06_manual_code_entry",
          "tags": [
            "POS",
            "Fallback"
          ]
        },
        {
          "stepNumber": 7,
          "id": "vend-07",
          "name": "Customer Identity Verified Modal",
          "description": "Pop customer profile verification modal, display tier, active stamps, and name.",
          "status": "passed",
          "durationMs": 4300,
          "timestamp": "00:30",
          "videoTimestampSec": 30,
          "screenshotFileName": "07_customer_verified_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/07_customer_verified_modal.png",
          "logOutput": "I/flutter (24102): [Customer] Verified customer 'Ahmed Al-Mansoor' (Gold Tier)\nI/flutter (24102): 📸 [Screenshot Captured]: 07_customer_verified_modal",
          "tags": [
            "Customer",
            "Verification"
          ]
        },
        {
          "stepNumber": 8,
          "id": "vend-08",
          "name": "Voucher Burn & Stamp Issue",
          "description": "Enter receipt amount ($45.00), select 20% discount coupon, compute +4 loyalty stamps.",
          "status": "passed",
          "durationMs": 4800,
          "timestamp": "00:36",
          "videoTimestampSec": 36,
          "screenshotFileName": "08_voucher_redemption_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/08_voucher_redemption_modal.png",
          "logOutput": "I/flutter (24102): [Redeem] Burn voucher VCH-881, award 4 stamps\nI/flutter (24102): 📸 [Screenshot Captured]: 08_voucher_redemption_modal",
          "tags": [
            "Redemption",
            "Voucher"
          ]
        },
        {
          "stepNumber": 9,
          "id": "vend-09",
          "name": "Transaction Success Receipt",
          "description": "Display animated success confirmation, print digital receipt, sound chime.",
          "status": "passed",
          "durationMs": 4100,
          "timestamp": "00:42",
          "videoTimestampSec": 42,
          "screenshotFileName": "09_transaction_success.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/09_transaction_success.png",
          "logOutput": "I/flutter (24102): [Tx] Transaction TX-9921 committed successfully\nI/flutter (24102): 📸 [Screenshot Captured]: 09_transaction_success",
          "tags": [
            "Success",
            "Receipt"
          ]
        },
        {
          "stepNumber": 10,
          "id": "vend-10",
          "name": "Updated Shift Dashboard",
          "description": "Verify real-time counter updates on cashier dashboard (+1 transaction, +$36.00).",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:47",
          "videoTimestampSec": 47,
          "screenshotFileName": "10_cashier_home_updated.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/10_cashier_home_updated.png",
          "logOutput": "I/flutter (24102): [Shift] Counter updated: 14 redemptions total\nI/flutter (24102): 📸 [Screenshot Captured]: 10_cashier_home_updated",
          "tags": [
            "Shift",
            "Dashboard"
          ]
        },
        {
          "stepNumber": 11,
          "id": "vend-11",
          "name": "End Shift Summary Ledger",
          "description": "Generate end-of-day cashier balancing sheet, total cash float, voucher breakdown.",
          "status": "passed",
          "durationMs": 4500,
          "timestamp": "00:52",
          "videoTimestampSec": 52,
          "screenshotFileName": "11_shift_summary_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/11_shift_summary_screen.png",
          "logOutput": "I/flutter (24102): [Shift] Summary ledger printed, shift closed\nI/flutter (24102): 📸 [Screenshot Captured]: 11_shift_summary_screen",
          "tags": [
            "Shift",
            "Audit"
          ]
        },
        {
          "stepNumber": 12,
          "id": "vend-12",
          "name": "Merchant Owner Portal Login",
          "description": "Authenticate with business owner credentials, verify multi-store permissions.",
          "status": "passed",
          "durationMs": 4200,
          "timestamp": "00:58",
          "videoTimestampSec": 58,
          "screenshotFileName": "12_owner_login_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/12_owner_login_screen.png",
          "logOutput": "I/flutter (24102): [OwnerAuth] Merchant Owner logged in: 'Nasser Al-Hassan'\nI/flutter (24102): 📸 [Screenshot Captured]: 12_owner_login_screen",
          "tags": [
            "Owner",
            "Auth"
          ]
        },
        {
          "stepNumber": 13,
          "id": "vend-13",
          "name": "Owner Pulse Analytics",
          "description": "View top-level revenue pulse, member acquisition graph, repeat customer retention rate.",
          "status": "passed",
          "durationMs": 4400,
          "timestamp": "01:04",
          "videoTimestampSec": 64,
          "screenshotFileName": "13_owner_pulse_dashboard.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/13_owner_pulse_dashboard.png",
          "logOutput": "I/flutter (24102): [Pulse] Retention: 78.4%, Monthly Loyalty Revenue: $18,450\nI/flutter (24102): 📸 [Screenshot Captured]: 13_owner_pulse_dashboard",
          "tags": [
            "Analytics",
            "Pulse"
          ]
        },
        {
          "stepNumber": 14,
          "id": "vend-14",
          "name": "Owner Campaigns Hub",
          "description": "List active marketing campaigns, seasonal double-stamp days, tier promo cards.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "01:09",
          "videoTimestampSec": 69,
          "screenshotFileName": "14_owner_campaigns_hub.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/14_owner_campaigns_hub.png",
          "logOutput": "I/flutter (24102): [Campaigns] 4 active loyalty promotions running\nI/flutter (24102): 📸 [Screenshot Captured]: 14_owner_campaigns_hub",
          "tags": [
            "Marketing",
            "Campaigns"
          ]
        },
        {
          "stepNumber": 15,
          "id": "vend-15",
          "name": "Create Campaign Wizard",
          "description": "Launch multi-step campaign builder: title, 2x multiplier, start date, eligible branches.",
          "status": "passed",
          "durationMs": 4300,
          "timestamp": "01:14",
          "videoTimestampSec": 74,
          "screenshotFileName": "15_create_campaign_wizard.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/15_create_campaign_wizard.png",
          "logOutput": "I/flutter (24102): [Wizard] Draft campaign: 'Weekend Double Stamps'\nI/flutter (24102): 📸 [Screenshot Captured]: 15_create_campaign_wizard",
          "tags": [
            "Wizard",
            "Campaign"
          ]
        },
        {
          "stepNumber": 16,
          "id": "vend-16",
          "name": "Staff & Cashier Management",
          "description": "Review list of authorized store cashiers, active register assignments, performance stats.",
          "status": "passed",
          "durationMs": 3600,
          "timestamp": "01:19",
          "videoTimestampSec": 79,
          "screenshotFileName": "16_owner_cashier_list.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/16_owner_cashier_list.png",
          "logOutput": "I/flutter (24102): [Staff] 6 cashiers configured across 3 outlets\nI/flutter (24102): 📸 [Screenshot Captured]: 16_owner_cashier_list",
          "tags": [
            "Staff",
            "Admin"
          ]
        },
        {
          "stepNumber": 17,
          "id": "vend-17",
          "name": "Add Cashier Staff Modal",
          "description": "Open new staff creation modal, set 4-digit PIN code, designate branch terminal.",
          "status": "passed",
          "durationMs": 3200,
          "timestamp": "01:23",
          "videoTimestampSec": 83,
          "screenshotFileName": "17_add_cashier_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/17_add_cashier_modal.png",
          "logOutput": "I/flutter (24102): [Staff] Added cashier 'Omar Tariq' with PIN auth\nI/flutter (24102): 📸 [Screenshot Captured]: 17_add_cashier_modal",
          "tags": [
            "Staff",
            "Modal"
          ]
        },
        {
          "stepNumber": 18,
          "id": "vend-18",
          "name": "Store Settings & Branding",
          "description": "Configure store logo, operating hours, auto-print receipts, banking payout preferences.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "01:26",
          "videoTimestampSec": 86,
          "screenshotFileName": "18_owner_settings_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/18_owner_settings_screen.png",
          "logOutput": "I/flutter (24102): [Settings] Store configuration saved and synced to cloud\nI/flutter (24102): 📸 [Screenshot Captured]: 18_owner_settings_screen",
          "tags": [
            "Settings",
            "Store"
          ]
        }
      ],
      "logs": [
        "[09:50:02] [INFO] Runner switching target to vendor_app",
        "[09:50:05] [INFO] Granting permissions: CAMERA, POST_NOTIFICATIONS, ACCESS_COARSE_LOCATION",
        "[09:50:08] [INFO] Starting adb screenrecord on emulator-5554 (720x1280 @ 4Mbps)...",
        "[09:50:11] [STEP 1/18] Cashier Login Screen verification...",
        "[09:50:15] [STEP 2/18] Selecting store branch outlet in modal dialog...",
        "[09:50:19] [STEP 3/18] Initializing shift float & timestamp...",
        "[09:50:23] [STEP 4/18] Rendering cashier terminal home dashboard...",
        "[09:50:28] [STEP 5/18] Testing fast camera scanner viewfinder...",
        "[09:50:33] [STEP 6/18] Testing manual voucher code entry fallback...",
        "[09:50:37] [STEP 7/18] Verifying customer membership status modal...",
        "[09:50:43] [STEP 8/18] Applying 20% discount & burning voucher...",
        "[09:50:48] [STEP 9/18] Generating transaction success receipt...",
        "[09:50:52] [STEP 10/18] Checking real-time shift counters...",
        "[09:50:57] [STEP 11/18] Generating shift summary audit ledger...",
        "[09:51:03] [STEP 12/18] Logging into Merchant Owner portal...",
        "[09:51:09] [STEP 13/18] Hydrating Owner Pulse business analytics...",
        "[09:51:14] [STEP 14/18] Opening Owner Campaigns Hub...",
        "[09:51:18] [STEP 15/18] Running Create Campaign Wizard flow...",
        "[09:51:23] [STEP 16/18] Listing registered cashiers and terminals...",
        "[09:51:27] [STEP 17/18] Opening Add Cashier Staff modal sheet...",
        "[09:51:31] [STEP 18/18] Verifying Store Settings & payout configs...",
        "[09:51:35] [SUCCESS] All 18 Vendor App integration steps passed in 89.3s."
      ]
    }
  },
  {
    "id": "run-20261002-161407",
    "title": "Rewardly E2E Test Run (main)",
    "branch": "main",
    "commitHash": "manual-upload",
    "commitMessage": "Automated QA upload",
    "author": "QA Runner",
    "triggerType": "local_cli",
    "environment": {
      "os": "Linux 7.2.7-200.fc44.x86_64",
      "device": "Android 17 / Pixel 8 Pro",
      "flutterVersion": "3.29.0",
      "dartVersion": "3.7.0",
      "runnerHost": "fedora"
    },
    "startTime": "2026-10-02T10:14:07Z",
    "endTime": "2026-10-02T10:14:17.186Z",
    "totalDurationSeconds": 163,
    "status": "passed",
    "customerApp": {
      "appType": "customer_app",
      "appName": "Rewardly Customer",
      "packageName": "com.rolality.customer_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "customer_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/customer_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.5 MB",
      "apkSizeBytes": 18400601,
      "videoFileName": "customer_app_integration.mp4",
      "videoUrl": "/uploads/run-20261002-161407/recordings/customer_app_integration.mp4",
      "videoSizeFormatted": "1.85 MB",
      "videoSizeBytes": 1935524,
      "status": "passed",
      "totalSteps": 16,
      "passedSteps": 16,
      "failedSteps": 0,
      "durationSeconds": 74,
      "steps": [],
      "logs": [
        "Bundle extracted successfully."
      ]
    },
    "vendorApp": {
      "appType": "vendor_app",
      "appName": "Rewardly Vendor & POS",
      "packageName": "com.rolality.vendor_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "vendor_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/vendor_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.2 MB",
      "apkSizeBytes": 18057957,
      "videoFileName": "vendor_app_integration.mp4",
      "videoUrl": "/uploads/run-20261002-161407/recordings/vendor_app_integration.mp4",
      "videoSizeFormatted": "2.53 MB",
      "videoSizeBytes": 2656684,
      "status": "passed",
      "totalSteps": 18,
      "passedSteps": 18,
      "failedSteps": 0,
      "durationSeconds": 89,
      "steps": [],
      "logs": [
        "Bundle extracted successfully."
      ]
    }
  },
  {
    "id": "run-20261002-792",
    "title": "Triggered Run: ALL",
    "branch": "main",
    "commitHash": "853824a3",
    "commitMessage": "Manual trigger from QA Portal",
    "author": "QA Portal Trigger",
    "triggerType": "manual_dashboard",
    "environment": {
      "os": "Linux 6.16.8 (x86_64)",
      "device": "Android 17 / emulator-5554",
      "flutterVersion": "3.29.0 • channel stable",
      "dartVersion": "3.7.0",
      "runnerHost": "Portal Local Runner"
    },
    "startTime": "2026-10-02T10:14:02.900Z",
    "endTime": "2026-10-02T10:16:42.900Z",
    "totalDurationSeconds": 163,
    "status": "passed",
    "customerApp": {
      "appType": "customer_app",
      "appName": "Rewardly Customer",
      "packageName": "com.rolality.customer_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "customer_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/customer_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.5 MB",
      "apkSizeBytes": 18400601,
      "videoFileName": "customer_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/customer_app_integration.mp4",
      "videoSizeFormatted": "1.85 MB",
      "videoSizeBytes": 1935524,
      "status": "passed",
      "totalSteps": 16,
      "passedSteps": 16,
      "failedSteps": 0,
      "durationSeconds": 74,
      "steps": [],
      "logs": [
        "[INFO] Integration test suite queued for branch main",
        "[INFO] Target: all",
        "[SUCCESS] Job completed with all suites passing"
      ]
    },
    "vendorApp": {
      "appType": "vendor_app",
      "appName": "Rewardly Vendor & POS",
      "packageName": "com.rolality.vendor_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "vendor_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/vendor_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.2 MB",
      "apkSizeBytes": 18057957,
      "videoFileName": "vendor_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/vendor_app_integration.mp4",
      "videoSizeFormatted": "2.53 MB",
      "videoSizeBytes": 2656684,
      "status": "passed",
      "totalSteps": 18,
      "passedSteps": 18,
      "failedSteps": 0,
      "durationSeconds": 89,
      "steps": [],
      "logs": [
        "[INFO] Vendor integration suite initialized on emulator-5554",
        "[SUCCESS] 18 vendor steps verified successfully"
      ]
    }
  },
  {
    "id": "run-2026-10-02-001",
    "title": "Rewardly Multi-App E2E Release Verification",
    "branch": "main",
    "commitHash": "e4f8b91a",
    "commitMessage": "feat(e2e): complete customer & vendor automated journey verification with screen recording",
    "author": "Ismail (Antigravity Agent)",
    "triggerType": "local_cli",
    "environment": {
      "os": "Linux 6.16.8 (x86_64)",
      "device": "Pixel 8 Pro (API 34 / emulator-5554)",
      "flutterVersion": "3.29.0 • channel stable",
      "dartVersion": "3.7.0",
      "runnerHost": "dev-workstation-fedora"
    },
    "startTime": "2026-10-02T09:48:12Z",
    "endTime": "2026-10-02T09:58:34Z",
    "totalDurationSeconds": 622,
    "status": "passed",
    "customerApp": {
      "appType": "customer_app",
      "appName": "Rewardly Customer",
      "packageName": "com.rolality.customer_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "customer_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/customer_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.5 MB",
      "apkSizeBytes": 18400601,
      "videoFileName": "customer_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/customer_app_integration.mp4",
      "videoSizeFormatted": "1.85 MB",
      "videoSizeBytes": 1935524,
      "status": "passed",
      "totalSteps": 16,
      "passedSteps": 16,
      "failedSteps": 0,
      "durationSeconds": 74,
      "steps": [
        {
          "stepNumber": 1,
          "id": "cust-01",
          "name": "Phone Number Login Screen",
          "description": "Initialize auth state, load phone prefix selector, validate digits input and consent checkbox.",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:00",
          "videoTimestampSec": 0,
          "screenshotFileName": "01_customer_login_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/01_customer_login_screen.png",
          "logOutput": "I/flutter (23841): [Auth] Initializing phone login cubit\nI/flutter (23841): 📸 [Screenshot Captured]: 01_customer_login_screen",
          "tags": [
            "Auth",
            "Login"
          ]
        },
        {
          "stepNumber": 2,
          "id": "cust-02",
          "name": "Language Selector Bottom Sheet",
          "description": "Open multilingual picker modal, switch locale dynamically, ensure RTL/LTR alignment.",
          "status": "passed",
          "durationMs": 2400,
          "timestamp": "00:04",
          "videoTimestampSec": 4,
          "screenshotFileName": "02_customer_language_sheet.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/02_customer_language_sheet.png",
          "logOutput": "I/flutter (23841): [Locale] Selected language code: en_US\nI/flutter (23841): 📸 [Screenshot Captured]: 02_customer_language_sheet",
          "tags": [
            "i18n",
            "Localization"
          ]
        },
        {
          "stepNumber": 3,
          "id": "cust-03",
          "name": "SMS OTP Verification",
          "description": "Simulate OTP SMS arrival, autofill 6-digit Pinput field, submit token to backend.",
          "status": "passed",
          "durationMs": 4200,
          "timestamp": "00:08",
          "videoTimestampSec": 8,
          "screenshotFileName": "03_customer_otp_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/03_customer_otp_screen.png",
          "logOutput": "I/flutter (23841): [OTP] Code '123456' verified successfully\nI/flutter (23841): 📸 [Screenshot Captured]: 03_customer_otp_screen",
          "tags": [
            "Auth",
            "Security"
          ]
        },
        {
          "stepNumber": 4,
          "id": "cust-04",
          "name": "Customer Home Dashboard",
          "description": "Hydrate loyalty feed, verify points balance card, render partner merchant carousels.",
          "status": "passed",
          "durationMs": 4800,
          "timestamp": "00:15",
          "videoTimestampSec": 15,
          "screenshotFileName": "04_customer_home_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/04_customer_home_screen.png",
          "logOutput": "I/flutter (23841): [Home] Loaded 8 merchants, active points: 420\nI/flutter (23841): 📸 [Screenshot Captured]: 04_customer_home_screen",
          "tags": [
            "Home",
            "Dashboard"
          ]
        },
        {
          "stepNumber": 5,
          "id": "cust-05",
          "name": "Outlet & Mall Selector",
          "description": "Trigger branch selector bottom sheet, filter stores by shopping mall district.",
          "status": "passed",
          "durationMs": 3100,
          "timestamp": "00:20",
          "videoTimestampSec": 20,
          "screenshotFileName": "05_customer_location_selector.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/05_customer_location_selector.png",
          "logOutput": "I/flutter (23841): [Location] Nearby outlet filtered: 'Downtown Flagship'\nI/flutter (23841): 📸 [Screenshot Captured]: 05_customer_location_selector",
          "tags": [
            "Geo",
            "Branches"
          ]
        },
        {
          "stepNumber": 6,
          "id": "cust-06",
          "name": "Notification Center",
          "description": "Verify stamp award alerts, promotional push notifications, unread badge counters.",
          "status": "passed",
          "durationMs": 3300,
          "timestamp": "00:25",
          "videoTimestampSec": 25,
          "screenshotFileName": "06_customer_notification_center.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/06_customer_notification_center.png",
          "logOutput": "I/flutter (23841): [Notifs] 3 unread notifications rendered\nI/flutter (23841): 📸 [Screenshot Captured]: 06_customer_notification_center",
          "tags": [
            "Notifications"
          ]
        },
        {
          "stepNumber": 7,
          "id": "cust-07",
          "name": "Merchant Detail Page",
          "description": "Inspect store profile, tier benefits, operating hours, and location map pin.",
          "status": "passed",
          "durationMs": 4100,
          "timestamp": "00:31",
          "videoTimestampSec": 31,
          "screenshotFileName": "07_customer_merchant_detail.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/07_customer_merchant_detail.png",
          "logOutput": "I/flutter (23841): [Merchant] Opened store 'Artisan Coffee Roasters'\nI/flutter (23841): 📸 [Screenshot Captured]: 07_customer_merchant_detail",
          "tags": [
            "Merchant",
            "Store"
          ]
        },
        {
          "stepNumber": 8,
          "id": "cust-08",
          "name": "Merchant Offers & Stamp Card",
          "description": "Render interactive 10-stamp card (8/10 active), unlockable free beverage reward.",
          "status": "passed",
          "durationMs": 3600,
          "timestamp": "00:36",
          "videoTimestampSec": 36,
          "screenshotFileName": "08_customer_merchant_offers.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/08_customer_merchant_offers.png",
          "logOutput": "I/flutter (23841): [StampCard] Current stamps: 8/10. Reward ready at 10.\nI/flutter (23841): 📸 [Screenshot Captured]: 08_customer_merchant_offers",
          "tags": [
            "Stamps",
            "Rewards"
          ]
        },
        {
          "stepNumber": 9,
          "id": "cust-09",
          "name": "Dynamic QR Scanner Viewport",
          "description": "Open camera scanner viewport, check camera overlay HUD, flashlight toggle control.",
          "status": "passed",
          "durationMs": 4500,
          "timestamp": "00:41",
          "videoTimestampSec": 41,
          "screenshotFileName": "09_customer_qr_scanner_viewport.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/09_customer_qr_scanner_viewport.png",
          "logOutput": "I/flutter (23841): [Scanner] Camera stream bound, HUD initialized\nI/flutter (23841): 📸 [Screenshot Captured]: 09_customer_qr_scanner_viewport",
          "tags": [
            "Camera",
            "QR"
          ]
        },
        {
          "stepNumber": 10,
          "id": "cust-10",
          "name": "Member Wallet & Vouchers",
          "description": "Inspect customer vouchers list, active coupon barcodes, validity expiration counters.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "00:48",
          "videoTimestampSec": 48,
          "screenshotFileName": "10_customer_wallet_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/10_customer_wallet_screen.png",
          "logOutput": "I/flutter (23841): [Wallet] 2 active vouchers found: 'Free Latte', '20% Off'\nI/flutter (23841): 📸 [Screenshot Captured]: 10_customer_wallet_screen",
          "tags": [
            "Wallet",
            "Coupons"
          ]
        },
        {
          "stepNumber": 11,
          "id": "cust-11",
          "name": "Activity & Transaction History",
          "description": "Review comprehensive points ledger, timestamped transactions, and reward redemptions.",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:53",
          "videoTimestampSec": 53,
          "screenshotFileName": "11_customer_activity_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/11_customer_activity_screen.png",
          "logOutput": "I/flutter (23841): [Activity] Ledger paginated: 15 entries loaded\nI/flutter (23841): 📸 [Screenshot Captured]: 11_customer_activity_screen",
          "tags": [
            "History",
            "Ledger"
          ]
        },
        {
          "stepNumber": 12,
          "id": "cust-12",
          "name": "Customer Profile & Settings",
          "description": "Display user profile card, membership tier badge, biometric toggles, and help link.",
          "status": "passed",
          "durationMs": 3500,
          "timestamp": "00:58",
          "videoTimestampSec": 58,
          "screenshotFileName": "12_customer_profile_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/12_customer_profile_screen.png",
          "logOutput": "I/flutter (23841): [Profile] User 'Ahmed Al-Mansoor', Gold Member\nI/flutter (23841): 📸 [Screenshot Captured]: 12_customer_profile_screen",
          "tags": [
            "Profile"
          ]
        },
        {
          "stepNumber": 13,
          "id": "cust-13",
          "name": "Digital Loyalty Pass Modal",
          "description": "Generate high-resolution dynamic rotating QR pass with live time-based TOTP hash.",
          "status": "passed",
          "durationMs": 3200,
          "timestamp": "01:03",
          "videoTimestampSec": 63,
          "screenshotFileName": "13_customer_digital_pass_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/13_customer_digital_pass_modal.png",
          "logOutput": "I/flutter (23841): [Pass] Dynamic TOTP QR rendered: 'ROL-8839-2938'\nI/flutter (23841): 📸 [Screenshot Captured]: 13_customer_digital_pass_modal",
          "tags": [
            "Pass",
            "QR"
          ]
        },
        {
          "stepNumber": 14,
          "id": "cust-14",
          "name": "Referral & Earn Points Screen",
          "description": "Load referral link generator, copy button, milestone progress bar for bonus stamps.",
          "status": "passed",
          "durationMs": 2900,
          "timestamp": "01:07",
          "videoTimestampSec": 67,
          "screenshotFileName": "14_customer_referral_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/14_customer_referral_screen.png",
          "logOutput": "I/flutter (23841): [Referral] Invite code generated: 'AHMED_GOLD'\nI/flutter (23841): 📸 [Screenshot Captured]: 14_customer_referral_screen",
          "tags": [
            "Referral",
            "Growth"
          ]
        },
        {
          "stepNumber": 15,
          "id": "cust-15",
          "name": "Sign Out Confirmation Dialog",
          "description": "Trigger secure log out dialog modal, ensure cancel & confirm action bindings.",
          "status": "passed",
          "durationMs": 2200,
          "timestamp": "01:10",
          "videoTimestampSec": 70,
          "screenshotFileName": "15_customer_sign_out_dialog.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/15_customer_sign_out_dialog.png",
          "logOutput": "I/flutter (23841): [Auth] User clicked sign out, dialog presented\nI/flutter (23841): 📸 [Screenshot Captured]: 15_customer_sign_out_dialog",
          "tags": [
            "Auth",
            "Dialog"
          ]
        },
        {
          "stepNumber": 16,
          "id": "cust-16",
          "name": "Session Reset & Logged Out",
          "description": "Purge secure tokens from storage, teardown user session, redirect to welcome view.",
          "status": "passed",
          "durationMs": 2500,
          "timestamp": "01:12",
          "videoTimestampSec": 72,
          "screenshotFileName": "16_customer_session_logged_out.png",
          "screenshotUrl": "/delivery_bundle/screenshots/customer_app/16_customer_session_logged_out.png",
          "logOutput": "I/flutter (23841): [Auth] Session cleared. Navigated to welcome screen.\nI/flutter (23841): 📸 [Screenshot Captured]: 16_customer_session_logged_out",
          "tags": [
            "Auth",
            "Teardown"
          ]
        }
      ],
      "logs": [
        "[09:48:15] [INFO] Runner connecting to device emulator-5554 (Pixel 8 Pro)",
        "[09:48:17] [INFO] Granting permissions: CAMERA, POST_NOTIFICATIONS, ACCESS_FINE_LOCATION",
        "[09:48:20] [INFO] Launching flutter drive --target=integration_test/customer_app_e2e_test.dart",
        "[09:48:23] [STEP 1/16] Testing Phone Number Login screen...",
        "[09:48:27] [STEP 2/16] Opening Language Selector modal sheet...",
        "[09:48:30] [STEP 3/16] Submitting SMS OTP verification code...",
        "[09:48:35] [STEP 4/16] Validating Customer Home screen layout & loyalty points...",
        "[09:48:38] [STEP 5/16] Testing Mall / Location picker drawer...",
        "[09:48:42] [STEP 6/16] Opening Notification Center & checking push events...",
        "[09:48:47] [STEP 7/16] Navigating to Merchant Detail page...",
        "[09:48:52] [STEP 8/16] Checking interactive Stamp Card (8/10 active stamps)...",
        "[09:48:57] [STEP 9/16] Launching QR Scanner camera viewport...",
        "[09:49:03] [STEP 10/16] Opening Member Wallet & digital vouchers...",
        "[09:49:08] [STEP 11/16] Reviewing Activity ledger & points audit trail...",
        "[09:49:13] [STEP 12/16] Checking Customer Profile & security options...",
        "[09:49:17] [STEP 13/16] Generating Digital Pass modal with dynamic QR...",
        "[09:49:21] [STEP 14/16] Testing Referral screen & shareable invite code...",
        "[09:49:24] [STEP 15/16] Opening Sign Out confirmation modal...",
        "[09:49:28] [STEP 16/16] Completing session purge and return to login...",
        "[09:49:30] [SUCCESS] All 16 Customer App integration steps passed in 74.0s."
      ]
    },
    "vendorApp": {
      "appType": "vendor_app",
      "appName": "Rewardly Vendor & POS",
      "packageName": "com.rolality.vendor_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "vendor_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/vendor_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.2 MB",
      "apkSizeBytes": 18057957,
      "videoFileName": "vendor_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/vendor_app_integration.mp4",
      "videoSizeFormatted": "2.53 MB",
      "videoSizeBytes": 2656684,
      "status": "passed",
      "totalSteps": 18,
      "passedSteps": 18,
      "failedSteps": 0,
      "durationSeconds": 89,
      "steps": [
        {
          "stepNumber": 1,
          "id": "vend-01",
          "name": "Cashier Terminal Login",
          "description": "Initialize terminal session, enter staff credential PIN, validate staff role.",
          "status": "passed",
          "durationMs": 4100,
          "timestamp": "00:00",
          "videoTimestampSec": 0,
          "screenshotFileName": "01_cashier_login_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/01_cashier_login_screen.png",
          "logOutput": "I/flutter (24102): [CashierAuth] Cashier authenticated: 'Sarah Jenkins'\nI/flutter (24102): 📸 [Screenshot Captured]: 01_cashier_login_screen",
          "tags": [
            "POS",
            "Auth"
          ]
        },
        {
          "stepNumber": 2,
          "id": "vend-02",
          "name": "Store Outlet Selector Dialog",
          "description": "Select POS branch register from multi-location store directory.",
          "status": "passed",
          "durationMs": 3200,
          "timestamp": "00:05",
          "videoTimestampSec": 5,
          "screenshotFileName": "02_outlet_picker_dialog.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/02_outlet_picker_dialog.png",
          "logOutput": "I/flutter (24102): [Terminal] Register assigned: 'Downtown Counter #2'\nI/flutter (24102): 📸 [Screenshot Captured]: 02_outlet_picker_dialog",
          "tags": [
            "POS",
            "Outlet"
          ]
        },
        {
          "stepNumber": 3,
          "id": "vend-03",
          "name": "Cashier Shift Initialization",
          "description": "Open cash float verification screen, enter opening balance, start shift clock.",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:09",
          "videoTimestampSec": 9,
          "screenshotFileName": "03_start_shift_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/03_start_shift_screen.png",
          "logOutput": "I/flutter (24102): [Shift] Shift #1082 started at 09:50 AM with float $200.00\nI/flutter (24102): 📸 [Screenshot Captured]: 03_start_shift_screen",
          "tags": [
            "Shift",
            "POS"
          ]
        },
        {
          "stepNumber": 4,
          "id": "vend-04",
          "name": "Cashier POS Dashboard",
          "description": "Render cashier terminal dashboard, quick action buttons, shift stats card.",
          "status": "passed",
          "durationMs": 4400,
          "timestamp": "00:14",
          "videoTimestampSec": 14,
          "screenshotFileName": "04_cashier_home_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/04_cashier_home_screen.png",
          "logOutput": "I/flutter (24102): [POS] Terminal ready for customer scan\nI/flutter (24102): 📸 [Screenshot Captured]: 04_cashier_home_screen",
          "tags": [
            "Dashboard",
            "POS"
          ]
        },
        {
          "stepNumber": 5,
          "id": "vend-05",
          "name": "Vendor Camera Scanner Viewport",
          "description": "Activate merchant camera scanner, frame QR code with illuminated targeting crosshair.",
          "status": "passed",
          "durationMs": 4600,
          "timestamp": "00:19",
          "videoTimestampSec": 19,
          "screenshotFileName": "05_scanner_viewport.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/05_scanner_viewport.png",
          "logOutput": "I/flutter (24102): [Camera] High-speed QR scanner listening for pass\nI/flutter (24102): 📸 [Screenshot Captured]: 05_scanner_viewport",
          "tags": [
            "Camera",
            "Scan"
          ]
        },
        {
          "stepNumber": 6,
          "id": "vend-06",
          "name": "Manual Code Entry Fallback",
          "description": "Provide manual alphanumeric voucher entry pad for damaged QR codes.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "00:25",
          "videoTimestampSec": 25,
          "screenshotFileName": "06_manual_code_entry.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/06_manual_code_entry.png",
          "logOutput": "I/flutter (24102): [ManualEntry] Code entered: 'REW-9902'\nI/flutter (24102): 📸 [Screenshot Captured]: 06_manual_code_entry",
          "tags": [
            "POS",
            "Fallback"
          ]
        },
        {
          "stepNumber": 7,
          "id": "vend-07",
          "name": "Customer Identity Verified Modal",
          "description": "Pop customer profile verification modal, display tier, active stamps, and name.",
          "status": "passed",
          "durationMs": 4300,
          "timestamp": "00:30",
          "videoTimestampSec": 30,
          "screenshotFileName": "07_customer_verified_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/07_customer_verified_modal.png",
          "logOutput": "I/flutter (24102): [Customer] Verified customer 'Ahmed Al-Mansoor' (Gold Tier)\nI/flutter (24102): 📸 [Screenshot Captured]: 07_customer_verified_modal",
          "tags": [
            "Customer",
            "Verification"
          ]
        },
        {
          "stepNumber": 8,
          "id": "vend-08",
          "name": "Voucher Burn & Stamp Issue",
          "description": "Enter receipt amount ($45.00), select 20% discount coupon, compute +4 loyalty stamps.",
          "status": "passed",
          "durationMs": 4800,
          "timestamp": "00:36",
          "videoTimestampSec": 36,
          "screenshotFileName": "08_voucher_redemption_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/08_voucher_redemption_modal.png",
          "logOutput": "I/flutter (24102): [Redeem] Burn voucher VCH-881, award 4 stamps\nI/flutter (24102): 📸 [Screenshot Captured]: 08_voucher_redemption_modal",
          "tags": [
            "Redemption",
            "Voucher"
          ]
        },
        {
          "stepNumber": 9,
          "id": "vend-09",
          "name": "Transaction Success Receipt",
          "description": "Display animated success confirmation, print digital receipt, sound chime.",
          "status": "passed",
          "durationMs": 4100,
          "timestamp": "00:42",
          "videoTimestampSec": 42,
          "screenshotFileName": "09_transaction_success.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/09_transaction_success.png",
          "logOutput": "I/flutter (24102): [Tx] Transaction TX-9921 committed successfully\nI/flutter (24102): 📸 [Screenshot Captured]: 09_transaction_success",
          "tags": [
            "Success",
            "Receipt"
          ]
        },
        {
          "stepNumber": 10,
          "id": "vend-10",
          "name": "Updated Shift Dashboard",
          "description": "Verify real-time counter updates on cashier dashboard (+1 transaction, +$36.00).",
          "status": "passed",
          "durationMs": 3800,
          "timestamp": "00:47",
          "videoTimestampSec": 47,
          "screenshotFileName": "10_cashier_home_updated.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/10_cashier_home_updated.png",
          "logOutput": "I/flutter (24102): [Shift] Counter updated: 14 redemptions total\nI/flutter (24102): 📸 [Screenshot Captured]: 10_cashier_home_updated",
          "tags": [
            "Shift",
            "Dashboard"
          ]
        },
        {
          "stepNumber": 11,
          "id": "vend-11",
          "name": "End Shift Summary Ledger",
          "description": "Generate end-of-day cashier balancing sheet, total cash float, voucher breakdown.",
          "status": "passed",
          "durationMs": 4500,
          "timestamp": "00:52",
          "videoTimestampSec": 52,
          "screenshotFileName": "11_shift_summary_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/11_shift_summary_screen.png",
          "logOutput": "I/flutter (24102): [Shift] Summary ledger printed, shift closed\nI/flutter (24102): 📸 [Screenshot Captured]: 11_shift_summary_screen",
          "tags": [
            "Shift",
            "Audit"
          ]
        },
        {
          "stepNumber": 12,
          "id": "vend-12",
          "name": "Merchant Owner Portal Login",
          "description": "Authenticate with business owner credentials, verify multi-store permissions.",
          "status": "passed",
          "durationMs": 4200,
          "timestamp": "00:58",
          "videoTimestampSec": 58,
          "screenshotFileName": "12_owner_login_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/12_owner_login_screen.png",
          "logOutput": "I/flutter (24102): [OwnerAuth] Merchant Owner logged in: 'Nasser Al-Hassan'\nI/flutter (24102): 📸 [Screenshot Captured]: 12_owner_login_screen",
          "tags": [
            "Owner",
            "Auth"
          ]
        },
        {
          "stepNumber": 13,
          "id": "vend-13",
          "name": "Owner Pulse Analytics",
          "description": "View top-level revenue pulse, member acquisition graph, repeat customer retention rate.",
          "status": "passed",
          "durationMs": 4400,
          "timestamp": "01:04",
          "videoTimestampSec": 64,
          "screenshotFileName": "13_owner_pulse_dashboard.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/13_owner_pulse_dashboard.png",
          "logOutput": "I/flutter (24102): [Pulse] Retention: 78.4%, Monthly Loyalty Revenue: $18,450\nI/flutter (24102): 📸 [Screenshot Captured]: 13_owner_pulse_dashboard",
          "tags": [
            "Analytics",
            "Pulse"
          ]
        },
        {
          "stepNumber": 14,
          "id": "vend-14",
          "name": "Owner Campaigns Hub",
          "description": "List active marketing campaigns, seasonal double-stamp days, tier promo cards.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "01:09",
          "videoTimestampSec": 69,
          "screenshotFileName": "14_owner_campaigns_hub.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/14_owner_campaigns_hub.png",
          "logOutput": "I/flutter (24102): [Campaigns] 4 active loyalty promotions running\nI/flutter (24102): 📸 [Screenshot Captured]: 14_owner_campaigns_hub",
          "tags": [
            "Marketing",
            "Campaigns"
          ]
        },
        {
          "stepNumber": 15,
          "id": "vend-15",
          "name": "Create Campaign Wizard",
          "description": "Launch multi-step campaign builder: title, 2x multiplier, start date, eligible branches.",
          "status": "passed",
          "durationMs": 4300,
          "timestamp": "01:14",
          "videoTimestampSec": 74,
          "screenshotFileName": "15_create_campaign_wizard.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/15_create_campaign_wizard.png",
          "logOutput": "I/flutter (24102): [Wizard] Draft campaign: 'Weekend Double Stamps'\nI/flutter (24102): 📸 [Screenshot Captured]: 15_create_campaign_wizard",
          "tags": [
            "Wizard",
            "Campaign"
          ]
        },
        {
          "stepNumber": 16,
          "id": "vend-16",
          "name": "Staff & Cashier Management",
          "description": "Review list of authorized store cashiers, active register assignments, performance stats.",
          "status": "passed",
          "durationMs": 3600,
          "timestamp": "01:19",
          "videoTimestampSec": 79,
          "screenshotFileName": "16_owner_cashier_list.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/16_owner_cashier_list.png",
          "logOutput": "I/flutter (24102): [Staff] 6 cashiers configured across 3 outlets\nI/flutter (24102): 📸 [Screenshot Captured]: 16_owner_cashier_list",
          "tags": [
            "Staff",
            "Admin"
          ]
        },
        {
          "stepNumber": 17,
          "id": "vend-17",
          "name": "Add Cashier Staff Modal",
          "description": "Open new staff creation modal, set 4-digit PIN code, designate branch terminal.",
          "status": "passed",
          "durationMs": 3200,
          "timestamp": "01:23",
          "videoTimestampSec": 83,
          "screenshotFileName": "17_add_cashier_modal.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/17_add_cashier_modal.png",
          "logOutput": "I/flutter (24102): [Staff] Added cashier 'Omar Tariq' with PIN auth\nI/flutter (24102): 📸 [Screenshot Captured]: 17_add_cashier_modal",
          "tags": [
            "Staff",
            "Modal"
          ]
        },
        {
          "stepNumber": 18,
          "id": "vend-18",
          "name": "Store Settings & Branding",
          "description": "Configure store logo, operating hours, auto-print receipts, banking payout preferences.",
          "status": "passed",
          "durationMs": 3900,
          "timestamp": "01:26",
          "videoTimestampSec": 86,
          "screenshotFileName": "18_owner_settings_screen.png",
          "screenshotUrl": "/delivery_bundle/screenshots/vendor_app/18_owner_settings_screen.png",
          "logOutput": "I/flutter (24102): [Settings] Store configuration saved and synced to cloud\nI/flutter (24102): 📸 [Screenshot Captured]: 18_owner_settings_screen",
          "tags": [
            "Settings",
            "Store"
          ]
        }
      ],
      "logs": [
        "[09:50:02] [INFO] Runner switching target to vendor_app",
        "[09:50:05] [INFO] Granting permissions: CAMERA, POST_NOTIFICATIONS, ACCESS_COARSE_LOCATION",
        "[09:50:08] [INFO] Starting adb screenrecord on emulator-5554 (720x1280 @ 4Mbps)...",
        "[09:50:11] [STEP 1/18] Cashier Login Screen verification...",
        "[09:50:15] [STEP 2/18] Selecting store branch outlet in modal dialog...",
        "[09:50:19] [STEP 3/18] Initializing shift float & timestamp...",
        "[09:50:23] [STEP 4/18] Rendering cashier terminal home dashboard...",
        "[09:50:28] [STEP 5/18] Testing fast camera scanner viewfinder...",
        "[09:50:33] [STEP 6/18] Testing manual voucher code entry fallback...",
        "[09:50:37] [STEP 7/18] Verifying customer membership status modal...",
        "[09:50:43] [STEP 8/18] Applying 20% discount & burning voucher...",
        "[09:50:48] [STEP 9/18] Generating transaction success receipt...",
        "[09:50:52] [STEP 10/18] Checking real-time shift counters...",
        "[09:50:57] [STEP 11/18] Generating shift summary audit ledger...",
        "[09:51:03] [STEP 12/18] Logging into Merchant Owner portal...",
        "[09:51:09] [STEP 13/18] Hydrating Owner Pulse business analytics...",
        "[09:51:14] [STEP 14/18] Opening Owner Campaigns Hub...",
        "[09:51:18] [STEP 15/18] Running Create Campaign Wizard flow...",
        "[09:51:23] [STEP 16/18] Listing registered cashiers and terminals...",
        "[09:51:27] [STEP 17/18] Opening Add Cashier Staff modal sheet...",
        "[09:51:31] [STEP 18/18] Verifying Store Settings & payout configs...",
        "[09:51:35] [SUCCESS] All 18 Vendor App integration steps passed in 89.3s."
      ]
    }
  },
  {
    "id": "run-2026-10-01-002",
    "title": "Nightly Regression Suite #142",
    "branch": "staging",
    "commitHash": "9a21b44c",
    "commitMessage": "test: update integration tests for dynamic pass rotation",
    "author": "CI Automation Runner",
    "triggerType": "github_action",
    "environment": {
      "os": "Linux 6.16.8 (x86_64)",
      "device": "Pixel 8 Pro (API 34 / emulator-5554)",
      "flutterVersion": "3.29.0 • channel stable",
      "dartVersion": "3.7.0",
      "runnerHost": "gh-actions-runner-04"
    },
    "startTime": "2026-10-01T23:10:00Z",
    "endTime": "2026-10-01T23:20:45Z",
    "totalDurationSeconds": 645,
    "status": "passed",
    "customerApp": {
      "appType": "customer_app",
      "appName": "Rewardly Customer",
      "packageName": "com.rolality.customer_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "customer_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/customer_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.5 MB",
      "apkSizeBytes": 18400601,
      "videoFileName": "customer_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/customer_app_integration.mp4",
      "videoSizeFormatted": "1.85 MB",
      "videoSizeBytes": 1935524,
      "status": "passed",
      "totalSteps": 16,
      "passedSteps": 16,
      "failedSteps": 0,
      "durationSeconds": 74,
      "steps": [],
      "logs": [
        "[Nightly] All customer tests executed cleanly."
      ]
    },
    "vendorApp": {
      "appType": "vendor_app",
      "appName": "Rewardly Vendor & POS",
      "packageName": "com.rolality.vendor_app",
      "version": "1.0.0",
      "buildNumber": 1,
      "flavor": "release",
      "apkFileName": "vendor_app_v1.0.0+1_arm64.apk",
      "apkUrl": "https://github.com/IsmailHosenIsmailJames/Mobile-QA-Portal/releases/download/v1.0.0/vendor_app_v1.0.0+1_arm64.apk",
      "apkSizeFormatted": "17.2 MB",
      "apkSizeBytes": 18057957,
      "videoFileName": "vendor_app_integration.mp4",
      "videoUrl": "/delivery_bundle/recordings/vendor_app_integration.mp4",
      "videoSizeFormatted": "2.53 MB",
      "videoSizeBytes": 2656684,
      "status": "passed",
      "totalSteps": 18,
      "passedSteps": 18,
      "failedSteps": 0,
      "durationSeconds": 89,
      "steps": [],
      "logs": [
        "[Nightly] All vendor tests executed cleanly."
      ]
    }
  }
];
