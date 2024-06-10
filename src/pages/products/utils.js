const checkIfImageExist = (item) => {
  let isImage = item.preview_image ? item.preview_image.search("image") : 0;
  if (isImage > 1) {
    return [item.preview_image];
  } else {
    return item.catalog.images;
  }
};

export const formatProductsList = (productsList) => {
  return [
    ...(productsList &&
      productsList.map((item) => ({
        id: item.id,
        listing_id: item.listing_id ? item.listing_id : null,
        amazon_sku: item.amazon_sku ? item.amazon_sku : null,
        cover: checkIfImageExist(item),
        images: checkIfImageExist(item),
        uploadedData: item.graphic_image,
        notecardData: item.notecard_image,
        name: item.title === "undefined" ? item.catalog.title : item.title,
        desc: item.description,
        price: item.price,
        shipPrice: item.catalog.shipping_price,
        catalog: item.catalog,
        no_of_graphics: item?.no_of_graphics,
        breadCrumb: "products",
      }))),
  ];
};
