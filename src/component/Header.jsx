import { IoMdMenu } from "react-icons/io";

export default function Header({ onMenu, setOnMenu }) {
  // Toggle menu
  const handleMenu = () => {
    setOnMenu((prev) => !prev);
  };

  return (
    <div className="header">
      <button
        className="button-menu"
        onClick={handleMenu}
        aria-label={onMenu ? "Close menu" : "Open menu"}
      >
        <IoMdMenu className="icon-menu" />
      </button>
    </div>
  );
}
