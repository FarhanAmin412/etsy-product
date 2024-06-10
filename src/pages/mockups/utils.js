import { Paper, styled } from "@mui/material";

export const formatMockupData = (mockups, currentPage, itemsPerPage) => {
  const groupedData = {};

  mockups?.forEach((item) => {
    const sectionName = item.mockupSection.name;
    if (!groupedData[sectionName]) {
      groupedData[sectionName] = {
        sectionName: sectionName,
        images: [],
        documents: [],
        urls: [],
      };
    }

    const type = item.type.toLowerCase();
    if (type === "png" || type === "jpg" || type === "jpeg") {
      const filename = `Image-${groupedData[sectionName].images.length + (currentPage * itemsPerPage ) + 1}`;
      item.filename = filename;
      groupedData[sectionName].images.push(item);
    } else if (type === "psd" || type === "zip") {
      groupedData[sectionName].documents.push(item);
    } else {
      groupedData[sectionName].urls.push(item);
    }
  });

  const formattedMockups = Object.values(groupedData);

  return formattedMockups;
};

export const StyledPaper = styled(Paper)({
  boxShadow:
    "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
  borderRadius: "12px",
});
