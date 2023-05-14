const logout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
    //   document.location.replace('/');
    console.log("logout successful!")
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout_button').addEventListener('click', logout);
  