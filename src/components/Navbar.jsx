import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ setFileType, fileTypes }) => {
  const handleFileTypeChange = (e) => {
    setFileType(e);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={"/"}>
          <i
            className="fa fa-file-text-o"
            style={{ fontSize: "36px", color: "red" }}
          ></i>
          &nbsp;FileFusion
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li className="dropdown">
          <Link href="#">File type</Link>
          <ul className="dropdown-content">
            {fileTypes.map((fileType) => {
              return (
                <li key={fileType}>
                  <div
                    value={fileType}
                    onClick={() => handleFileTypeChange(fileType)}
                  >
                    {fileType}
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
