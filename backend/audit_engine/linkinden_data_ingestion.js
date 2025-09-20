const https = require("https");

const data = JSON.stringify([
	{"url":"https://www.linkedin.com/in/elad-moshe-05a90413/"},
	{"url":"https://www.linkedin.com/in/jonathan-myrvik-3baa01109"},
	{"url":"https://www.linkedin.com/in/aviv-tal-75b81/"},
	{"url":"https://www.linkedin.com/in/bulentakar/"},
]);

const options = {
    hostname: "api.brightdata.com",
    path: "/datasets/v3/trigger?dataset_id=gd_l1viktl72bvl7bjuj0&include_errors=true",
    method: "POST",
    headers: {
		"Authorization": "Bearer f67c6a5a674516eb1fb20c3b12ded4cd1f011cde3caa9f96479512d72dff84ae",
		"Content-Type": "application/json",
	},
};

const req = https.request(options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
        responseData += chunk;
    });

    res.on("end", () => {
        console.log(responseData);
    });
});

req.on("error", (error) => {
    console.error(error);
});

req.write(data);
req.end();