document.getElementById('start-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('位置情報を取得できませんでした。');
  }
});

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      const prefecture = data.address.state || "不明";

      // Google Sheets に送信
      fetch('https://script.google.com/macros/s/AKfycbwOtHaKIqoGmhl3ph4oWPZh73pv1Q3xhg4D-zc9h5CiLpE4plmwdvUpReQoxr31Ueh5/exec', {
        method: 'POST',
        body: JSON.stringify({ lat, lon, prefecture }),
        headers: { 'Content-Type': 'application/json' }
      });

      // 次の画面に遷移
      window.location.href = `show.html?pref=${encodeURIComponent(prefecture)}`;
    });
}

function error(err) {
  alert('位置情報の取得に失敗しました。');
}
