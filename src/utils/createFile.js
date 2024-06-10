export async function createFile(url, setState) {
  let response = await fetch(url);
  let data = await response.blob();
  let metadata = {
    type: "image/jpeg",
  };
  let file = new File([data], "test.jpg", metadata);

  setState([file]);
}
