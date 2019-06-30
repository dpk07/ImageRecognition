export function uploadImage(image) {
  var formData = new FormData();
  formData.append("image", image);
  return fetch("/getPrediction", {
    method: "POST",
    body: formData
  }).then(response => response.json());
}
