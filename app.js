const togglePopup = document.getElementById("toggle-popup");
// ------------------------------ Functions ------------------------------
function loadTable() {
  fetch("http://localhost:8080/student/all")
    .then((res) => res.json())
    .then((data) => {
      const tblBody = document.getElementById("tblBody");
      let bodyData = ``;
      data.studentList.forEach((element) => {
        bodyData += `<tr onclick="openPopup('${element.id}')">
                      <td id="id">${element.id}</td>
                      <td id="name">${element.name}</td>
                      <td id="age">${element.age}</td>
                      <td id="address">${element.address}</td>
                    </tr>`;
      });
      tblBody.innerHTML = bodyData;
    });
}
function searchView() {
  const searchValue = document.getElementById("searchBar").value.toLowerCase();
  let tableRows = document.querySelectorAll("#tblBody tr");
  tableRows.forEach((row) => {
    const studentName = row.querySelector("#name").innerHTML.toLowerCase();
    const studentId = row.querySelector("#id").innerHTML.toLowerCase();
    if (studentName.includes(searchValue) | studentId.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
async function addStudent() {
  if (isEmpty()) {
    alert("Empty field found!");
    return;
  }
  if (!confirm("Do you want to submit?")) {
    return;
  }
  try {
    const txtName = document.getElementById("txtName");
    const txtAge = document.getElementById("txtAge");
    const txtAddress = document.getElementById("txtAddress");
    const response = await fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: txtName.value,
        age: parseInt(txtAge.value),
        address: txtAddress.value,
      }),
    });
    if (!response.ok) {
      throw error;
    }
    location.reload();
  } catch (error) {
    console.error(error);
  }
}
async function updateStudent(id) {
  if (isEmpty()) {
    alert("Empty field found!");
    return;
  }
  if (!confirm("Do you want to update?")) {
    return;
  }
  try {
    const txtName = document.getElementById("txtName");
    const txtAge = document.getElementById("txtAge");
    const txtAddress = document.getElementById("txtAddress");
    const response = await fetch("http://localhost:8080/student/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: parseInt(id),
        name: txtName.value,
        age: parseInt(txtAge.value),
        address: txtAddress.value,
      }),
    });
    if (!response.ok) {
      throw error;
    }
    location.reload();
  } catch (error) {
    console.error(error);
  }
}
async function deleteStudent(id) {
  if (isEmpty()) {
    alert("Empty field found!");
    return;
  }
  if (!confirm("Are you sure want to delete?")) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:8080/student/delete/${parseInt(id)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw error;
    }
    location.reload();
  } catch (error) {
    console.error(error);
  }
}
function isEmpty() {
  let txtNameValue = document.getElementById("txtName").value.replace(" ","");
  let txtAgeValue = document.getElementById("txtAge").value.replace(" ","");
  let txtAddressValue = document.getElementById("txtAddress").value.replace(" ","");
  return txtNameValue == "" || txtAgeValue == "" || txtAddressValue == "";
}
function openNewPopup() {
  togglePopup.innerHTML = `<div id="pop-up">
                                <div class="container">
                                    <form class="d-flex flex-wrap">
                                        <h3 class="col-12 text-center" id="txtId">Add new student</h3>
                                        <div class="col-12 col-md-6">
                                            <label for="txtName" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="txtName" required>
                                        </div>
                                        <div class="col-12 col-md">
                                            <label for="txtAge" class="form-label">Age</label>
                                            <input type="number" class="form-control" id="txtAge" required>
                                        </div>
                                        <div class="col-12 m-md-0">
                                            <label for="txtAddress" class="form-label">Address</label>
                                            <input type="text" class="form-control" id="txtAddress" placeholder="Ex. No.43/B, Main Rd., Colombo" required>
                                        </div>
                                        <div class="d-flex flex-wrap flex-fill justify-content-evenly">
                                            <button class="btn btn-success" type="button" onclick="addStudent()">Submit</button>
                                            <button class="btn btn-primary" type="button" onclick="closePopup()">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>`;
}
function openPopup(id) {
  fetch(`http://localhost:8080/student/${id}`)
    .then((res) => res.json())
    .then((data) => {
      togglePopup.innerHTML = `<div id="pop-up">
                                <div class="container">
                                    <form class="d-flex flex-wrap">
                                        <h3 class="col-12 text-center" id="txtId">Student ID : ${data.id}</h3>
                                        <div class="col-12 col-md-6">
                                            <label for="txtName" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="txtName" value="${data.name}" required>
                                        </div>
                                        <div class="col-12 col-md">
                                            <label for="txtAge" class="form-label">Age</label>
                                            <input type="number" class="form-control" id="txtAge" value="${data.age}" required>
                                        </div>
                                        <div class="col-12 m-md-0">
                                            <label for="txtAddress" class="form-label">Address</label>
                                            <input type="text" class="form-control" id="txtAddress" placeholder="Ex. No.43/B, Main Rd., Colombo" value="${data.address}" required>
                                        </div>
                                        <div class="d-flex flex-wrap flex-fill justify-content-evenly">
                                            <button class="btn btn-danger" type="button" onclick="deleteStudent(${data.id})">Delete</button>
                                            <button class="btn btn-success" type="button" onclick="updateStudent(${data.id})">Update</button>
                                            <button class="btn btn-primary" type="button" onclick="closePopup()">Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>`;
    });
}
function closePopup() {
  togglePopup.innerHTML = "";
}
// ------------------------------ Runtime ------------------------------
loadTable();
