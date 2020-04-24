const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

(async () => {
    var urlTemp = process.argv.slice(2);
    var nombreZona = process.argv.slice(3) //'CABA';
    
    var url = urlTemp[0]
    console.log(url, nombreZona)
    // var totalPaginas = 191;    
    // var cantidadPorPagina = 31;

    // for(i = 0; i< totalPaginas; i++){

    // }
    
    const writeStream = fs.createWriteStream(nombreZona + `-${Date.now()}-data.csv`);    
   
    //var url = 'https://www.tripadvisor.com.ar/Restaurants-g312809-zfg11776-Rosario_Province_of_Santa_Fe_Litoral.html';
    //var url = 'https://www.tripadvisor.com.ar/Restaurants-g312740-Capital_Federal_District.html';

    //https://www.tripadvisor.com.ar/Restaurants-g312740-Capital_Federal_District.html#EATERY_LIST_CONTENTS
    //https://www.tripadvisor.com.ar/Restaurants-g312740-oa30-Capital_Federal_District.html#EATERY_LIST_CONTENTS

    request(url, (error, response, html) =>{
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            let urls = [];
           
            $('._2Q7zqOgW').each((i, el)=>{
                
                const url = 'https://www.tripadvisor.com.ar' + $(el).find('._15_ydu6b').attr('href')
                
                urls.push(url);
            });
        
            urls.forEach((url, index) => {
                
                request(url, (error, response, html) =>{
                    if(!error && response.statusCode == 200) {
                        const repo = cheerio.load(html);
    
                        let mail = repo('div[class="restaurants-detail-overview-cards-LocationOverviewCard__detailLink--iyzJI restaurants-detail-overview-cards-LocationOverviewCard__contactItem--1flT6"] > span > a').attr('href');
                        
                        if(mail != null){
                        
                            tempMail = mail.split(':')[1].split('?')[0]
                            
                            let restaurant = {
                                nombre: repo('h1[class="ui_header h1"]').text(),
                                direccion: repo('span[class="street-address"]').text(),
                                direccionExtendida: repo('span[class="extended-address"]').text(),
                                localidad: repo('span[class="locality"]').text(),
                                telefono: repo('span[class="detail  ui_link level_4 is-hidden-mobile"]').text(),
                                mail: tempMail    
                            }
                            
                            writeStream.write(`${restaurant.nombre}| ${restaurant.direccion}| ${restaurant.direccionExtendida}| ${restaurant.localidad}| ${restaurant.telefono}| ${restaurant.mail} \n`);
    
                        }
    
                    }
                    
                });
    
                
            })
            
        }
    });
    
    
})();

