import { filter } from "lodash";
import { setModalState } from "src/redux/actions/modalActions";
import UserStats from "src/sections/modals/user/userStats";
import request from "src/utils/request";
import { toastify } from "src/utils/toast";

export const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "action", label: "" },
];

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_user) =>
        (_user.name &&
          _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        (_user.email &&
          _user.email.toString().toLowerCase().indexOf(query.toLowerCase()) !==
            -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export const getUserStats = async (row, dispatch, avatarUrl) => {
  let userStats = {};

  try {
    const res = await request.post("/orders/stats/user", { user_id: row.id });

    if (res) {
      let data = res.data.data.stats;

      userStats = {
        name: row.name,
        ornamentSold: data.ornaments,
        tumblerSold: data.tumblers,
        totalProducts: data.products,
      };
      dispatch(
        setModalState(<UserStats user={userStats} avatarUrl={avatarUrl} />)
      );
    }
  } catch (e) {
    toastify("error", e.response.data.message);
  }
};
