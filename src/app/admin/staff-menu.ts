import { NbMenuItem } from "@nebular/theme";

export const Staff_ITEMS: NbMenuItem[] = [
  {
    title: "Thống kê",
    icon: "pie-chart-outline",
    link: "/admin/manage-statistics/statistics",
    home: true,
  },
  {
    title: "Chức năng ban quản lý ",
    group: true,
  },
  {
    title: "Quản lý căn hộ",
    icon: "person",
    children: [
      {
        title: "Danh sách căn hộ",
        link: "/admin/manage-canho/canho",
      },
      {
        title: "Thông tin thẻ/phương tiện",
        link: "/admin/manage-canho/the-phuongtien",
      },
      // {
      //   title: "Thông tin phương tiện",
      //   link: "/admin/manage-user/member",
      // },
    ],
  },
  {
    title: "Quản lý dịch vụ",
    icon: "person",
    expanded: true,
    children: [
      {
        title: "Danh sách dịch vụ",
        link: "/admin/manage-dichvu/dich-vu",
      },
    ],
  },
  {
    title: "Quản lý hoá đơn",
    icon: "person",
    children: [
      {
        title: "Danh sách hoá đơn",
        link: "/admin/manage-hoadon/hoadon-list",
      },
      // {
      //   title: "Thu và thanh toán online",
      //   link: "/admin/manage-untility/type-untility",
      // },
      // {
      //   title: "Hoá đơn thu phí dịch vụ",
      //   link: "/admin/manage-untility/type-untility",
      // },
    ],
  },
  {
    title: "Quản lý thông báo",
    icon: "person",
    children: [
      {
        title: "Thông báo chung",
        link: "/admin/manage-post/post",
      },
      {
        title: "Thông báo riêng",
        link: "/admin/manage-post/type-post",
      },
    ],
  },
  // {
  //   title: "Tham khảo",
  //   expanded: false,
  //   icon: "layout-outline",
  //   hidden: false,
  //   children: [
  //     {
  //       title: "E-commerce",
  //       icon: "shopping-cart-outline",
  //       link: "/admin/dashboard",
  //     },
  //     {
  //       title: "IoT Dashboard",
  //       icon: "home-outline",
  //       link: "/admin/iot-dashboard",
  //     },
  //     {
  //       title: "Layout",
  //       icon: "layout-outline",
  //       children: [
  //         {
  //           title: "Stepper",
  //           link: "/admin/layout/stepper",
  //         },
  //         {
  //           title: "List",
  //           link: "/admin/layout/list",
  //         },
  //         {
  //           title: "Infinite List",
  //           link: "/admin/layout/infinite-list",
  //         },
  //         {
  //           title: "Accordion",
  //           link: "/admin/layout/accordion",
  //         },
  //         {
  //           title: "Tabs",
  //           pathMatch: "prefix",
  //           link: "/admin/layout/tabs",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Forms",
  //       icon: "edit-2-outline",
  //       children: [
  //         {
  //           title: "Form Inputs",
  //           link: "/admin/forms/inputs",
  //         },
  //         {
  //           title: "Form Layouts",
  //           link: "/admin/forms/layouts",
  //         },
  //         {
  //           title: "Buttons",
  //           link: "/admin/forms/buttons",
  //         },
  //         {
  //           title: "Datepicker",
  //           link: "/admin/forms/datepicker",
  //         },
  //       ],
  //     },
  //     {
  //       title: "UI Features",
  //       icon: "keypad-outline",
  //       link: "/admin/ui-features",
  //       children: [
  //         {
  //           title: "Grid",
  //           link: "/admin/ui-features/grid",
  //         },
  //         {
  //           title: "Icons",
  //           link: "/admin/ui-features/icons",
  //         },
  //         {
  //           title: "Typography",
  //           link: "/admin/ui-features/typography",
  //         },
  //         {
  //           title: "Animated Searches",
  //           link: "/admin/ui-features/search-fields",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Modal & Overlays",
  //       icon: "browser-outline",
  //       children: [
  //         {
  //           title: "Dialog",
  //           link: "/admin/modal-overlays/dialog",
  //         },
  //         {
  //           title: "Window",
  //           link: "/admin/modal-overlays/window",
  //         },
  //         {
  //           title: "Popover",
  //           link: "/admin/modal-overlays/popover",
  //         },
  //         {
  //           title: "Toastr",
  //           link: "/admin/modal-overlays/toastr",
  //         },
  //         {
  //           title: "Tooltip",
  //           link: "/admin/modal-overlays/tooltip",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Extra Components",
  //       icon: "message-circle-outline",
  //       children: [
  //         {
  //           title: "Calendar",
  //           link: "/admin/extra-components/calendar",
  //         },
  //         {
  //           title: "Progress Bar",
  //           link: "/admin/extra-components/progress-bar",
  //         },
  //         {
  //           title: "Spinner",
  //           link: "/admin/extra-components/spinner",
  //         },
  //         {
  //           title: "Alert",
  //           link: "/admin/extra-components/alert",
  //         },
  //         {
  //           title: "Calendar Kit",
  //           link: "/admin/extra-components/calendar-kit",
  //         },
  //         {
  //           title: "Chat",
  //           link: "/admin/extra-components/chat",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Charts",
  //       icon: "pie-chart-outline",
  //       children: [
  //         {
  //           title: "Echarts",
  //           link: "/admin/charts/echarts",
  //         },
  //         {
  //           title: "Charts.js",
  //           link: "/admin/charts/chartjs",
  //         },
  //         {
  //           title: "D3",
  //           link: "/admin/charts/d3",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
