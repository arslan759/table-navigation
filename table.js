fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(json=>{

        json.forEach(json => {

            document.getElementById('user_data').innerHTML += `
                <tr>
                    <th scope="row">${json.id}</th>
                    <td>${json.name}</td>
                    <td>${json.email}</td>
                    <td>${json.address.street.concat(", ",json.address.city,", ",json.address.zipcode)}</td>
                </tr>
            `
        });
    })









