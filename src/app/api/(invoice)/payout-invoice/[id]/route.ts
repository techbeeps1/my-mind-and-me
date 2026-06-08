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
  const data = await res.json();

 if(!data.success){
    return new Response("Failed to fetch invoice data", { status: 500 });
  }


  const html = `
  <html>
<head>
<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

body{
  color:#333;
  padding:20px;
}

.header{
  display:flex;
  justify-content:space-between;
  border-bottom:4px solid #25716e;
  padding-bottom:15px;
  margin-bottom:20px;
}

.company h1{
  color:#25716e;
}

.invoice-title{
  text-align:right;
}

.invoice-title h2{
  color:#25716e;
  font-size:34px;
}

.card{
  border:1px solid #ddd;
  background:#f8fafc;
  padding:15px;
  border-radius:8px;
}

.info-grid{
  display:flex;
  gap:20px;
  margin-bottom:20px;
}

.info-grid .card{
  flex:1;
}

.card h3{
  color:#25716e;
  margin-bottom:10px;
}

.section-title{
  color:#25716e;
  margin:20px 0 10px;
}

table{
  width:100%;
  border-collapse:collapse;
}
table .first-tr {
    background:linear-gradient(
      90deg,
      #4ac6cd 0%,
      #25716e 100%
  );
  }
.payout-table th{

  color:white;
  padding:12px;
  text-align:left;
}

.payout-table td{
  border:1px solid #ddd;
  padding:10px;
}

.summary{
  width:350px;
  margin-left:auto;
  margin-top:20px;
  border:1px solid #ddd;
  border-radius:8px;
  overflow:hidden;
}

.summary-header{
  background:linear-gradient(
      90deg,
      #4ac6cd 0%,
      #25716e 100%
  );
  color:white;
  padding:12px;
  font-weight:bold;
}

.summary-body{
  padding:15px;
}

.summary-row{
  display:flex;
  justify-content:space-between;
  margin-bottom:10px;
}

.total{
  border-top:1px solid #ddd;
  padding-top:10px;
  font-size:18px;
  font-weight:bold;
}

.footer{
  margin-top:30px;
  border-top:1px solid #ddd;
  padding-top:15px;
  font-size:12px;
  color:#666;
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
    <h2>PAYOUT INVOICE</h2>

    <p><b>Payout ID:</b> ${data.payoutId}</p>
    <p><b>Date:</b> ${data.payoutDate}</p>
  </div>

</div>

<div class="info-grid">

  <div class="card">
    <h3>Practitioner Information</h3>

    <p><b>Name:</b> ${data.practitionerName}</p>
    <p><b>Practitioner ID:</b> ${data.practitionerId}</p>
    <p><b>HPCSA:</b> ${data.hpcsaNumber}</p>
  </div>

  <div class="card">
    <h3>Payout Period</h3>

    <p><b>From:</b> ${data.fromDate}</p>
    <p><b>To:</b> ${data.toDate}</p>
    <p><b>Total Sessions:</b> ${data.totalSessions}</p>
  </div>

</div>

<h3 class="section-title">
Appointments Included in Payout
</h3>

<table class="payout-table">

<thead>
<tr class="first-tr">
  <th>Booking ID</th>
  <th>Patient</th>
  <th>Session Date</th>
  <th>Service</th>
  <th>Amount</th>
</tr>
</thead>

<tbody>

${data?.sessions?.map((item: {
  bookingId: string;
  patientName: string;
  date: string;
  service: string;
  amount: number;
}) => `
<tr>
  <td>#${item.bookingId}</td>
  <td>${item.patientName}</td>
  <td>${item.date}</td>
  <td>${item.service}</td>
  <td>R ${item.amount}</td>
</tr>
`).join('')}

</tbody>

</table>

<div class="summary">

  <div class="summary-header">
    Payout Summary
  </div>

  <div class="summary-body">

    <div class="summary-row">
      <span>Gross Earnings</span>
      <span>R ${data.grossAmount}</span>
    </div>

    <div class="summary-row">
      <span>Platform Fee</span>
      <span>- R ${data.platformFee}</span>
    </div>

    <div class="summary-row">
      <span>Adjustments</span>
      <span>R ${data.adjustments}</span>
    </div>

    <div class="summary-row total">
      <span>Net Payout</span>
      <span>R ${data.netPayout}</span>
    </div>

  </div>

</div>

<div class="card" style="margin-top:20px;">
  <h3>Bank Transfer Details</h3>

  <p><b>Transaction ID:</b> ${data.transactionId}</p>
  <p><b>Payout Reference:</b> ${data.reference}</p>
  <p><b>Paid On:</b> ${data.paidOn}</p>
</div>

<div class="footer">
  This payout invoice confirms that funds have been
  transferred to the practitioner for services rendered
  during the payout period.
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
      "Content-Disposition": `attachment; filename="invoice ${data.invoiceId??''}.pdf"`,
    },
  });
}
