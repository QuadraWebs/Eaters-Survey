function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = e.parameter;
    
    const headers = [
        'user_mood',
        'user_location',
        'weather',
        'user_collection',
        'user_recent_search',
        'final_food_decision',
        'food_categories',
        'weightage_reference_benchmark'
    ];
    
    const row = headers.map(header => data[header]);
    sheet.appendRow(row);
    
    return ContentService.createTextOutput('Success');
}
