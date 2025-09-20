import https from "https";
import dotenv from "dotenv";
dotenv.config();

/**
 * Trigger BrightData ingestion with webhook support
 */
export async function triggerBrightDataIngestion(profileUrl) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify([{ url: profileUrl }]);

    const options = {
      hostname: "api.brightdata.com",
      path: `/datasets/v3/trigger?dataset_id=gd_l1viktl72bvl7bjuj0&endpoint=${encodeURIComponent(process.env.PUBLIC_URL + "/api/audit/webhook")}&format=json&uncompressed_webhook=true&include_errors=true`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}


/**
 * Check progress of BrightData job
 * (you won’t need this anymore once webhook flow works,
 * but keeping it for debugging/fallback)
 */
export async function checkBrightDataStatus(jobId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.brightdata.com",
      path: `/datasets/v3/progress/${jobId}`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
      },
    };
    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => (responseData += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.end();
  });
}

/**
 * Fetch snapshot data once ready
 */
export async function fetchBrightDataSnapshot(snapshotId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.brightdata.com",
      path: `/datasets/v3/snapshot/${snapshotId}?format=json`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => (responseData += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.end();
  });
}
