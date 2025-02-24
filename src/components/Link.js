import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

function Link({ to, children, className, activeClassName }) {
  const { navigate, currentPath } = useNavigation();
  const classes = classNames(
    "text-blue-500",
    className,
    currentPath === to && activeClassName
  );
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey) {
      return;
    }
    e.preventDefault();
    navigate(to);
    // console.log(e);
  };
  return (
    <a href={to} onClick={handleClick} className={classes}>
      {children}
    </a>
  );
}
export default Link;
