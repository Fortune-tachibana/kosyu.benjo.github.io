function sendLocationToSheet() {
  if (!navigator.geolocation) {
    alert("このブラウザでは位置情報が取得できません。");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString()
      };

      fetch("https://script.google.com/macros/s/AKfycbwQiAMiMRxImP3Llct8eJbcHS6NtGd9waT6r2LtRRJw8KgvhNV2ALoe5cNBYnyfw7Oi/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then(result => {
        console.log("✅ 位置情報送信成功:", result);
        // 位置送信成功後にページ遷移
        window.location.href = "show.html";
      })
      .catch(error => {
        console.error("❌ 送信失敗:", error);
        alert("位置情報の送信に失敗しました。");
      });
    },
    (error) => {
      console.error("位置情報取得失敗:", error);
      alert("位置情報の取得に失敗しました。");
    }
  );
}

// ボタンのIDが「start-btn」に正しく設定されているので、以下のように修正
document.getElementById("start-btn")?.addEventListener("click", sendLocationToSheet);
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

      fetch("https://script.google.com/macros/s/AKfycbwOtHaKIqoGmhl3ph4oWPZh73pv1Q3xhg4D-zc9h5CiLpE4plmwdvUpReQoxr31Ueh5/exec", {
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
