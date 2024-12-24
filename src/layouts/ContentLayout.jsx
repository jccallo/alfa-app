export const ContentLayout = ({ title, children }) => {
   return (
      <>
         <main className="app-main"> {/*begin::App Content Header*/}
            <div className="app-content-header"> {/*begin::Container*/}
               <div className="container-fluid"> {/*begin::Row*/}
                  <div className="row">
                     <div className="col-sm-6">
                        <h3 className="mb-0">{title}</h3>
                     </div>
                  </div> {/*end::Row*/}
               </div> {/*end::Container*/}
            </div> {/*end::App Content Header*/} {/*begin::App Content*/}
            <div className="app-content"> {/*begin::Container*/}
               <div className="container-fluid"> {/*begin::Row*/}
                  <div className="row">
                     <div className="col-12"> {/* Default box */}
                        {children}
                     </div>
                  </div> {/*end::Row*/}
               </div> {/*end::Container*/}
            </div> {/*end::App Content*/}
         </main> {/*end::App Main*/} {/*begin::Footer*/}
      </>
   )
}