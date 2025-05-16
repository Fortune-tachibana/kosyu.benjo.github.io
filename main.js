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

      fetch("https://script.google.com/macros/s/AKfycbxeMDjyjY0P_c3l3ob4Yd57hrqxGaX7styvb23Z_EiEZLvCTaTXyQVSUagC274Lt8kk0A/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
        if (result.result === "success") {
          console.log("✅ 位置情報送信成功");
          // 必要なら次の画面へ遷移など
          window.location.href = "show.html";
        } else {
          console.error("❌ エラー:", result.message);
          alert("送信に失敗しました：" + result.message);
        }
      })
      .catch(error => {
        console.error("❌ 通信失敗:", error);
        alert("位置情報の送信に失敗しました。");
      });
    },
    (error) => {
      console.error("位置情報取得失敗:", error);
      alert("位置情報の取得に失敗しました。");
    }
  );
}

document.getElementById("start-btn")?.addEventListener("click", sendLocationToSheet);
