// Function to convert Persian numerals to Latin
function persianToLatin(persianNum) {
  const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const latin = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let i = 0; i < persian.length; i++) {
    const regex = new RegExp(persian[i], "g");
    persianNum = persianNum.replace(regex, latin[i]);
  }
  return persianNum;
}

// Function to insert the input elements
function insertInputs() {
  const dashboardViewport = document.querySelector('.dashboardViewport');

  if (dashboardViewport) {
    const containerDiv = document.createElement('div');
    containerDiv.style.marginBottom = '20px';
    containerDiv.style.display = 'flex';
    containerDiv.style.flexDirection = 'column';
    containerDiv.style.alignItems = 'center';
    containerDiv.style.border = '1px solid black';
    containerDiv.style.borderRadius = '5px';

    const instruction = document.createElement('div');
    instruction.innerText = 'لطفا بازه زمانی مورد نظر خود را انتخاب کنید';
    containerDiv.appendChild(instruction);
    instruction.style.marginTop = '10px'
    instruction.style.fontSize = '15px'

    const lineBreak = document.createElement('br');
    containerDiv.appendChild(lineBreak);

    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.marginBottom = '5px'

    const toDateLabel = document.createElement('span');
    toDateLabel.innerText = 'تا تاریخ:';
    div.appendChild(toDateLabel);

    const toDateInput = document.createElement('input');
    toDateInput.type = 'text';
    toDateInput.id = 'toDateInput';
    toDateInput.placeholder = 'jYYYY/jMM/jDD';
    toDateInput.style.borderRadius = '4px';
    toDateInput.style.margin = '0 10px';
    div.appendChild(toDateInput);

    const fromDateLabel = document.createElement('span');
    fromDateLabel.innerText = 'از تاریخ:';
    div.appendChild(fromDateLabel);

    const fromDateInput = document.createElement('input');
    fromDateInput.type = 'text';
    fromDateInput.id = 'fromDateInput';
    fromDateInput.placeholder = 'jYYYY/jMM/jDD';
    fromDateInput.style.borderRadius = '4px';
    fromDateInput.style.margin = '0 10px';
    div.appendChild(fromDateInput);

    const setDateButton = document.createElement('button');
    setDateButton.innerText = 'انتخاب تاریخ';
    setDateButton.style.borderRadius = '4px';
    setDateButton.style.border = '1px solid black';
    setDateButton.style.padding = '4px'
    div.appendChild(setDateButton);

    containerDiv.appendChild(div);
    dashboardViewport.insertBefore(containerDiv, dashboardViewport.firstChild);

    // Initialize PikadayJalali
    new Pikaday({
      field: document.getElementById('fromDateInput'),
      isJalaali: true
    });

    new Pikaday({
      field: document.getElementById('toDateInput'),
      isJalaali: true
    });

    setDateButton.addEventListener('click', function () {
      // Convert Persian numbers to Latin and get the date strings
      const fromDate = persianToLatin(fromDateInput.value);
      const toDate = persianToLatin(toDateInput.value);

      // Create ISO 8601 date strings
      const fromDateISO = new Date(fromDate).toISOString();
      const toDateISO = new Date(toDate).toISOString();

      // Extract the current URL
      const currentUrl = window.location.href;

      // Parse current URL to extract dashboard ID and other parts
      const hashParts = currentUrl.split('#');
      const hashSubParts = hashParts[1].split('?');
      const dashboardId = hashSubParts[0].split('/view/')[1];

      // Create a new URL with the updated time range
      const newUrl = `https://your-domain.com/app/dashboards#/view/${dashboardId}?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'${encodeURIComponent(fromDateISO)}',to:'${encodeURIComponent(toDateISO)}'))`;

      // Redirect to the new URL
      window.location.href = newUrl;
    });

    // Clear the interval once the element is found and inputs are inserted
    clearInterval(interval);
  }
}

// Periodically check for the element and insert the inputs once it's available
const interval = setInterval(insertInputs, 1000);
