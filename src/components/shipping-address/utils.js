export const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#212B36" : "rgba(145, 158, 171, 0.32)",
    height: "55px",
    borderRadius: "6px",
    zIndex: 9999,
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    maxHeight: "180px",
  }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};
