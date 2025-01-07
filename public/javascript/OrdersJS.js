function searchUsers() {
    const searchIn = document.getElementById('s').value.toLowerCase();
    const userRows = document.querySelectorAll('.user-row');
    const tableHead = document.getElementById('tableHead');
    const noUser = document.getElementById('m');
    
    let found = false;
    
    userRows.forEach(row => {
        const order = row.getAttribute('data-email');
        if(searchIn!=""){
        if (order === searchIn) { 
            row.style.display = '';
            found = true;
        } else {
            row.style.display = 'none';
        }
    }
    });
    
    if (!found) {
        tableHead.style.display = 'none';
        if(!searchIn==''){
        noUser.style.display = 'block';
        }
    } else {
        tableHead.style.display = '';
        noUser.style.display = 'none';
    }
}


