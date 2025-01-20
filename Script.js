document.getElementById('fetchData').addEventListener('click', function() {
    // Smmgen API ကို ချိတ်ဆက်မယ့် code
    fetch('https://api.smmgen.com/endpoint', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY', // Smmgen API Key ကို ဒီနေရာမှာ ထည့်ပါ
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) // API ကနေ ပြန်လာတဲ့ဒေတာကို JSON အဖြစ် ပြောင်းပါ
    .then(data => {
        // ဒေတာကို စာမျက်နှာပေါ်မှာ ပြပါ
        document.getElementById('apiResponse').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error); // အမှားတစ်ခုခုရှိရင် ပြပါ
    });
});
