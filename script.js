document.getElementById('fetchData').addEventListener('click', function() {
         fetch('https://smmgen.com/api/v2', {
             method: 'GET',
             headers: {
                 'Authorization': 'Bearer YOUR_API_KEY', // 097f5271429fa4c0401c36b09a426cc8
                 'Content-Type': 'application/json'
             }
         })
         .then(response => response.json())
         .then(data => {
             document.getElementById('apiResponse').innerText = JSON.stringify(data, null, 2);
         })
         .catch(error => {
             console.error('Error:', error);
         });
     });
