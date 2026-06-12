import { BOOKING_END } from "@/services/api";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest,  { params }: { params: Promise<{ id: string }> },
) {
  
  
const token = request.cookies.get("MMMAT")?.value;
 const paramsData = await params;

  if (!paramsData.id) {
    return new Response("Missing appointment ID", { status: 400 });
  }

  const res = await fetch(`${BOOKING_END}/invoice/${paramsData.id}` ,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();

 if(!resData.success){
    return new Response("Failed to fetch invoice data", { status: 500 });
  }


  const html = `
<html>
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
      line-height: 1.4;
    }
    body {
      color: #333;
      background: #fff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 4px solid #25716e;
      padding-bottom: 15px;
      margin-bottom: 20px;
    } 
    .company h1 {
      color: #25716e;
      margin-bottom: 10px;
    }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 {
      color: #25716e;
      font-size: 36px;
      margin-bottom: 10px;
    }
    .info-grid {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .card {
      flex: 1;
      border: 1px solid #ddd;
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
    }
    .card h3 {
      color: #25716e;
      margin-bottom: 10px;
    }
    .section-title {
      color: #25716e;
      margin-bottom: 10px;
      margin-top: 15px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    .details-table td {
      border: 1px solid #ddd;
      padding: 10px;
    }
   .toptr{
      background-image: linear-gradient(90deg, #4ac6cd 0%, #25716e 100%);
    }
    .services th {
      color: white;
      padding: 12px;
      text-align: left;
    }
    .services td {
      border: 1px solid #ddd;
      padding: 12px;
    }
    .summary {
      width: 320px;
      margin-left: auto;
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .summary-header {
   background-image: linear-gradient(90deg, #4ac6cd 0%, #25716e 100%);
      color: white;
      padding: 12px;
      font-weight: bold;
    }
    .summary-body {
      padding: 15px 15px 5px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .total {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .claim-box {
      margin-top: 20px;
      border: 1px solid #ddd;
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
    }
  .claim-box h3{
      color:#25716e;
  }
    .footer {
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 15px;
      font-size: 12px;
      color: #666;
    }
    .label {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company">
      <h1>My Mind and Me</h1>
      <p>Cape Town, South Africa</p>
      <p>info@mymindandme.co.za</p>
    </div>

    <div class="invoice-title">
      <h2>INVOICE</h2>
      <p><span class="label">Invoice #:</span> ${resData.invoiceId??''}</p>
      <p><span class="label">Date:</span> ${resData.invoiceDate??''}</p>
    </div>
  </div>

  <div class="info-grid">
    <div class="card">
      <h3>Patient Information</h3>
      <p><span class="label">Name:</span> ${resData.patient_name??''}</p>
      <p><span class="label">ID:</span> ${resData.patient_id??''}</p>


    </div>

    <div class="card">
      <h3>Practitioner Information</h3>
      <p><span class="label">Name:</span> ${resData.practitionerName??''}</p>
      <p><span class="label">ID:</span> ${resData.practitionerId??''}</p>
      <p><span class="label">HPCSA:</span> ${resData.hpcsaNumber??''}</p>
      
    </div>
  </div>

  <h3 class="section-title">Appointment Details</h3>

  <table class="details-table">
    <tr>
      <td><b>Booking ID</b></td>
      <td>#${resData.bookingId??''}</td>
      <td><b>Appointment Date</b></td>
      <td>${resData.date??''}</td>
    </tr>
    <tr>
      <td><b>Time</b></td>
      <td>${resData.slot??''}</td>
      <td><b>Type</b></td>
      <td>${resData.type.replaceAll("-", " ")??''}</td>
    </tr>
  </table>

  <h3 class="section-title">Services Rendered</h3>

  <table class="services">
    <thead>
      <tr class="toptr">

        <th>Description</th>
        <th>Qty</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>${resData.description??''}</td>
        <td>1</td>
        <td>R ${resData.amount??''}</td>
      </tr>
    </tbody>
  </table>

  <div class="summary">
    <div class="summary-header">
      Payment Summary
    </div>

    <div class="summary-body">
      <div class="summary-row">
        <span>Consultation Fee</span>
        <span>R ${resData.amount??''}</span>
      </div>



      <div class="summary-row total">
        <span>Total Paid</span>
        <span>R ${resData.amount??''}</span>
      </div>
    </div>
  </div>

  <div class="claim-box">
    <h3>Medical Aid Claim Information</h3>

    <p><b>Licence Number:</b> ${resData.licenseNumber??''}</p>
    <!-- <p><b>ICD-10 Code:</b> F41.1</p> -->
    <p><b>Service Date:</b> ${resData.date??''}</p>
    <p><b>Transaction ID:</b> ${resData.transactionId??''}</p>
  </div>

  <div class="footer">
    This invoice serves as proof of payment for medical
    services rendered and may be submitted to a medical aid
    scheme for reimbursement.
  </div>
</body>
</html>
  `;



const executablePath = await chromium.executablePath();
const isVercel = !!process.env.VERCEL;

const browser = await puppeteer.launch({
  executablePath: isVercel
    ? executablePath
    : `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
  args: isVercel ? chromium.args : [],
  headless: true,
});
  const page = await browser.newPage();
  await page.setContent(html);
  await page.waitForNetworkIdle();
  const pdf = await page.pdf({
  format: "A4",
  printBackground: true,
  margin: {
    top: "20px",
    right: "40px",
    bottom: "20px",
    left: "40px",
  },
});

  const pdfBuffer = Buffer.from(pdf);
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice ${resData.invoiceId??''}.pdf"`,
    },
  });
}
