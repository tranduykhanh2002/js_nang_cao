function add() {
    var name = document.querySelector("input[name=name]").value
    var email = document.querySelector("input[name=email]").value
    var status = document.querySelector("select[name=status]").value
    if (name.length == '') {
        alert("Tên không được để trống");
        return false
    }
    if (email.length == '') {
        alert("Email không được để trống");

        return false
    } else {
        var data = {
            name: name,
            email: email,
            status: status
        }
        console.log(data);
        var url = "http://localhost:3000/users"
        fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                alert("Them thanh cong")
            })
            .catch((err) => {
                alert("Them that bai")
            })
    }
}
var url = 'http://localhost:3000/users'
var url2 = 'http://localhost:3000/roles'
fetch(url, {
        method: "GET"
    })
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(data);
        var row = document.querySelector('#ds-u')
        for (i = 0; i < data.length; i++) {
            var key = data[i]
            let new_row = row.insertRow(-1)
            let row1 = new_row.insertCell(0)
            row1.innerText = key.id
            let row2 = new_row.insertCell(1)
            row2.innerText = key.name
            let row3 = new_row.insertCell(2)
            row3.innerText = key.email
            let row4 = new_row.insertCell(3)
            row4.innerText = key.status
            let row5 = new_row.insertCell(4)
            var btn_sua = document.createElement('button');
            btn_sua.setAttribute('type', 'button');
            btn_sua.innerText = "Sua";
            btn_sua.setAttribute('onclick', 'UpdateRow(' + key.id + ')') // truyền vào id user
            row5.appendChild(btn_sua);
            let row6 = new_row.insertCell(5)
            var btn_xoa = document.createElement('button')
            btn_xoa.setAttribute('type', 'button')
            btn_xoa.innerHTML = "Xoa"
            btn_xoa.setAttribute('onclick', 'DeleteRow(' + key.id + ')')
            row6.appendChild(btn_xoa)
        }
    })

function DeleteRow(id) {
    let url_delete = 'http://localhost:3000/users/' + id;
    fetch(url_delete, {
        method: "DELETE"
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        location.reload();
    });
}

function UpdateRow(id) {
    console.log("Edit row " + id);
    let url_delete = 'http://localhost:3000/users/' + id;

    fetch(url_delete, {
        method: "GET"
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        document.querySelector("input[name=name_edit]").value = data.name;
        document.querySelector("input[name=email_edit]").value = data.email;
        document.querySelector("select[name=status_edit]").value = data.status;
        document.querySelector("#form_edit").setAttribute('id_edit', id);

        document.querySelector("#form_edit").style.display = "block";

    });

}

function SaveUpdate() {
    var u = document.querySelector("input[name=name_edit]").value;
    var e = document.querySelector("input[name=email_edit]").value;
    var s = document.querySelector("select[name=status_edit]").value;
    if (u.length == 0) {
        alert('Bạn cần nhập username');
        return false;
    }
    var dataPost = {
        name: u,
        email: e,
        status: s
    };
    var id_edit = document.querySelector("#form_edit").getAttribute('id_edit');

    var url_post = 'http://localhost:3000/users/' + id_edit;

    fetch(url_post, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);

            if (data.id == id_edit) {
                alert('Đã cập nhật thành công');
                LoadListUser();
                document.querySelector("input[name=name_edit]").value = '';
                document.querySelector("input[name=email_edit]").value = '';
                document.querySelector("select[name=status_edit]").value = '';
                document.querySelector("#form_edit").removeAttribute('id_edit');
            }
        })
        .catch((error) => {

            console.error('Error:', error);
        });
}