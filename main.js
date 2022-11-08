fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(json=>{

		const list_element = document.getElementById('user_data');
		const pagination_element = document.getElementById('page_numbers');
		
		let current_page = 1;
		let rows = 3;
		
		function DisplayList (items, wrapper, rows_per_page, page) {
			wrapper.innerHTML = "";
			page--;
		
			let start = rows_per_page * page;
			let end = start + rows_per_page;
			let paginatedUsers = items.slice(start, end);
		
			for (let i = 0; i < paginatedUsers.length; i++) {
			
				document.getElementById('user_data').innerHTML += `
                    <tr>
                        <th scope="row">${paginatedUsers[i].id}</th>
                        <td>${paginatedUsers[i].name}</td>
                        <td>${paginatedUsers[i].email}</td>
                        <td>${paginatedUsers[i].address.street.concat(", ",paginatedUsers[i].address.city,", ",paginatedUsers[i].address.zipcode)}</td>
                    </tr>
                `
			}
		}
		
		function SetupPagination (items, wrapper, rows_per_page) {
			wrapper.innerHTML = "";
			
			let page_count = Math.ceil(items.length / rows_per_page);

				let str = 'PREV'
					let btn = PaginationButton(0, items , page_count , str);
					wrapper.appendChild(btn);

				for (let i = 1; i <= page_count; i++) {
					let btn = PaginationButton(i, items , page_count , i);
					wrapper.appendChild(btn);
				}

					let str2 = 'NEXT'
					let bttn = PaginationButton(page_count+1, items , page_count , str2);
					wrapper.appendChild(bttn);
		}

		
		function PaginationButton (page, items , page_count  , text) {
			let button = document.createElement('button');
			button.innerText = text;
			button.setAttribute('id', page)
			button.value = page;

			if (current_page == page) {
				document.getElementById('0').classList.add('disabled')
				button.classList.add('active');
			}
			button.addEventListener('click', function () {

				// if (current_page<1) {
				// 	document.getElementById('0').classList.add('invisible')
				// 	document.getElementById('0').classList.remove('visible')

				// }else{
				// 	document.getElementById('0').classList.add('visible')
				// 	document.getElementById('0').classList.remove('invisible')	
				// }
				// if (current_page>page_count) {
				// 	document.getElementById(page_count+1).classList.add('invisible')
				// 	document.getElementById(page_count+1).classList.remove('visible')

				// }else{
				// 	document.getElementById(page_count+1).classList.add('visible')
				// 	document.getElementById(page_count+1).classList.remove('invisible')
				// }
				
				// console.log('before currentpage:',current_page)
				// console.log('before page:',page)
				// console.log('beforelastpage: ',last_page)

				if(page == 0) {
					// console.log('in IF')
					if(current_page==1){
						current_page = 1
					}
					else	current_page = current_page - 1
					// page = current_page
					// console.log('lastpage: ',last_page)
					// console.log("page: ",page)
				}

				else if(page == page_count+1) {
					// console.log('in IF')
					if(current_page==page_count){
						current_page = page_count
					}
					else	current_page = current_page + 1

					// console.log("page: ",page)
				}

				else current_page = page

				if(current_page<=1){

					DisplayList(items, list_element, rows, 1);
					document.getElementById('0').classList.add('disabled')
				}
				else if(current_page>=page_count){
					document.getElementById(page_count+1).classList.add('disabled')
					DisplayList(items, list_element, rows, page_count);

				}
				else {
					document.getElementById('0').classList.remove('disabled')	
					document.getElementById(page_count+1).classList.remove('disabled')
					DisplayList(items, list_element, rows, current_page);
				}
				// console.log('afterdisplaypage:',page)
				// console.log('After If')
				// console.log('Currentpage: ',current_page)
		
				let current_btn = document.querySelector('.pagination button.active');
				current_btn.classList.remove('active');

				document.getElementById(current_page).classList.add('active')
		
				// button.classList.add('active');
			});
		
			return button;
		}


		
		DisplayList(json, list_element, rows, current_page);
		SetupPagination(json, pagination_element, rows);

	})