import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PDFExport} from "@progress/kendo-react-pdf";
import { Button } from "react-bootstrap";
import '../css/ReportTemplate.css';

function ReportTemplate() {

  // Function for export PDF
  const pdfExportComponent = useRef(null);

  const handleExport = (event) => {
    pdfExportComponent.current.save()
  }

  // Getting current date
  const current = new Date();
  const date = `${current.getDate()} / ${current.getMonth() + 1} / ${current.getFullYear()}`;



  return (
    <div>


      {/*-------------- Content Displayed on UI START --------------*/}
      <div className='ui-components'>
        <h1>Warehouse PDF Processing</h1>
        <p>Sample text description about the pdf that is being generated</p>
        <Button onClick={handleExport}>Generate PDF</Button>
      </div>
      {/*-------------- Content Displayed on UI END --------------*/}



      {/*-----------------------------------------------*/}
      {/*-------------- PDF Content START --------------*/}
      {/*-----------------------------------------------*/}
      <div style={{ position: "absolute", left: "-1000px", top: 0 }}>

        <PDFExport ref={pdfExportComponent} fileName="Employee Report">


          <div className="container" style={{ width: "1000px" }}>
            <div className="row invoice-header px-3 py-2">
              <div className="col-4">
                <p>Nemo's Workhouse</p>
                <h1>REPORT</h1>
              </div>
              <div className="col-4 text-right">
                <p>(011)-255-3333</p>
                <p>contactnemo@gmail.com</p>
                <p>nemowarehouse.com</p>
              </div>
              <div className="col-4 text-right">
                <p>No. 479, T B Jayah Mawatha</p>
                <p>Colombo 10</p>
                <p>Sri Lanka</p>
              </div>
            </div>

            <div className="invoice-content row px-5 pt-5">
              <div className="col-3">
                <h5 className="gray mb-3">Directed to:</h5>
                <p className="gray-ish">Mr Adam Jones</p>
                <p className="gray-ish">Human Resource Manager</p>
                <p className="gray-ish">ID: M120989</p>
              </div>
              <div className="col-3">
                <h5 className="gray">Report number:</h5>
                <p className="gray-ish"># 123456</p>
              </div>
              <div className="col-6 text-right total-field">
                <h5 className="almost-gray due-date">Date Issued: {date}</h5>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-10 offset-1 invoice-table pt-1">


                {/* ---------------------- TABLE SECTION DYNAMIC START ---------------------- */}
                <table className="table table-hover">
                  <thead className="thead splitForPrint">
                    <tr>
                      <th scope="col gray-ish">NO.</th>
                      <th scope="col gray-ish">Item</th>
                      <th scope="col gray-ish">Qty.</th>
                      <th scope="col gray-ish">Price</th>
                      <th scope="col gray-ish">Discount</th>
                      <th className="text-right" scope="col gray-ish">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td className="item">Item 1</td>
                      <td>1</td>
                      <td className="text-right">Rs 25</td>
                      <td>5  %</td>
                      <td className="text-right">Rs 2875</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td className="item">Item 2</td>
                      <td>2</td>
                      <td className="text-right">Rs 45</td>
                      <td>6  %</td>
                      <td className="text-right">Rs 8525</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td className="item">Item 3</td>
                      <td>10</td>
                      <td className="text-right">Rs 75</td>
                      <td>8  %</td>
                      <td className="text-right">Rs 9960</td>
                    </tr>
                  </tbody>
                </table>
                {/* ---------------------- TABLE SECTION DYNAMIC END ---------------------- */}


              </div>
            </div>

            {/* CAN BE USED FOR INVOICE TOTAL DISPLAY */}
            {/* <div className="row invoice_details text-center">

              <div className="col-4 offset-1 pt-3">
                <h4 className="gray-ish">Report Summary &amp; Notes</h4>
                <p className="pt-3 almost-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras purus sapien, ullamcorper quis orci eu, consectetur congue nulla. In a fermentum est, ornare maximus neque. Phasellus metus risus, mattis ac sapien in, volutpat laoreet lectus. Maecenas tincidunt condimentum quam, ut porttitor dui ultricies nec.</p>
              </div>
              <div className="offset-1 col-5 mb-3 pr-4 sub-table">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row gray-ish">Subtotal</th>
                      <td className="text-right">75 <span className="currency ">€</span></td>
                    </tr>
                    <tr>
                      <th scope="row gray-ish">VAT</th>
                      <td className="text-right">11,25 <span className="currency">€</span></td>
                    </tr>
                    <tr>
                      <th scope="row gray-ish">Taxes*</th>
                      <td className="text-right">11,25 <span className="currency">€</span></td>
                    </tr>
                    <tr>
                      <th scope="row gray-ish">Discounts</th>
                      <td className="text-right">7,5 <span className="currency">€</span></td>
                    </tr>
                    <tr className="last-row">
                      <th scope="row"><h4>Total</h4></th>
                      <td className="text-right"><h4><span className="currency">€</span> 90,25</h4></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div> */}

            <div className='additional-information'>
              <h4 className="gray-ish text-center">Report Summary &amp; Notes</h4>
              <p className="pt-3 almost-gray text-center">Include a breif description of what this report generates. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras purus sapien, ullamcorper quis orci eu, consectetur congue nulla. In a fermentum est, ornare maximus neque. Phasellus metus risus, mattis ac sapien in, volutpat laoreet lectus.</p>
            </div>

            <div className='page-footer'>
              <p className="text-center pb-3 mb-3"><em> THIS DOCUMENT IS ONLY VALID AS AN OFFICIAL STATEMENT FOR NEMO'S WORKHOUSE </em></p>
            </div>
          </div>


        </PDFExport>

      </div>
      {/*---------------------------------------------*/}
      {/*-------------- PDF Content END --------------*/}
      {/*---------------------------------------------*/}


    </div>
  )
}

export default ReportTemplate
