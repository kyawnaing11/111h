const API_URL = 'https://smmgen.com/api/v2';
const API_KEY = '097f5271429fa4c0401c36b09a426cc8'; // သင့်ရဲ့ API Key

async function connectToAPI(action, data = {}) {
    const postData = {
        key: API_KEY,
        action: action,
        ...data
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(postData).toString()
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

// Services ရယူခြင်း
async function getServices() {
    return await connectToAPI('services');
}

// Balance ရယူခြင်း
async function getBalance() {
    return await connectToAPI('balance');
}

// Services ရယူပါ
getServices()
    .then(services => {
        console.log('Services:', services);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Balance ရယူပါ
getBalance()
    .then(balance => {
        console.log('Balance:', balance);
    })
    .catch(error => {
        console.error('Error:', error);
    });
