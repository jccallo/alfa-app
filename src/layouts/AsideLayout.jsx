import { NavLink } from "react-router-dom"

export const AsideLayout = () => {
   return (
      <>
         <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark"> {/*begin::Sidebar Brand*/}
            <div className="sidebar-brand"> {/*begin::Brand Link*/} <a className="brand-link"> {/*begin::Brand Image*/} <img src="./assets/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image opacity-75 shadow" /> {/*end::Brand Image*/} {/*begin::Brand Text*/} <span className="brand-text fw-light">AlfaSA</span> {/*end::Brand Text*/} </a> {/*end::Brand Link*/} </div> {/*end::Sidebar Brand*/} {/*begin::Sidebar Wrapper*/}
            <div className="sidebar-wrapper">
               <nav className="mt-2"> {/*begin::Sidebar Menu*/}
                  <ul className="nav sidebar-menu flex-column">
                     <li className="nav-item">
                        <NavLink
                           className={({ isActive }) => `nav-link ${(isActive ? "active" : '')}`}
                           to="controls/index"
                        >
                           <i className="nav-icon bi bi-journal-richtext"></i>
                           <p>Controles Médicos</p>
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className={({ isActive }) => `nav-link ${(isActive ? "active" : '')}`}
                           to="workers/index"
                        >
                           <i className="nav-icon bi bi-people"></i>
                           <p>Trabajadores</p>
                        </NavLink>
                     </li>
                     <li className="nav-item mt-3">
                        <a href="./index" className="nav-link">
                           <i className="nav-icon bi bi-box-arrow-in-left" />
                           <p>Cerrar Sesion</p>
                        </a>
                     </li>
                  </ul> {/*end::Sidebar Menu*/}
               </nav>
            </div> {/*end::Sidebar Wrapper*/}
         </aside> {/*end::Sidebar*/} {/*begin::App Main*/}
      </>
   )
}