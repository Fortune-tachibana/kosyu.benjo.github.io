function sendLocationToSheet() {
  console.log("📍 位置情報取得を開始");

  if (!navigator.geolocation) {
    alert("このブラウザでは位置情報が取得できません。");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("📍 位置情報取得成功:", position);

      const data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString()
      };

      // **どちらか一方のURLに統一してください。**
      const gasUrl = "https://script.google.com/macros/s/AKfycbxNZ2w4-AfXT5-xBPwc9rPL7tF4tf_1AvOd6rbG4bjRXudY4KHjGynDnZsx2dNXvHNB/exec"; // 例

      fetch(gasUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then(result => {
        console.log("✅ 送信成功:", result);
        window.location.href = "show.html";
      })
      .catch(error => {
        console.error("❌ 送信エラー:", error);
        alert("位置情報の送信に失敗しました。");
      });
    },
    (error) => {
      console.error("❌ 位置情報取得失敗:", error);
      alert("位置情報の取得に失敗しました。");
    }
  );
}

document.getElementById("start-btn")?.addEventListener("click", sendLocationToSheet);