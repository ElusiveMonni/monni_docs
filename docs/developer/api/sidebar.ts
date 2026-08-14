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
          id: "developer/api/get-user-points-v-1-points-system-user-id-get",
          label: "Get User Points",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "developer/api/edit-user-points-v-1-points-system-user-id-patch",
          label: "Edit User Points",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "developer/api/set-user-points-v-1-points-system-user-id-put",
          label: "Set User Points",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "developer/api/bulk-change-points-v-1-points-system-post",
          label: "Bulk Change Points",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "automations",
      items: [
        {
          type: "doc",
          id: "developer/api/run-manual-trigger-v-1-automations-trigger-id-run-post",
          label: "Run Manual Trigger",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "members",
      items: [
        {
          type: "doc",
          id: "developer/api/get-member-roles-v-1-members-user-id-roles-get",
          label: "Get Member Roles",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "developer/api/check-member-role-v-1-members-user-id-roles-role-id-get",
          label: "Check Member Role",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "limits",
      items: [
        {
          type: "doc",
          id: "developer/api/get-rate-limits-v-1-limits-get",
          label: "Get Rate Limits",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "identity",
      items: [
        {
          type: "doc",
          id: "developer/api/verification-status-v-1-identity-status-user-id-get",
          label: "Verification Status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "developer/api/identity-by-discord-v-1-identity-provider-by-discord-user-id-get",
          label: "Identity By Discord",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "developer/api/identity-by-external-v-1-identity-provider-by-external-external-id-get",
          label: "Identity By External",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
