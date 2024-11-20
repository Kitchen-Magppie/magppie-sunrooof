function saveDetails() {
  const clientName = document.getElementById("clientName").value;
  const imageUpload = document.getElementById("imageUpload").files[0];

  if (imageUpload) {
    const reader = new FileReader();
    reader.onloadend = function () {
      localStorage.setItem("clientName", clientName);
      localStorage.setItem("imageData", reader.result);
      window.location.href = "canvas.html";
    };
    reader.readAsDataURL(imageUpload);
  }
}
