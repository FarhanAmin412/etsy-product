import CanvaLogo from "../../../assets/canva.png";
import KittlLogo from "../../../assets/kittl.jpg";
import AdobeLogo from "../../../assets/adobe.jpeg";

export const getLink = (url) => {
  let urlLink = typeof url === "string" ? url : url[0];

  let canvaUrl = urlLink.search("canva");
  let kittleURL = urlLink.search("kittl");
  let adobeURL = urlLink.search("adobe");

  if (canvaUrl > 0 || kittleURL > 0 || adobeURL > 0) {
    return urlLink;
  }
};

export const getUploadedImage = (item, type) => {
  let graphic_image = item ? item.graphic_image : "";
  let notecard_image = item ? item.notecard_image : "";
  let grouped_images = [graphic_image, notecard_image];

  let newArray = grouped_images.map((graphic) => {
    let imageLink = graphic
      ? typeof graphic === "string"
        ? graphic
        : graphic[1]
      : "";
    let urlLink = graphic
      ? typeof graphic === "string"
        ? graphic
        : graphic[0]
      : "";

    let image = imageLink?.search("image");
    let canvaUrl = urlLink?.search("canva");
    let kittleURL = urlLink?.search("kittl");
    let adobeURL = urlLink?.search("adobe");

    if (image > 0) {
      return imageLink;
    } else {
      if (canvaUrl > 0) {
        return CanvaLogo;
      }
      if (kittleURL > 0) {
        return KittlLogo;
      }
      if (adobeURL > 0) {
        return AdobeLogo;
      }
    }
  });

  let array = newArray.filter((item) => item !== undefined);
  if (type === "graphic") {
    return array[0];
  } else if (type === "notecard") {
    return array[1];
  } else {
    return newArray.filter((item) => item !== undefined);
  }
};

export const checkURL = (url) => {
  if (typeof url === "string") {
    const canvaUrl = url.search("canva");
    const kittleURL = url.search("kittl");
    const adobeURL = url.search("adobe");

    if (canvaUrl > 0 || kittleURL > 0 || adobeURL > 0) {
      return "url";
    } else {
      return "image";
    }
  } else {
    const canvaUrl = url[0]?.search("canva");
    const kittleURL = url[0]?.search("kittl");
    const adobeURL = url[0]?.search("adobe");

    if (canvaUrl > 0 || kittleURL > 0 || adobeURL > 0) {
      return "url";
    } else {
      return "image";
    }
  }
};
