import { memo } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = ({ navElements, defaultMenu }) => {
  const { detailId } = useParams();

  return (
    <>
      <Nav defaultActiveKey="/home" className="flex-column">
        {navElements.map((element, index) => (
          <Nav.Link
            as={NavLink}
            to={element.route}
            key={index}
            className={
              element.route.substring(
                element.route.lastIndexOf("/") + 1,
                element.route.length
              ) === detailId ||
              (!detailId &&
                element.route.substring(
                  element.route.lastIndexOf("/") + 1,
                  element.route.length
                ) === defaultMenu)
                ? "active-color-side-navbar"
                : "text-muted"
            }
          >
            <div className="h3 ">{element.title}</div>
          </Nav.Link>
        ))}
      </Nav>
    </>
  );
};

export default memo(Sidebar);
