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
      const gasUrl = "https://script.google.com/macros/s/AKfycbw8WcwoJ3QffA10hXTQRTkbxQ67Lnt4gZxCgcUAGGmdvxdJ0Em1G6wjWiApprSRRNrk/exec"; // 例

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