export const NavLayout = () => {
   return (
      <>
         <nav className="app-header navbar navbar-expand bg-body"> {/*begin::Container*/}
            <div className="container-fluid"> {/*begin::Start Navbar Links*/}
               <ul className="navbar-nav">
                  <li className="nav-item"> <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button"> <i className="bi bi-list" /> </a> </li>
               </ul> {/*end::Start Navbar Links*/} {/*begin::End Navbar Links*/}
               <ul className="navbar-nav ms-auto"> {/*begin::Navbar Search*/}
                  <li className="nav-item user-menu">
                     <img src="/src/assets/img/avatar5.png" className="user-image rounded-circle shadow" alt="User Image" /> <span className="d-none d-md-inline">Juan Neyra</span>
                  </li> {/*end::User Menu Dropdown*/}
               </ul> {/*end::End Navbar Links*/}
            </div> {/*end::Container*/}
         </nav> {/*end::Header*/} {/*begin::Sidebar*/}
      </>
   )
}