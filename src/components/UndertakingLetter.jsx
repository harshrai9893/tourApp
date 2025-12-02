import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
// import apiInterceptor from "../../lib/interceptor";
// import apiInterceptor from "./interceptor"
import { EyeIcon } from "lucide-react";
import { IoTrash } from "react-icons/io5";

const UndertakingLetter = () => {
  // const { kycData } = useSelector(state => state.dashboardSlice || {});
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkBoxChange, setCheckBoxChange] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const printRef = useRef(null);
  const fileInputRef = useRef(null);

 const agentName = "Harsh Rai";
 const agentNameAddress = "123 MG Road, Jabalpur, Madhya Pradesh";
 const agentEmail = "harshrai@example.com";
 const agentMobile = "+91 98765 43210";



//   const agentName = kycData?.data?.personalDetail?.agentName || "N/A";
//   const agentNameAddress = kycData?.data?.personalDetail?.agentNameAddress || "N/A";
//   const agentEmail = kycData?.data?.panCardData?.email || "N/A";
//   const agentMobile = kycData?.data?.panCardData?.mobile_no || "N/A";


  const handleCheckboxChange = (value) => {
    setSelectedPayments((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
    setCheckBoxChange((prev) => !prev);
  };
  const handleDownload = async () => {
    try {
      setLoading(true);
      Swal.fire({
        title: "Downloading PDF...",
        text: "Please wait while we prepare your letter.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
  
      const element = printRef.current;
      if (!element) throw new Error("Certificate element not found");
  
      const clonedElement = element.cloneNode(true);
      clonedElement.style.backgroundColor = "#fff";
      clonedElement.style.position = "absolute";
      clonedElement.style.top = "-9999px";
      clonedElement.style.left = "-9999px";
      document.body.appendChild(clonedElement);
  
      // Wait for fonts/images
      await new Promise((resolve) => setTimeout(resolve, 300));
  
      const canvas = await html2canvas(clonedElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
  
      document.body.removeChild(clonedElement);
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      // Page size
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      while (heightLeft > 0) {
        const pageHeight = Math.min(heightLeft, pdfHeight);
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          pdfWidth,
          imgHeight
        );
        heightLeft -= pdfHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          position = -pdfHeight + heightLeft; // proper offset
        }
      }
  
      pdf.save("Undertaking_Letter.pdf");
      Swal.close();
    } catch (error) {
      console.error("Download error:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Something went wrong while creating the PDF. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  


  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const item = "PG Related Sources (Ik CreditPay, Load Wallet, Education Fee)";
{
  // const handleUpload = async () => {
  //   if (!attachment) {
  //     Swal.fire("No PDF Found", "Please generate or download the PDF first.", "warning");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     Swal.fire({
  //       title: "Uploading PDF...",
  //       text: "Please wait while we upload your letter.",
  //       allowOutsideClick: false,
  //       didOpen: () => Swal.showLoading(),
  //     });

  //   //   // Step 1: Initialize session
  //     const initResponse = await apiInterceptor
  //       .withType("SESSION_INIT")
  //       .get("session/init", { withCredentials: false });

  //     const token = initResponse?.data?.apiResponseData?.responseData?.token;
  //     if (!token) throw new Error("Session initialization failed.");

  //     localStorage.setItem("access_token", token);

  //     // Step 2: Request upload URL
  //     const metadata = {
  //       fileType: "application/pdf",
  //       serviceType: "USER_UNDERTAKING_LETTER",
  //       documentType: "userUndertakingLetter",
  //     };

  //     const apiResponse = await apiInterceptor
  //       .withType("file")
  //       .post("upload/file", metadata, { withCredentials: false });

  //     const { responseData } = apiResponse.data.apiResponseData || {};
  //     if (!responseData || !responseData.url || !responseData.fields) {
  //       throw new Error("Invalid upload response: Missing URL or fields.");
  //     }

      // const { url, fields, cdnUrl } = responseData;

      // Step 3: Upload file to S3 (no-cors)
    //   const formData = new FormData();
    //   Object.keys(fields).forEach((key) => formData.append(key, fields[key]));
    //   formData.append("file", attachment);

    //   await fetch(url, { method: "POST", body: formData, mode: "no-cors" });

    //   Swal.close();
    //   Swal.fire("Success", "PDF uploaded successfully!", "success");
    // } catch (error) {
    //   console.error("Upload failed:", error);
    //   Swal.fire("Error", "PDF upload failed.", "error");
    // } finally {
    //   setLoading(false);
    // }
  // };

  const handlePreview = (file, label) => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    const isPDF = file.type === "application/pdf";
    if (isPDF) {
      Swal.fire({
        title: `${label} Preview`,
        html: <iframe src="${fileURL}" width="100%" height="500px"></iframe>,
        width: "80%",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: `${label} Preview`,
        imageUrl: fileURL,
        imageWidth: 400,
        imageAlt: `${label} Preview`,
        confirmButtonText: "Close"
      });
    }
  };

  // const rawDate = 13/11/25;

  // const issueDate = rawDate
  //   ? (() => {
  //     const parts = rawDate.split(" "); // ["Thu", "Jul", "17", "18:50:16", "IST", "2025"]
  //     const formatted = `${parts[1]} ${parts[2]} ${parts[5]}`; // "Jul 17 2025"
  //     const parsedDate = new Date(formatted);
  //     return !isNaN(parsedDate)
  //       ? parsedDate
  //         .toLocaleDateString("en-GB", {
  //           day: "2-digit",
  //           month: "2-digit",
  //           year: "numeric",
  //         })
  //         .replace(/\//g, "-")
  //       : "N/A";
  //   })()
  //   : "N/A";

  const parsedDate = "11/11/25";

  return (
    <>
      <div className="bg-white rounded-xl border-2   p-8 text-center text-black px-6 py-10 font-sans max-w-5xl mx-auto" ref={printRef}>
        <div >
          <h1 className="text-center text-2xl font-bold underline mb-10">
            Letter of Undertaking
          </h1>

          <div className="text-sm mb-6">
            <div className="text-left">
              <p className="bold">From,</p>
              <span className="font-semibold text-lg text-left" >
                Partner Name: Ikeda
              </span></div>
            <div className="text-right bold">
              <span >Date: "11/11/25"</span>
            </div>
            <div className="text-left">
              <span className="text-left bold">To,</span><br />
              <span className="font-semibold text-lg text-left">Ikeda Limited</span>
              <p className="text-left text-base">
                SHOP NO. OS 1, FORMAL BLOCK N & O, BADDA BAZAR, <br />
                SRI GANGANAGAR (RAJ.)-335001
              </p>
            </div>
            <br />
            <p className="font-semibold mb-2 text-left text-base">
              Sub: Letter of Undertaking (CREDIT PAY - Payment Gateway)
            </p>
            <br />
            <p className="text-left text-base">Dear Sir,</p>
          </div>

          <div className="w-full mt-6 ">
            <p className="text-left mb-3 text-lg w-full leading-[3]" style={{ wordSpacing: "0.1rem" }}>
              I/We,  <span class="underline underline-offset-4 decoration-black">{agentName} </span>
              &nbsp;&nbsp;having place of business at  <span class="underline underline-offset-4 decoration-black"> <strong>(Address) </strong>:{agentNameAddress} </span>
              &nbsp;&nbsp;Email ID:
              &nbsp;<span class="underline underline-offset-4 decoration-black">{agentEmail} </span>&nbsp;
              Mobile No:
              &nbsp; <span class="underline underline-offset-4 decoration-black">{agentMobile} </span>
            </p>
          </div>

          <p className="text-justify leading-7 text-base mt-6">
            I hereby declare that I am aware about the conditions to use credit pay
            services under IKEDA LIMITED and state that transaction done by{" "}
            <b>Payment Gateway</b> (CC, DC, NB, UPI, wallet, Etc.) on portal will
            be my sole responsibility and I assure that all the transactions done
            will be valid and genuine to my knowledge. Any fraud or false
            transaction done on my IKEDA wallet only I shall be held responsible.
            <br />
            <br />
            I / We will not hold IKEDA, its Directors / Officers / Agents /
            Employees responsible against any losses, liabilities claims charges,
            actions, demands fees costs and expenses arising out of or in
            connection with the aforesaid business.
            <br />
            <br />
            IKEDA Sale & Distribution team not be held liable to any person or
            entity for the loss, liability, claims, action, damages, or expenses
            arising out of or in connection with anything done or omitted to be
            done by it pursuant to and in accordance with the provisions of this
            undertaking between me/us with IKEDA.
          </p>


          <div className="mt-6 text-base ">
            <h6 className="font-semibold mb-3 text-left">
              Kindly select the service which you want to activate:
            </h6>

            <div className="flex flex-wrap gap-6 ">
              <div className="w-full">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    className="w-4 h-4 mt-1` flex-shrink-0`" // Added mt-1 and flex-shrink-0
                  />
                  <span className="text-base align-text-top">{item}</span>
                </label>
              </div>

            </div>




          </div>

          <p className="mt-6 text-left">Thanking you,</p>

          <div className="mt-6 text-left text-base ">
            <p>
              For/on behalf of:   <span class="inline-block border-b border-black w-[30vw] pb-2">Ikeda </span>
            </p>
            <p className="text-black-600 text-lg">Proprietor / Company Name</p>
          </div>

          <div className="mt-14 text-lg text-left">
            <p className="text-lg">(Authorized Signatory)</p>
            <p className="text-lg">Name and Designation of Authorized Signatory:</p>
            <p className="text-lg">Place:</p>
            <p className="text-lg">Date:</p>
            <br />
            <div className="flex flex-wrap mb-6 pb-8">
              <span className="text-base">
                RSM/TSM Name:
                &nbsp; <u>Tech Team</u>&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">
                &nbsp; Contact Number:
                &nbsp; <u>{agentMobile}</u>&nbsp;&nbsp;&nbsp;
              </span>
              <span className="text-base">
                &nbsp; Signature:    &nbsp; <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border mt-8 mb-8 border-gray-200 p-8 text-center px-6 py-10 max-w-5xl mx-auto items-start pt-8 gap-8 w-full flex-row md:flex">
        {/* Download PDF Button */}
        <button
          onClick={() => {
            if (checkBoxChange) { handleDownload() }
            else { alert("Please select at least one service to generate the PDF.") }
          }
          }
          disabled={loading}
          className="bg-blue-600 text-white px-2 sm:px-2 md:px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60 text-[15px] sm:text-base w-[20%] sm:w-[25%] transition-all duration-200 mt-8  "
        >
          {loading ? "Generating..." : "📄 Download PDF"}
        </button>


        {/* Upload Section */}

        <div className="border-l-2 border-dotted border-black pl-4 flex gap-8 items-start w-full  ">
          <div className="w-[70%]">
            <label className="block text-left text-gray-700 font-medium mb-2">
              Upload File
            </label>

            {/* File Input + Icons */}

            <div className="gap-3 align-left flex w-full">
              <div className="flex-col w-full">
                <div className="flex w-full">
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="border p-2  rounded text-sm text-gray-600  
                    file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 
                    file:text-sm file:font-semibold file:bg-blue-50 
                    file:text-blue-700 hover:file:bg-blue-100 w-full"
                  />

                  {/* Icons */}
                  {attachment && (
                    <div className=" flex items-center gap-2">
                      <EyeIcon
                        className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700 transition"
                        onClick={() => handlePreview(attachment, "Attached File")}
                      />
                      <IoTrash
                        className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                        onClick={() => {
                          setAttachment(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-left text-gray-600 mt-2">
                    <strong>Note:</strong> Please upload a <strong>signed</strong> PDF file.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="ml-4">
            <div className="flex mt-8 ">
              <button
                // onClick={handleUpload}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 
                    disabled:opacity-60 transition-all duration-200"
              >
                {loading ? "Uploading..." : "Upload PDF"}
              </button>
            </div>
            {/* Note */}

            {/* </div> */}
          </div>
        </div>
      </div>
    </>
   );
  };};

export default UndertakingLetter;