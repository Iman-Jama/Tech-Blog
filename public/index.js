const { json } = require("express");

const loginHandler = async(e)=> {
    e.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password =document.querySelector('#password').value.trim();

    if(username && password) {
        const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        header: {"Content-Type": "application/json"},
    });

    if(res.ok){
        document.location.replace('/');
    } else {
        alert(res.statusText);
    }
}
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);