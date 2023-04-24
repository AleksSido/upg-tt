import './layout.scss';

interface Props {
  pageTitle: string;
  menu: JSX.Element;
  topSlot: JSX.Element;
  children: JSX.Element;
  headerLoadingBar?: JSX.Element;
}

export default function Layout({ pageTitle, menu, topSlot, headerLoadingBar, children }:Props) {
  return (
    <div className={"body-container"}>
      <header className={"header"}>
        <div className="header-content">
          <div className="header-content__top">
            <h1 className="header-content__title">{pageTitle}</h1>
            <div className="header-content__top-slot">{topSlot}</div>
          </div>
          <div className="header-content__menu">
            {menu}
          </div>
        </div>
        {headerLoadingBar}
      </header>
      <main className={"main"}>
        <div className="main-content">
          {children}
        </div>
      </main>
      <footer className={"footer"}>
        <div className="footer-content">
          <p className="footer-copyright">Fitek 2020</p>
        </div>
      </footer>
    </div>
  );
}