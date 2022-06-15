import React, { useState, useEffect } from "react";
import { Col, DataTableHead, DataTableRow, DataTableItem, Button } from "../../../../components/Component";


const DocumentRequired = ({ setModal, editData, selectClient, needDocument,requiredDocument}) => {

  useEffect(()=> console.log('hasta cuando',needDocument) ,[needDocument])

  return(
    <Col md="12">
      <div className="scrollbar-fluid overflow-auto mb-3 table-records">
        <div className="nk-tb-list is-separate is-medium">
        <DataTableHead className="nk-tb-item scrollbar-fluid overflow-auto">
            <DataTableRow   className="text-center border-bottom border bg-light">
              <span className="sub-text">Documentos Requeridos</span>
            </DataTableRow>
        
        
        </DataTableHead>
        {
              needDocument.documents
              ? needDocument.documents.map(act => 
                <DataTableItem className=" text-center border-bottom border bg-light">
                  <DataTableRow className="text-center d-flex justify-content-between">
                    <span className="sub-text">{act.name}</span>
                    <Button color="primary" size="md" >
              Guardar
            </Button>
                  </DataTableRow> 
                </DataTableItem>
                )
              :<></>
            }
        </div>
      </div>
    </Col>
  )
}

export default DocumentRequired;