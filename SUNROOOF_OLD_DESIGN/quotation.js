document.getElementById("date").valueAsDate = new Date();

// const prices = {
//   Modern: {
//     "Mystic Wood": 35650,
//     "Pearl White": 37950,
//     "Regal Bronze": 39650,
//     "Titanium Grey": 39650,
//   },
//   Fluted: {
//     "Mystic Wood": 35650,
//     "Pearl White": 37950,
//     "Regal Bronze": 39650,
//     "Titanium Grey": 39650,
//   },
//   Classical: {
//     "Mystic Wood": 37950,
//     "Pearl White": 40250,
//     "Regal Bronze": 41950,
//     "Titanium Grey": 41950,
//   },
//   "French Window": {
//     White: 55200,
//   },
//   "Louvered Window": {
//     White: 51750,
//   },
//   Minimalist: {
//     "Mystic Wood": 35650,
//     "Pearl White": 37950,
//     "Regal Bronze": 39650,
//     "Titanium Gray": 39650,
//   },
//   "Arch Window": {
//     White: null,
//   },
//   "Moorgan Premium Remote": {
//     Chrome: 38500,
//     Black: 38500,
//     Gold: 42000,
//   },
//   // Add Design Here
// };

const prices = {
  Classical: {
    "White": 40250,
    "Wood": 37950
  },
  Modern: {
    "Wood": 35650,
    "White": 37950,
    "Bronze": 39650,
    "Grey": 39650
  },
  "Fluted Minimalist": {
    "Wooden": 35650,
    "White": 37950,
    "Grey": 39650,
    "Bronze": 39650
  },
  "French Window": {
    "White": 55200
  },
  "Louvered Window": {
    "White": 51750,
    "Wooden": 51750
  },
  "Classical Atrium": {
    "White": 40250,
    "Wooden": 37950
  },
  "Fluted Minimalist Atrium": {
    "Wooden": 37950,
    "Bronze": 41950,
    "Grey": 41950
  },
  "Arch Window": {
    "White": 55200
  },
  "Moorgan Premium Remote": {
    "Gold": 42000,
    "Black": 38500,
    "Chrome": 38500
  }
}

function addEntry(
  design = "Select Design",
  finish = "Select Finish",
  area = "",
  qty = 1
) {
  const entryDiv = document.createElement("div");
  entryDiv.className = "entry";

  const designSelect = document.createElement("select");
  designSelect.className = "design";
  designSelect.onchange = populateFinish;

  const option = document.createElement("option");
  option.value = "Select Design";
  option.text = "Select Design";
  designSelect.appendChild(option);

  for (const designOption in prices) {
    const option = document.createElement("option");
    option.value = designOption;
    option.text = designOption;
    designSelect.appendChild(option);
  }

  const finishSelect = document.createElement("select");
  finishSelect.className = "finish";

  const areaSelect = document.createElement("input");
  areaSelect.className = "area"
  areaSelect.placeholder = "Enter Area"
  // option.value = "Select Area";
  // option.text = "Select Area";
  // areaSelect.appendChild(option);

  // const areas = ["Basement", "Kitchen", "Office Space", "Living Room", "Dining Room", "Bedroom", "Home Office", "Lobby Area", "Balcony", "Staircase", "Guest cum Study Room", "Wardrobe", "Dresser", "Conference Room"]
  // areas.forEach((area) => {
  //   const option = document.createElement("option");
  //   option.value = area;
  //   option.text = area;
  //   areaSelect.append(option);
  // });

  const floorSelect = document.createElement("select");
  floorSelect.className = "floor"
  option.value = "Select Floor";
  option.text = "Select Floor";
  floorSelect.appendChild(option);

  const floors = ["BSMT", "GF", "FF", "SF", "TF"]
  floors.forEach((floor) => {
    const option = document.createElement("option");
    option.value = floor;
    option.text = floor;
    floorSelect.append(option);
  })

  const qtyInput = document.createElement("input");
  qtyInput.className = "qty";
  qtyInput.type = "number";
  qtyInput.placeholder = "Quantity";
  qtyInput.value = qty;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.onclick = () => entryDiv.remove();

  entryDiv.appendChild(designSelect);
  entryDiv.appendChild(finishSelect);
  entryDiv.appendChild(areaSelect);
  entryDiv.appendChild(floorSelect);
  entryDiv.appendChild(qtyInput);
  entryDiv.appendChild(removeButton);

  document.getElementById("entries").appendChild(entryDiv);

  designSelect.value = design;

  const option2 = document.createElement("option");
  option2.value = "Select Finish";
  option2.text = "Select Finish";
  finishSelect.appendChild(option2);

  populateFinish.call(designSelect);
  finishSelect.value = finish;
}

function populateFinish() {
  const finishSelect = this.nextElementSibling;
  finishSelect.innerHTML = "";
  const option = document.createElement("option");
  option.value = "Select Finish";
  option.text = "Select Finish";
  finishSelect.appendChild(option);
  const finishes = prices[this.value];
  for (const finish in finishes) {
    const option = document.createElement("option");
    option.value = finish;
    option.text = finish;
    finishSelect.appendChild(option);
  }
}

function generateInvoice() {
  document.getElementById("download-btn").style.display = "block";
  document.getElementById("hw").style.display = "block";
  const clientName = document.getElementById("clientName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const siteAddress = document.getElementById("siteAddress").value;
  const zone = document.getElementById("zone").value;
  const date = document.getElementById("date").value;
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  const entries = document.getElementsByClassName("entry");
  let grossAmount = 0;
  let invoiceTable = `
          <table>
              <tr>
                  <th>SNo</th>
                  <th>Design and Finish</th>
                  <th>Area</th>
                  <th>Floor</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
              </tr>`;

  var totalQty = 0
  for (let i = 0; i < entries.length; i++) {
    const design = entries[i].getElementsByClassName("design")[0].value;
    const finish = entries[i].getElementsByClassName("finish")[0].value;
    const area = entries[i].getElementsByClassName("area")[0].value;
    const floor = entries[i].getElementsByClassName("floor")[0].value;

    const qty = parseInt(entries[i].getElementsByClassName("qty")[0].value);
    totalQty += qty;
    if (design == "Select Design" || finish == "Select Finish") {
      alert("Select Design and Finish for all Entries.");
      return;
    }
    if (isNaN(qty)) {
      alert("Input Quantity for all Entries.");
      return;
    }
    const unitPrice = prices[design][finish];
    const totalPrice = unitPrice * qty;

    grossAmount += totalPrice;

    invoiceTable += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${design} ${finish}</td>
                  <td>${area}</td>
                  <td>${floor}</td>
                  <td>${qty}</td>
                  <td>₹${unitPrice.toLocaleString("en-IN")}</td>
                  <td>₹${totalPrice.toLocaleString("en-IN")}</td>
              </tr>`;
  }

  const discountAmount = Math.round((discount / 100) * grossAmount);
  const amountAfterDiscount = grossAmount - discountAmount;
  let freightCharges = 0;


  if (zone == "Delhi NCR" || zone == "North India") {
    if (totalQty < 41) freightCharges = 50000;
    else if (totalQty < 61) freightCharges = 65000;
    else if (totalQty < 81) freightCharges = 80000;
    else {
      freightCharges = -1;
    }
  } else {
    if (totalQty < 15) freightCharges = 50000;
    else if (totalQty < 25) freightCharges = 60000;
    else if (totalQty < 41) freightCharges = 80000;
    else if (totalQty < 61) freightCharges = 100000;
    else if (totalQty < 81) freightCharges = 120000;
    else freightCharges = -1;
  }

  if (freightCharges == -1) {
    alert("Talk to Mrinal")
    return;
  }

  const total = amountAfterDiscount + freightCharges;
  const taxAmount = Math.round(0.18 * total);
  const grandTotal = total + taxAmount;

  invoiceTable +=
    `
          <tr>
              <td colspan="6" style="text-align: right;">Gross Amount</td>
              <td>₹${grossAmount.toLocaleString("en-IN")}</td>
          </tr>
          <tr>
          ` +
    (discount != 0
      ? `<td colspan="6" style="text-align: right;">Discount %</td>
              <td>${discount}%</td>
          </tr>
          <tr>
              <td colspan="6" style="text-align: right;">Discount Amount</td>
              <td>₹${discountAmount.toLocaleString("en-IN")}</td>
          </tr>
          `
      : "") +
    (freightCharges != 0
      ? `<tr>
              <td colspan="6" style="text-align: right;">Freight Charges</td>
              <td>₹${freightCharges.toLocaleString("en-IN")}</td>
          </tr>
          `
      : "") +
    `<tr>
              <td colspan="6" style="text-align: right;">Total</td>
              <td>₹${total.toLocaleString("en-IN")}</td>
          </tr>
          <tr>
              <td colspan="6" style="text-align: right;">Tax @ 18%</td>
              <td>₹${taxAmount.toLocaleString("en-IN")}</td>
          </tr>
          <tr>
              <td colspan="6" style="text-align: right;"><strong>Grand Total</strong></td>
              <td><strong>₹${grandTotal.toLocaleString("en-IN")}</strong></td>
          </tr>
          </table>`;

  document.getElementById("invoice").innerHTML = `
          <h1>Quotation</h1>
          <p><strong>Client Name:</strong> ${clientName}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Site Address:</strong> ${siteAddress}</p>
          <p><strong>Zone:</strong> ${zone}</p>
          <p><strong>Date:</strong> ${date}</p>
          ${invoiceTable}`;
}

function populateInitialEntries() {
  const storedUnits = JSON.parse(localStorage.getItem("units")) || {};
  for (const design in storedUnits) {
    const qty = parseInt(storedUnits[design]);
    if (qty > 0) {
      addEntry(design, "Select Finish", "", qty);
    }
  }
}

populateInitialEntries();

function downloadInvoice() {
  document.title =
    "Quotation for " + document.getElementById("clientName").value;
  document.getElementsByClassName("navbar")[0].style.display = "none";
  document.getElementById("invoiceForm").style.display = "none";
  document.getElementById("hw").style.display = "block";
  document.getElementById("hw").style.width = "100vw";
  document.querySelector('table').style.width = "100vw";
  document.getElementById("download-btn").style.display = "none";

  // document.getElementById();
  // document.getElementById();

  window.print();
  document.getElementById("invoiceForm").style.display = "flex";
  document.getElementById("hw").style.width = "70vw";
  document.querySelector('table').style.width = "70vw";
  document.getElementsByClassName("navbar")[0].style.display = "flex";
  document.getElementById("hw").style.display = "none";
  document.getElementById("download-btn").style.display = "block";

  //   el.style.padding = "32px";
  //   html2canvas(el).then(function (canvas) {
  //     document.getElementById("previewImage").appendChild(canvas);
  //     var link = document.createElement("a");
  //     link.href = canvas.toDataURL("image/png");
  //     link.download = "quotation.png";
  //     link.click();
  //   });
}
