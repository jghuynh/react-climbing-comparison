// contains the Node.js web scraping logic
const cheerio = require("cheerio");
const axios = require("axios");

// using puppeteer
const puppeteer = require("puppeteer");
const fs = require("fs");

const disciplines = ["boulder", "lead", "speed", "b&l"];
const genders = ["women", "men"];
const baseURL = "https://www.ifsc-climbing.org/";

const buildUrl = (discipline = "boulder", gender = "women") => {
  return (
    baseURL + "ranking/index?" + `discipline=${discipline}&category=${gender}`
  );
};

let worldRankingURL = buildUrl((discipline = "boulder"), (gender = "women"));

/**
 * Download the target web page
 * by performing an HTTP GET request in Axios (to get source code)
 */
async function performScraping(myURL) {
  const axiosResponse = await axios.request({
    method: "GET",
    url: myURL,
    // sets a valid User-Agent header in Axios. Otherwise, anti-scraper will block our scraper
    // User Agents for web scraping:
    // https://brightdata.com/blog/how-tos/user-agents-for-web-scraping-101
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  // parsing the HTML String source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);

  // select HTML element
  //   const htmlElement = $(".elementClass");
  // const htmlElement = $("#elementId")
  athletesList = [];
  indexList = [];
  const tableData = [];
  const htmlElement = $("table > tbody > tr");
  //   .each((index, element) => {
  //     console.log(element.children);
  //   })
  //   .each(function () {
  //     const row = $(this)
  //       .find("td")
  //       .map((i, el) => $(el).text())
  //       .get();
  //     tableData.push(row);
  //   });
  //   const htmlElement = $(".grid").find(".w-full")
  //     // .find("w-full")
  //     .each((index, element) => {
  //        // scraping logic...
  //        if (element.name === "a") {
  //          console.log(`Element: ${element.attribs.title}`);
  //          const athleteName = element.attribs.title;
  //          athletesList.push(athleteName);
  //          console.log("hi");
  //          const athleteModifier = element.attribs.href;
  //          const newURL = baseURL + athleteModifier;
  //        }
  //         // console.log(`${index}, ${element}`);
  //      });
  //   console.log(tableData);
  // console.log(htmlElement);
  //   console.log(athletesList);
}

/**
 * Boilerplate code necessary to run puppeteer
 * Opens a browswer, goes to the page to scrape it, then closes browswer
 */
(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set a higher timeout
  await page.setDefaultNavigationTimeout(60000); // 60 seconds timeout

  // Function to scrape ranking table and get athlete profile URLs
  async function scrapeRankingTable(worldRankingURL) {
    await page.goto(worldRankingURL, {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector("table.w-full", { timeout: 60000 });

    const data = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("table.w-full tbody tr")
      );
      return rows
        .map((row) => {
          const columns = row.querySelectorAll("td");
          const profileLink = columns[1].querySelector("a"); // Assuming the profile link is in the second column
          return {
            rank: columns[0].innerText.trim(),
            climber: columns[1].innerText.trim(),
            nation: columns[2].innerText.trim(),
            points: columns[3].innerText.trim(),
            profileUrl: profileLink ? profileLink.href : null,
          };
        })
        .filter((athlete) => athlete.profileUrl !== null); // Filter out rows without a profile link
    });

    return data;
  }

  // Function to scrape athlete's profile data
  /**
   * Scrapes the age and association of a given athlete
   * @param {URL} url the profile url
   * @returns an object {age, url}
   */
  async function scrapeAthleteProfile(url) {
    const athletePage = await browser.newPage();
    await athletePage.goto(url, { waitUntil: "networkidle2" });

    const athleteData = await athletePage.evaluate(() => {
      const nameElement = document.querySelector("h2");
      const ageElement = document.querySelector(
        "div.d3-ty-body-small.text-left.w-1\\/2.leading-7"
      );
      const associationElement = document.querySelector("div.d3-ty-body-small");

      const name = nameElement
        ? nameElement.innerText.trim()
        : "Name not found";
      const age = ageElement ? ageElement.innerText.trim() : "Age not found";
      const association = associationElement
        ? associationElement.innerText.trim()
        : "Association not found";

      // Split name into first and last name
      const nameParts = name.split(" ");
      const firstName =
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[0].slice(1).toLowerCase();
      const lastName = nameParts[1].toUpperCase();
      const formattedName = `${firstName} ${lastName}`;

      // Construct selector for the athlete's image based on the name
      const imageSelector = `img[alt="${formattedName}"]`;
      const imageElement = document.querySelector(imageSelector);
      const profileImage = imageElement ? imageElement.src : "Image not found";
      return {
        // name,
        age,
        association,
        profileImage,
        // url: window.location.href,
      };
    });

    await athletePage.close();
    return athleteData;
  }

  // Main execution flow
  /*
  for ever discipline
    for every gender:
      build URL
      let worldRankingURL = buildUrl(discipline, gender);
      scrapeRankingTable(worldRankingURL)
      maybe save it?
  */
  const rankingData = await scrapeRankingTable(worldRankingURL);

  for (const athlete of rankingData) {
    const profileData = await scrapeAthleteProfile(athlete.profileUrl); // why returning null?
    Object.assign(athlete, profileData); // Merge profile data into the main athlete object
    console.log(athlete); // Log each athlete's combined data
  }

  console.log(JSON.stringify(rankingData, null, 2));

  // Write rankingData to a JSON file
  fs.writeFileSync(
    "rankingData.json",
    JSON.stringify(rankingData, null, 2),
    "utf-8"
  );

  // Close Puppeteer
  await browser.close();
})();
