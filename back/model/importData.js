const mongoose = require("mongoose");
const User = require("./models/user"); // 假設你的模型名稱是 user.js

// 連接 MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bentoShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected!");
}).catch(err => console.error(err));

// 模擬資料
const users = [
    {
        "id": 1,
        "name": "Bridgette Kunze",
        "company": "Dietrich - Greenfelder",
        "username": "Oliver21",
        "email": "Noelia_Bailey@hotmail.com",
        "address": "1211 Airport Road",
        "zip": "95472",
        "state": "Washington",
        "country": "Hong Kong",
        "phone": "310.531.9897 x3517",
        "photo": "https://json-server.dev/ai-profiles/68.png"
    },
    {
        "id": 2,
        "name": "Curtis Faker Attribute Error: person.astName is not supported",
        "company": "Macejkovic, Effertz and Mosciski",
        "username": "Mercedes23",
        "email": "Ward70@yahoo.com",
        "address": "2995 Otto Well",
        "zip": "06490",
        "state": "Wisconsin",
        "country": "Singapore",
        "phone": "812.641.1445 x4368",
        "photo": "https://json-server.dev/ai-profiles/97.png"
    },
    {
        "id": 3,
        "name": "Ethelyn Bradtke",
        "company": "Wunsch Inc",
        "username": "Harmon_Schaefer17",
        "email": "Vickie.Block@hotmail.com",
        "address": "425 Clarendon Road",
        "zip": "77917",
        "state": "Missouri",
        "country": "Argentina",
        "phone": "770-292-6158",
        "photo": "https://json-server.dev/ai-profiles/4.png"
    },
    {
        "id": 4,
        "name": "Devonte Frami",
        "company": "O&#x27;Kon, Kessler and Dooley",
        "username": "Katlyn15",
        "email": "Deven_Hettinger54@hotmail.com",
        "address": "680 Sauer Landing",
        "zip": "14275-6674",
        "state": "Kansas",
        "country": "Virgin Islands, British",
        "phone": "1-217-622-1936 x840",
        "photo": "https://json-server.dev/ai-profiles/85.png"
    },
    {
        "id": 5,
        "name": "Felton Price",
        "company": "Braun, Ziemann and Champlin",
        "username": "Stephany.Friesen12",
        "email": "Gus_Lueilwitz@hotmail.com",
        "address": "829 Shanahan Run",
        "zip": "31366",
        "state": "Massachusetts",
        "country": "Macao",
        "phone": "417.734.7503",
        "photo": "https://json-server.dev/ai-profiles/50.png"
    },
    {
        "id": 6,
        "name": "Elva Goodwin",
        "company": "Heller - Brakus",
        "username": "Milton95",
        "email": "Christian.Gerlach32@hotmail.com",
        "address": "963 Smith Courts",
        "zip": "81550-7239",
        "state": "Maryland",
        "country": "Bangladesh",
        "phone": "(472) 709-3556 x99539",
        "photo": "https://json-server.dev/ai-profiles/85.png"
    },
    {
        "id": 7,
        "name": "Eduardo Nicolas",
        "company": "Wisoky - Cole",
        "username": "Mylene_Hodkiewicz32",
        "email": "Lulu12@hotmail.com",
        "address": "947 Clark Street",
        "zip": "45903",
        "state": "Texas",
        "country": "Lao People&#x27;s Democratic Republic",
        "phone": "1-531-839-8489",
        "photo": "https://json-server.dev/ai-profiles/7.png"
    },
    {
        "id": 8,
        "name": "Julien Stehr",
        "company": "Abernathy - MacGyver",
        "username": "Ellsworth49",
        "email": "Julius29@hotmail.com",
        "address": "780 Stanley Road",
        "zip": "07296",
        "state": "Arizona",
        "country": "Chad",
        "phone": "900.911.7987 x719",
        "photo": "https://json-server.dev/ai-profiles/31.png"
    },
    {
        "id": 9,
        "name": "Sedrick Lind",
        "company": "Conn, Anderson and Macejkovic",
        "username": "Alaina_Green62",
        "email": "Heber.Dare@yahoo.com",
        "address": "107 New Road",
        "zip": "06493-4752",
        "state": "Alabama",
        "country": "Zimbabwe",
        "phone": "1-436-682-5617 x373",
        "photo": "https://json-server.dev/ai-profiles/22.png"
    },
    {
        "id": 10,
        "name": "Fernando Reichel",
        "company": "Considine, Kozey and Morar",
        "username": "Hilma7",
        "email": "Bennie.Hackett@gmail.com",
        "address": "1668 Trenton Loop",
        "zip": "49663",
        "state": "Minnesota",
        "country": "Afghanistan",
        "phone": "(839) 944-3222",
        "photo": "https://json-server.dev/ai-profiles/73.png"
    }
];

// 將資料插入到 MongoDB
const importData = async () => {
    try {
        await User.insertMany(users);
        console.log("Data imported successfully!");
        process.exit();
    } catch (err) {
        console.error("Error importing data: ", err);
        process.exit(1);
    }
};

importData();