// Sample user data
// let users = [
//     { firstName: 'Ahmed', lastName: 'Khaledh', email: 'ahmed.admin@gmail.com' }
// ];

// // Function to load users into the table
// function loadUsers() {
//     const tbody = document.querySelector('#usersTable tbody');
//     tbody.innerHTML = '';
//     users.forEach((user, index) => {
//         const row = `
//             <tr>
//                 <td>${user.firstName}</td>
//                 <td>${user.lastName}</td>
//                 <td>${user.email}</td>
//                 <td>
//                     <button type="button" onclick="EditUserFun(${index})">Edit</button>
//                     <button type="button" onclick="DeleteUserFun(${index})">Delete</button>
//                 </td>
//             </tr>
//         `;
//         tbody.innerHTML += row;
//     });
// }

// Function to edit a user
// function EditUserFun(index) {
//     const user = users[index];
//     const newFirstName = prompt('Enter new first name:', user.firstName);
//     const newLastName = prompt('Enter new last name:', user.lastName);
//     const newEmail = prompt('Enter new email:', user.email);

//     if (newFirstName && newLastName && newEmail) {
//         users[index] = { firstName: newFirstName, lastName: newLastName, email: newEmail };
//         loadUsers();
//     }
// }

// // Function to delete a user
// function DeleteUserFun(index) {
//     if (confirm('Are you sure you want to delete this user?')) {
//         users.splice(index, 1);
//         loadUsers();
//     }
// }

// // Load users when the page loads
// //window.onload = loadUsers;


function Viewuser(){

        location.replace("/admin/ViewUser")
      
}