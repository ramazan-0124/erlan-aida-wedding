// ════════════════════════════════════════════════════════════════════
//  Google Apps Script — RSVP → Google Sheets
//  Осы кодты Apps Script редакторына қойып, ҚАЙТА DEPLOY жасаңыз:
//    Deploy → Manage deployments → (қарындаш) → New version → Deploy
//  Сол exec-URL сақталады, data.js өзгертпейсіз.
//
//  Кестенің 1-жолы (тақырыптар) — қаласаңыз қолмен қойыңыз:
//    A: Аты-жөні | B: Қатысу | C: Адам саны | D: Уақыт (Алматы)
// ════════════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Уақыт: клиент жіберген «time» болса — соны, болмаса сервер есептейді.
    // Сервердегі уақытты әрдайым Алматы белдеуінде (UTC+5) форматтаймыз.
    var time = data.time || Utilities.formatDate(
      new Date(),
      'Asia/Almaty',
      'dd.MM.yyyy HH:mm:ss'
    );

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      data.name,       // A — Аты-жөні
      data.attend,     // B — Келемін / Келмеймін
      data.guests,     // C — Адам саны
      time,            // D — Уақыт (Алматы)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
