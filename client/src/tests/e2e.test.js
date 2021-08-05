import puppeteer from "puppeteer";

const { REACT_APP_SERVER_URL } = process.env

/**
 * Useful if you want to have
 * a trace of each step
 * of E2E testing in browser
 * (execute on host only, not on Docker)
 */
const delay = (time) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

describe("App.js", () => {

    jest.setTimeout(30000);

    let browser;
    let page;

    beforeAll(async() => {
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'], executablePath: "/usr/bin/chromium-browser"})
        page = await browser.newPage()
        await page.goto(REACT_APP_SERVER_URL)
    })

    it("remplir la page d'inscription", async() => {

        await page.waitForSelector('a[href="/register"]')
 
        await page.click('a[href="/register"]')
       
        const formFilling = { name: 'Robot test user', 
                              company: 'WORKGROUP', 
                              phone_number: '0651610000', 
                              email: 'robot@testing.net',
                              password: 'my_password',
                              currency: '€' }

        await page.waitForSelector('form')

        /**
         * Utilisation d'une boucle for classique
         * et non avec la syntaxe raccoucie suivante :
         * Object.entries(formFilling).forEach(async ([id,value]))
         * Car cette syntaxe crée une callback async à chaque itération
         * L'exécution de chaque callback n'est pas séquentielle = comportements inattendus
         */
        for(const [id,value] of Object.entries(formFilling))
        {
            await page.click('#'+id)
            await page.type('#'+id,value)
        }

        const kbisField = await page.$("#kbis")
        kbisField.uploadFile('src/tests/test_kbis_file.png')
        
        
        await page.click('button[type="submit"]')
    })

    afterAll(() => browser.close())

})