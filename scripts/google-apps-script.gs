/**
 * Backing script for the Google Sheet webhook used by:
 *   - src/app/api/waitlist/route.ts  (source: "website" / anything but "order")
 *   - src/app/api/order/route.ts     (source: "order")
 *
 * This is the REAL script — bound to the "Moan Waitlist" spreadsheet
 * (project 1dKEtelawYyadGG_dpyFFMeMly1xZOERyrMwcICqDMvl6_EO_nf74qPDI),
 * already deployed at the URL in NEXT_PUBLIC_GOOGLE_SHEET_URL / the
 * hardcoded fallback in both API routes.
 *
 * Waitlist behavior is unchanged from the original: appends
 * [timestamp, email, phone, gender, source] to the active sheet of the
 * bound spreadsheet. Order entries are appended to a SEPARATE spreadsheet
 * ("Order sheet") identified by ORDERS_SPREADSHEET_ID below.
 *
 * Deploy: paste this into Code.gs on the bound project → Ctrl+S →
 * Deploy → Manage deployments → edit the existing deployment → New
 * version → Deploy. Reusing the existing deployment keeps the same
 * /exec URL, so no changes are needed on the Next.js side.
 */

var ORDERS_SPREADSHEET_ID = "1r9K2UFKhjMbHeZFLKzfTyFdVNbmBZHuk_EIhMdl6zkA";

function doPost(e) {
    var data = JSON.parse(e.postData.contents);

    try {
        if (data.source === "order") {
            var ordersSs = SpreadsheetApp.openById(ORDERS_SPREADSHEET_ID);
            appendOrder(ordersSs, data);
        } else {
            var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
            sheet.appendRow([
                new Date().toLocaleString(),
                data.email || "",
                data.phone || "",
                data.gender || "",
                data.source || "website",
            ]);
        }
        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: err.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function appendOrder(ss, data) {
    var sheet = ss.getSheetByName("Orders");
    if (!sheet) {
        sheet = ss.insertSheet("Orders");
        sheet.appendRow([
            "Timestamp", "Name", "Email", "Phone", "Address", "City", "Pincode",
            "Payment Method", "Items", "Subtotal",
        ]);
    }

    var items = [];
    try {
        items = JSON.parse(data.items || "[]");
    } catch (parseErr) {
        items = [];
    }
    var itemsSummary = items.map(function (item) {
        return item.name + " (" + item.label + ") x" + item.quantity + " — Rs " + item.price;
    }).join("; ");

    sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.address || "",
        data.city || "",
        data.pincode || "",
        data.paymentMethod || "",
        itemsSummary,
        data.subtotal || 0,
    ]);
}
