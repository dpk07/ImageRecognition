export function uploadImage(image) {
  var formData = new FormData();
  formData.append("image", image);
  return fetch("http://localhost:3000/getPrediction", {
    method: "POST",
    body: formData
  }).then(response => response.json());
}
