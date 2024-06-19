let partNames = []; // ตัวแปรเก็บชื่อ Parts ทั้งหมดจากไฟล์ CSV

// เมื่อมีการเลือกไฟล์ CSV
$('#csvFile').on('change', function(event) {
  var file = event.target.files[0];

  if (!file) {
    return;
  }

  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function(e) {
    var csvContent = e.target.result;
    processData(csvContent);
  };

  reader.onerror = function() {
    alert('เกิดข้อผิดพลาดในการอ่านไฟล์ CSV');
  };
});

// ฟังก์ชัน processData สำหรับประมวลผลข้อมูล CSV
function processData(csvContent) {
  var lines = csvContent.split('\n');
  var headers = lines[0].split(',').map(header => header.trim().toLowerCase()); // แยกหัวคอลัมน์และทำให้เป็นตัวพิมพ์เล็กทั้งหมด

  // หา index ของคอลัมน์ "parts name"
  var partNameIndex = headers.indexOf('parts name');

  if (partNameIndex === -1) {
    alert('ไม่พบคอลัมน์ "Parts Name" ในไฟล์ CSV');
    return;
  }

  partNames = []; // รีเซ็ตตัวแปร partNames

  // วนลูปหาข้อมูลที่ตรงเงื่อนไข
  for (var i = 1; i < lines.length; i++) {
    var parts = lines[i].split(',');

    if (parts.length > partNameIndex) {
      var partName = parts[partNameIndex].trim();
      partNames.push(partName);
    }
  }
}

// ฟังก์ชันค้นหา Part Name จากข้อมูล CSV ที่อัปโหลดมา
function searchPartNames() {
  var searchTerm = $('#searchInput').val().toLowerCase().trim();
  
  if (searchTerm === '') {
    alert('กรุณากรอกคำที่ต้องการค้นหา');
    return;
  }

  var filteredResults = partNames.filter(function(name) {
    return name.toLowerCase().includes(searchTerm);
  });

  displaySearchResults(filteredResults);
}

// ฟังก์ชันแสดงผลลัพธ์การค้นหา
function displaySearchResults(results) {
  var resultsList = $('#resultsList');
  resultsList.empty();

  results.forEach(function(result) {
    resultsList.append($('<option>').text(result));
  });
}