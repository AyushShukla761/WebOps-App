const puppeteer =require('puppeteer')

 // THIS FILE CAN HELP IN GETTING ALL THE LINKS TO BLOGS.


 // FILE WHERE MAIN SCRAPING IS DONE IS Scrape_All.js

puppeteer.launch({
    headless: true,
    defaultViewport: null,
  }).then(async (browser)=>{
    const page=await browser.newPage()
    await page.goto('https://blog.ankitsanghvi.in/', {
        waitUntil: "domcontentloaded"
      })

      

    const bloglinks = await page.$$eval('.post-card-image-link', alla=> alla.map(a=> a.href))
  
    aoa= bloglinks.map(b=> [b])

    console.log(bloglinks)

    
    
      
    await browser.close()
     
    

})


