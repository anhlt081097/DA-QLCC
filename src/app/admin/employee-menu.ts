import { NbMenuItem } from "@nebular/theme";

export const Employee_ITEMS: NbMenuItem[] = [
  {
    title: "Thông báo",
    icon: "pie-chart-outline",
    link: "/admin/manage-statistics/statistics",
    home: true,
  },
  {
    title: "Chức năng khách hàng",
    group: true,
  },
  {
    title: "Thông tin căn hộ",
    icon: "person",
    children: [
      {
        title: "Căn hộ",
        link: "/admin/manage-canho/detail/infor",
      },
    ],
  },
  // {
  //   title: 'Quản lý nhà',
  //   icon: 'home',
  //   children: [
  //     {
  //       title: 'Nhà',
  //       link: '/admin/manage-house/house',
  //       home: true,
  //     },
  //     {
  //       title: 'Cảnh quan',
  //       link: '/admin/manage-house/view',
  //     },
  //   ],
  // },
  // {
  //   title: 'Quản lý đặt phòng',
  //   icon: 'shopping-cart-outline',
  //   expanded: true,
  //   children: [
  //     {
  //       title: 'Đặt phòng',
  //       link: '/admin/manage-house/booking',
  //     },
  //     {
  //       title: 'Danh sách đặt phòng',
  //       link: '/admin/manage-house/order',
  //     },
  //     {
  //       title: 'Danh sách đang sử dụng',
  //       link: '/admin/manage-house/check-in',
  //     },
  //     {
  //       title: 'Hóa đơn',
  //       link: '/admin/manage-house/transaction',
  //     },
  //     {
  //       title: 'Đơn đã hủy',
  //       link: '/admin/manage-house/refund',
  //     },
  //   ],
  // },
  // {
  //   title: 'Quản lý bài viết',
  //   icon: 'edit-2-outline',
  //   children: [
  //     {
  //       title: 'Bài viết',
  //       link: '/admin/manage-post/type-post',
  //     },
  //   ],
  // },
  // {
  //   title: "Tham khảo",
  //   expanded: false,
  //   icon: "layout-outline",
  //   hidden: true,
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
