function showAllEmployee(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employee/show",
        success: function (data) {
            showEmployee(data);
        }
    })
}
showAllEmployee()
function showEmployee(employee){
    let str = ``
    for (const e of employee) {
        str += ` <tr >
                 <td>${e.employeeCode}</td>
                 <td><a onclick="showDetail()">${e.name}</a> </td>
                 <td>${e.age}</td>
                 <td>${e.salary}</td>
                 <td>${e.department}</td>
                 <td><button onclick="showEdit(${e.id})">Update</button></td>
                 <td><button onclick="deleteEmployee(${e.id})">Delete</button></td></tr>`
    }
    $("#list").html(str)
}
function createEmployee() {
    let code = $('#code').val();
    let name = $('#name').val();
    let age = $('#age').val();
    let salary = $('#salary').val();
    let department = $('#department').val();
    let newEmployee = {
        employeeCode: code,
        name: name,
        age: age,
        salary: salary,
        department: department
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/employee/create",
        data: JSON.stringify(newEmployee),
        success: function (){
            showAllEmployee();
        }
    })
}
let idEdit;
function showEdit(id){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/employee/${id}`,
        success: function (employee){
            location.href= "update.html"
            idEdit = id;
            $('#codeEdit').val(employee.employeeCode);
            $('#nameEdit').val(employee.name);
            $('#ageEdit').val(employee.age);
            $('#salaryEdit').val(employee.salary);
            $('#departmentEdit').val(employee.department);
        }
    })
}
function editEmployee(){
    let code = $('#codeEdit').val();
    let name = $('#nameEdit').val();
    let age = $('#ageEdit').val();
    let salary = $('#salaryEdit').val();
    let department = $('#departmentEdit').val();
    let newEmployee = {
        employeeCode: code,
        name: name,
        age: age,
        salary: salary,
        department: department
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/employee/edit/${idEdit}`,
        data: JSON.stringify(newEmployee),
        success: function (){
            showAllEmployee();
        }
    })
}
function showDetail(){

}
function deleteEmployee(id) {
    if (confirm("You want to delete?")) {
        $.ajax({
            type: "POST",
            url: `http://localhost:8080/employee/delete/${id}`,
            success: function () {
                showAllEmployee();
            }
        });
    }
}
