import puppeteer from "puppeteer";
const grass = process.env.grass_dir;
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${grass}`,
      `--load-extension=${grass}`,
      "--enable-automation",
    ],
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    "chrome-extension://ilehaonighjijnmpnagapkhpcdbhclfg/index.html"
  );

  const user = await page.$("[name='user']");
  await user.type(process.env.email);

  const pwd = await page.$("[name='password']");
  await pwd.type(process.env.password);
  await console.log("Finished input");

  const login = await page.$("[type='submit']");
  await login.click();
  await console.log("Logged in");
})();
