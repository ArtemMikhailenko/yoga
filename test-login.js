const fetch = require('node-fetch');

async function testLogin() {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'vladybookings@gmail.com',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  console.log('Login response:', data);
}

testLogin();
