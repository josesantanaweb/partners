import classNames from "classnames";
import { set } from "lodash";
import React from "react";
import { Card } from "reactstrap";
import DealsServices from "../../services/DealsServices";

export const DataTable = ({ className, bodyClassName, title, ...props }) => {
  return (
    <Card className={`${className ? className : ""}`}>
      <div className="card-inner-group">{props.children}</div>
    </Card>
  );
};

export const DataTableTitle = ({ ...props }) => {
  return (
    <div className="card-inner position-relative card-tools-toggle">
      <div className="card-title-group">{props.children}</div>
    </div>
  );
};

export const DataTableBody = ({ compact, seperate, className, bodyclass, ...props }) => {
  const innerclass = classNames({
    "nk-tb-list nk-tb-ulist": true,
    [`${bodyclass}`]: bodyclass,
    "is-compact": compact,
    "is-separate": seperate,
  });
  return (
    <div className={`card-inner p-0 ${className ? className : ""}`}>
      <div className={innerclass}>{props.children}</div>
    </div>
  );
};

export const DataTableHead = ({ ...props }) => {
  return <div className="nk-tb-item nk-tb-head">{props.children}</div>;
};

export const DataTableRow = ({ className, size, ...props }) => {
  const rowClass = classNames({
    "nk-tb-col": true,
    [`${className}`]: className,
    [`tb-col-${size}`]: size,
  
  });
  return <div className={rowClass}>{props.children}</div>;
};

export const DataTableItem = ({ generalStateForm,setGeneralStateForm,registerState,setValue, handleSubmitGeneral ,className, handleClickedRegisterNames, handleClickedRegisterRut, customer,useTypeClient,setSelectClient,setLibraryClient,...props }) => {
  

  
  return (
  <div 
    className={`nk-tb-item ${className ? className : ""}`}
    onClick={ async() => {
      console.log(customer)
      console.log('State final', generalStateForm)

      setGeneralStateForm( prev => {
        return {
          ...prev,
            customerId: parseInt(customer.id)  ,
            companyId:  customer.companyId,
            currencyId: customer.currencyId,
            paymentMethodId: customer.paymentMethodId,
            planId: customer.planId,
            yearsOfThePlan: parseInt(customer.yearsOfThePlan) ,
            amountOfTheInvestment: parseInt( customer.amountOfTheInvestment),
            totalNetValueUSD: parseInt(customer.totalNetValueUSD) ,
            originsOfTheFunds: customer.originsOfTheFunds,
            advisorFee: customer.advisorFee,
            percentage: parseInt(customer.percentage),
        
              currentAccountData: 
                customer.currentAccountData,
          
              employmentHistory:
                customer.employmentHistory
              ,
              personalReferences:
                customer.personalReferences
              ,
              investmentExperience: 
                customer.investmentExperience
              ,
              spousalHistory:
                customer.spousalHistory
              ,
              beneficiaries:[...customer.beneficiaries],
      
            
            investorProfile: [
              {
                number: 1,
                answer: 4
              },
              {
                number: 2,
                answer: 3
              },
              {
                number: 3,
                answer: 4
              },
              {
                number: 4,
                answer: 1
              },
              {
                number: 5,
                answer: 2
              },
              {
                number: 6,
                answer: 2
              },
              {
                number: 7,
                answer: 3
              },
              {
                number: 7,
                answer: 4
              }
            ],
            documents: [
       
            ]
          
        }
      })
      console.log(generalStateForm)
      customer.names? handleClickedRegisterNames(customer.names):handleClickedRegisterNames(customer.companyName)
      handleClickedRegisterRut(customer.rut);
      useTypeClient(customer.type.id);
      setSelectClient(customer)
      const response = await DealsServices.getCustomerLibraryId(customer.id)
      setLibraryClient(response.data)
  
      }
    } 
  >
    {props.children}
  </div>)
};
