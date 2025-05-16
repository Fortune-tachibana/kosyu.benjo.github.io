function testGasGetRequest() {
  const gasGetUrl = "https://script.google.com/macros/s/AKfycbw5RcZIGFGZs3e6WpxMuB3R8s8c3ntN4OGjKBYak8CyfAgbPhFn2osxWfiTGDwGUXgQ/exec";

  fetch(gasGetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log("✅ GET Response from GAS:", data);
      alert("GETリクエスト成功！コンソールを確認してください。");
    })
    .catch(error => {
      console.error("❌ GET Request Error:", error);
      alert("GETリクエストに失敗しました。コンソールを確認してください。");
    });
}

// ボタンがクリックされたときに testGasGetRequest 関数を実行する例
document.addEventListener('DOMContentLoaded', function() {
  const testButton = document.createElement('button');
  testButton.textContent = 'GAS GETリクエストをテスト';
  testButton.addEventListener('click', testGasGetRequest);
  document.body.appendChild(testButton);
});