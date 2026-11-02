import { useAppSelector, useAppDispatch } from "@/app/store";
import clsx from "clsx";
import styles from "./Header.module.css";
import { changeTab } from "@/features/handleUISlice";

const { appHeader, appTitle, appTabs, tab, active } = styles;

const Header = () => {
  const TABS = useAppSelector((state) => state.handleUI.tabs);
  const activeTab = useAppSelector((state) => state.handleUI.activeTab);
  const dispatch = useAppDispatch();
  return (
    <header className={appHeader}>
      <h1 className={appTitle}>Notes</h1>
      <nav className={appTabs}>
        {TABS.map((tabObj) => (
          <button
            key={tabObj.id}
            className={clsx(tab, activeTab === tabObj.id && active)}
            onClick={() =>
              activeTab !== tabObj.id && dispatch(changeTab(tabObj.id))
            }
          >
            {tabObj.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
