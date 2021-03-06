import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { profileSelector } from "../../../../store/selectors";
import { setAuthenticated } from "../../../../store/features/AuthSlice";

const User = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const data = JSON.parse(profile);

  const handleSignout = () => {
    localStorage.removeItem("access_token");
    dispatch(setAuthenticated(false));
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{data.session_type === "USER" ? "Admin" : "Asesor"}</div>
            <div className="user-name dropdown-indicator">
              {data.name} {data.paternalLastName}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>JD</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{/* {data.name} {data.lastName} */}</span>
              {/* <span className="sub-text">{data.email}</span> */}
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              Ver Perfil
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Configuracion
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Logout</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
