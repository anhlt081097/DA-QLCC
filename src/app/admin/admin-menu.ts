import { NbMenuItem } from "@nebular/theme";

export const Admin_ITEMS: NbMenuItem[] = [
  {
    title: "Thống kê",
    icon: "pie-chart-outline",
    link: "/admin/manage-statistics/statistics",
    home: true,
  },
  {
    title: "Chức năng quản trị viên ",
    group: true,
  },
  {
    title: "Quản lý bộ phận",
    icon: "person",
    children: [
      {
        title: "Danh sách bộ phận",
        link: "/admin/manage-phongban/phongBan",
      },
    ],
  },
  {
    title: "Quản lý tài khoản",
    icon: "person",
    children: [
      {
        title: "Danh sách tài khoản",
        link: "/admin/manage-phongban/taiKhoan",
      },
    ],
  },
];
