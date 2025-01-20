document.getElementById('fetchData').addEventListener('click', function() {
    // Smmgen API ကို ချိတ်ဆက်မယ့် code
    fetch('https://smmgen.com/api/v2', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 097f5271429fa4c0401c36b09a426cc8', // သင့်ရဲ့ API Key
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
