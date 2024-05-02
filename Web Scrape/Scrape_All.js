const { Cluster } = require('puppeteer-cluster');
const fs = require('fs');

const file = fs.createWriteStream('data.csv', { flags: 'a' });

const links=['https://blog.ankitsanghvi.in/back-to-0/', 'https://blog.ankitsanghvi.in/how-i-learnt-to-do-sales-despite-being-a-coder/', 'https://blog.ankitsanghvi.in/customer-obsession/', 'https://blog.ankitsanghvi.in/social-capital/', 'https://blog.ankitsanghvi.in/interactive-vr-app-101/', 'https://blog.ankitsanghvi.in/an-intro-to-sales-in-2023/', 'https://blog.ankitsanghvi.in/maximizing-llm-performace/', 'https://blog.ankitsanghvi.in/buildschool/', 'https://blog.ankitsanghvi.in/hugging-sage/', 'https://blog.ankitsanghvi.in/can-vr-revolutionize-education/', 'https://blog.ankitsanghvi.in/escaping-the-mental-map/', 'https://blog.ankitsanghvi.in/impact-of-tech-on-wealth/', 'https://blog.ankitsanghvi.in/switching-streams-midway/', 'https://blog.ankitsanghvi.in/1970-2023/', 'https://blog.ankitsanghvi.in/ole-ole-alakananda/', 'https://blog.ankitsanghvi.in/templatising-the-ml-modelling-experience/', 'https://blog.ankitsanghvi.in/getting-started-with-serverless-lambda-macos/', 'https://blog.ankitsanghvi.in/techsoc-head/', 'https://blog.ankitsanghvi.in/building-cloudpilot-with-retrieval-augmented-generation/', 'https://blog.ankitsanghvi.in/coursegpt/', 'https://blog.ankitsanghvi.in/problem-to-product/', 'https://blog.ankitsanghvi.in/hello-okrs/', 'https://blog.ankitsanghvi.in/learning-from-unusual-billionaires/', 'https://blog.ankitsanghvi.in/back-of-the-envelope-calculations-at-twitter-2-0/', 'https://blog.ankitsanghvi.in/the-next-decade-of-indian-higher-education/', 'https://blog.ankitsanghvi.in/the-history-of-cloud-computing/', 'https://blog.ankitsanghvi.in/migrating-from-mongodb-to-dynamodb-using-aws-dms/', 'https://blog.ankitsanghvi.in/introduction-to-osi/', 'https://blog.ankitsanghvi.in/knowledge-graphs/', 'https://blog.ankitsanghvi.in/how-to-start-coding/', 'https://blog.ankitsanghvi.in/the-everything-store-review/', 'https://blog.ankitsanghvi.in/cbdc/', 'https://blog.ankitsanghvi.in/phoenix-moments/', 'https://blog.ankitsanghvi.in/basic-ml-algorithms/', 'https://blog.ankitsanghvi.in/education-on-a-map/', 'https://blog.ankitsanghvi.in/project-whatshopp/', 'https://blog.ankitsanghvi.in/how-to-https-your-api/', 'https://blog.ankitsanghvi.in/distributed-graph-backend-logistics-sytem/', 'https://blog.ankitsanghvi.in/web-push-notifications-2/', 'https://blog.ankitsanghvi.in/why-work-at-a-startup-part-iii-noida/', 'https://blog.ankitsanghvi.in/why-work-at-a-startup-part-2-goa/', 'https://blog.ankitsanghvi.in/why-work-at-a-startup/', 'https://blog.ankitsanghvi.in/steering-wheel/', 'https://blog.ankitsanghvi.in/observer-pattern/', 'https://blog.ankitsanghvi.in/undoing-commands/', 'https://blog.ankitsanghvi.in/react-fontawesome/', 'https://blog.ankitsanghvi.in/command-pattern/', 'https://blog.ankitsanghvi.in/template-model-pattern/', 'https://blog.ankitsanghvi.in/theory-of-data-visualizations/', 'https://blog.ankitsanghvi.in/strategy-pattern/', 'https://blog.ankitsanghvi.in/injecting-some-sass/', 'https://blog.ankitsanghvi.in/react-autocomplete/', 'https://blog.ankitsanghvi.in/iterator-pattern/', 'https://blog.ankitsanghvi.in/d3-and-next/', 'https://blog.ankitsanghvi.in/state-pattern/', 'https://blog.ankitsanghvi.in/memento-pattern/', 'https://blog.ankitsanghvi.in/next-js/', 'https://blog.ankitsanghvi.in/git-squash-rebase-and-merge/', 'https://blog.ankitsanghvi.in/presentational-and-container/', 'https://blog.ankitsanghvi.in/react-firebase-auth/', 'https://blog.ankitsanghvi.in/react-query/', 'https://blog.ankitsanghvi.in/setting-up-postgres/', 'https://blog.ankitsanghvi.in/redux/', 'https://blog.ankitsanghvi.in/crawling-indexing-and-deindexing/', 'https://blog.ankitsanghvi.in/atomic-design/', 'https://blog.ankitsanghvi.in/cdd-and-atomic-design/', 'https://blog.ankitsanghvi.in/bidirectional-api-with-grpc/', 'https://blog.ankitsanghvi.in/client-push-api-with-grpc/', 'https://blog.ankitsanghvi.in/server-push-api-with-grpc/', 'https://blog.ankitsanghvi.in/less-css/', 'https://blog.ankitsanghvi.in/unary-api-with-grpc/']

 // I HAVE TAKEN LINKS FROM CONSOLE OF BROWSER. 

 // I COULD ALSO TAKE LINKS FROM index.js FILE. 

const brows= async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 15,
    puppeteerOptions:{
        headless: true,
        defaultViewport: null
    }
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    const row=await page.evaluate(()=>{
        
        const title= document.body.querySelector('.post-full-title').innerText
        const date= document.body.querySelector('.byline-meta-date').innerText
        const para= document.body.querySelectorAll('p')
        const p=[]
        for(let pa in para){
            if(para[pa].innerText){
                p.push(para[pa].innerText)

            }
        }
        const images=document.body.querySelectorAll('.kg-card.kg-image-card > img')
        const imglinks=[]
        for(let link in images){
            if(images[link].src){
                imglinks.push(images[link].src)
            }
        }
        const r={
            title: title,
            date: date,
            images: imglinks,
            paragraphs: p
        }
        return r;
    })
        
    const title = [row.title]
    const date=[row.date]
    const images=[row.images]
    const paragraphs=[row.paragraphs]

    file.write('Title: '+ title+ '\n'+ 'Date: '+ date+ '\n'+ 'Images:'+ '\n'+  images+ '\n' + 'Paragraphs: '+ '\n' + paragraphs  + '\n\n\n\n');
  });

 

  for(let link in links){
    cluster.queue(links[link])
  }


  await cluster.idle();
  await cluster.close();
};


brows();

