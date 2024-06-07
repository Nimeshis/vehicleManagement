import { SidebarSearch } from "@app/components/sidebar-search/SidebarSearch";
import i18n from "@app/utils/i18n";
import { MenuItem } from "@components";
import { Image } from "@profabric/react-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t("Setting"),
    icon: "fas fa-wrench",
    children: [
      {
        name: i18n.t("Maker"),

        path: "/maker",
      },
      {
        name: i18n.t("Vehicle Engiene  Type"),

        path: "/vechileEngineType",
      },
      {
        name: i18n.t("Unit"),

        path: "/unit",
      },
      {
        name: i18n.t("Status"),

        path: "/status",
      },
      {
        name: i18n.t("Model"),

        path: "/model",
      },
      {
        name: i18n.t("Insurance Company"),

        path: "/insurance",
      },
      {
        name: i18n.t("Vehicle Attachment"),

        path: "/vechile_attachment",
      },
      {
        name: i18n.t("Work Assignment"),

        path: "/work_assignment",
      },
      {
        name: i18n.t("Vehicle Type"),

        path: "/vechile_type",
      },
      {
        name: i18n.t("Site"),

        path: "/site",
      },
      {
        name: i18n.t("Insurance Type"),

        path: "/insurance_type",
      },
      {
        name: i18n.t("Documents"),

        path: "/documents",
      },
      {
        name: i18n.t("Dealer"),

        path: "/dealer",
      },
      {
        name: i18n.t("Warranty Type"),

        path: "/warranty_type",
      },
      {
        name: i18n.t("Owner"),

        path: "/owner",
      },
      {
        name: i18n.t("Ownership Type"),

        path: "/ownership_type",
      },
      {
        name: i18n.t("Page"),

        path: "/page",
      },
    ],
  },

  {
    name: i18n.t("User"),
    icon: "fas fa-user",
    children: [
      {
        name: i18n.t("Add User"),
        icon: "fas fa-user-plus",
        path: "/",
      },
      {
        name: i18n.t("Users"),
        icon: "fas fa-user",
        path: "/users",
      },
    ],
  },
  {
    name: i18n.t("UploadImages"),
    icon: "fas fa-user",
    path: "/uploadImages",
  },
];

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const authentication = useSelector((state: any) => state.auth.authentication);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">Vehicle Management</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={authentication.profile.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {authentication.profile.email}
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <SidebarSearch />
        </div>

        <nav className="mt-2" style={{ overflowY: "hidden" }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? " nav-flat" : ""
            }${menuChildIndent ? " nav-child-indent" : ""}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
