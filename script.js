const table = document.querySelector("table");
const tableBtn = document.querySelector(".table-btn");
const raw = document.querySelector(".raw-data");

// const data =
//   "53 56 58 53 65 71 62 62 64 56 58 54 54 58 59 58 54 57 58 48 45 67 52 63 57 64 59 60 70 56 70 60 56 68 54 74 52 60 58 49 73 62 52 60 63 50 54 58";

const getArray = (str) => {
  const data = str
    .replace(/,/g, ", ")
    .split(" ")
    .filter((num) => parseFloat(num))
    .map((num) => parseFloat(num));

  const rawData = data.toString().replace(/,/g, " ");
  raw.innerText = `
  The converted numbers :
  
  ${rawData}
  `;
  return data;
};

const sorting = (arr) => {
  let len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1] > arr[j]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
};
const calculateLogarithm = (base, x) => {
  let a = Math.log(x);
  let b = Math.log(base);

  return a / b;
};
const banyakKelas = (arr) => {
  const n = arr.length;
  const log = calculateLogarithm(10, n);
  const resultCeil = Math.ceil(1 + 3.3 * log);

  return resultCeil;
};
const panjangKelas = (arr, bykKelas) => {
  const XMin = Math.min(...arr);
  const XMax = Math.max(...arr);

  const jangkauan = XMax - XMin;
  const result = jangkauan / bykKelas;
  const resultCeil = Math.ceil(result);

  return resultCeil;
};
const menyusunInterval = (arr, bykKelas, pjgKelas) => {
  const XMin = Math.min(...arr);
  let nilaiInterval = [];
  let batasBawah = XMin;

  for (let kelas = 1; kelas <= bykKelas; kelas++) {
    let batasAtas = batasBawah + pjgKelas - 1;
    nilaiInterval.push([batasBawah, batasAtas]);

    batasBawah = batasAtas + 1;
  }

  return nilaiInterval;
};
const mencariFrekuensi = (arr, nilaiInterval) => {
  let tabel = nilaiInterval;
  const counts = arr.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {}
  );

  nilaiInterval.forEach((kelas, index) => {
    let frekuensi = 0;

    for (const angka in counts) {
      if (angka >= kelas[0] && angka <= kelas[1]) {
        frekuensi += counts[angka];
      }
    }

    tabel[index].push(frekuensi);
  });

  return tabel;
};
const displayTable = (arr) => {
  let table = document.querySelector("table");

  table.innerHTML = `<tr>
  <th>Class Interval</th>
  <th>Frequency</th>
    </tr>`;

  arr.forEach((kelas) => {
    const row = document.createElement("tr");

    const nilai = document.createElement("td");
    nilai.innerText = `${kelas[0]} - ${kelas[1]}`;
    row.appendChild(nilai);

    const frekuensi = document.createElement("td");
    frekuensi.innerText = `${kelas[2]}`;
    row.appendChild(frekuensi);

    table.append(row);
  });
};

const getTable = () => {
  const newTable = document.querySelector("table");
  newTable.textContent = "";

  const data = document.querySelector("textarea").value;

  const arrData = getArray(data);
  const sortedData = sorting(arrData);
  const bykKelasData = banyakKelas(arrData);
  const pjgKelasData = panjangKelas(arrData, bykKelasData);

  const nilaiIntervalData = menyusunInterval(
    sortedData,
    bykKelasData,
    pjgKelasData
  );

  const completeDataArr = mencariFrekuensi(sortedData, nilaiIntervalData);

  displayTable(completeDataArr);
};

tableBtn.addEventListener("click", getTable);