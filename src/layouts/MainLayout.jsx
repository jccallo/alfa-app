import { Outlet } from "react-router-dom"
import { NavLayout } from "./NavLayout"
import { AsideLayout } from "./AsideLayout"
import { FooterLayout } from "./FooterLayout"

export const MainLayout = () => {
    return (
        <>
            <div className="layout-fixed sidebar-expand-lg bg-body-tertiary">
                <div className="app-wrapper">
                    <NavLayout />
                    <AsideLayout />
                    <Outlet />
                    <FooterLayout />
                </div>
            </div>
        </>
    )
}