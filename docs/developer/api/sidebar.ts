import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "developer/api/monni-public-api",
    },
    {
      type: "category",
      label: "points",
      items: [
        {
          type: "doc",
          id: "developer/api/get-user-points-points-system-user-id-get",
          label: "Get User Points",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "developer/api/edit-user-points-points-system-user-id-patch",
          label: "Edit User Points",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "developer/api/set-user-points-points-system-user-id-put",
          label: "Set User Points",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "developer/api/bulk-change-points-points-system-post",
          label: "Bulk Change Points",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
