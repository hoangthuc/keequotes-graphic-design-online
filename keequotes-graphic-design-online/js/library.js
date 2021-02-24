/// setup list type symbol
function setup_list_type_symbol(data,dom,type,slug,cat){
    var domain = data.image_server_url+'/';
    var insert = document.querySelector(dom);
    insert.innerHTML= '';
    console.log(data);
    data.result.forEach(el=>{
        let a  = document.createElement('a');
        let img  = document.createElement('img');
        a.className = 'item_type';
        a.innerHTML = el.name ;
        img.src = domain + el.cover_image;
        img.setAttribute('data-image',domain+el.data);
        if(type =='background' && el.type =='solid'){
            img.setAttribute('onclick','create_background_solid(`[data-product-group="'+type+'"] [data-loop="categories"] .content`,'+el.id+')');
        }else{
            img.setAttribute('onclick','load_data_cat(`'+slug+'`,`'+type+'`,`&'+cat+'='+el.id+'`)');
        }

        a.appendChild(img);
        insert.appendChild(a);
    });
}
/// setup list categories symbol
function setup_list_cat_symbol(data,dom,type,slug,cat){
    var domain = data.image_server_url+'/';
    var insert = document.querySelector(dom);
    insert.innerHTML= '';
    data.result.forEach(el=>{
        let div  = document.createElement('div');
        let a  = document.createElement('a');
        let img  = document.createElement('img');
        div.className = 'brick';
        a.className = 'item_cat';
        a.innerHTML = el.name;
        img.src = domain + el.cover_image;
        img.setAttribute('data-image',domain+el.data);
        img.setAttribute('onclick','load_data_item(`'+slug+'`,`'+type+'`,`&'+cat+'='+el.id+'`)');
        if(cat =='photo_category_id'){
            img.setAttribute('onclick','load_data_item(`'+slug+'`,`'+type+'`,`&'+cat+'='+el.id+'&keyword='+el.unsplash_keyword+'`)');
        }
        div.appendChild(a);
        a.appendChild(img);
        insert.appendChild(div);
    });
}
/// setup list symbol
function setup_list_item_symbol(data,dom,func){
    var domain = data.image_server_url+'/';
    var insert = document.querySelector(dom);
    insert.innerHTML= '';
    console.log(data);
    data.result.forEach(el=>{
     let div  = document.createElement('div');
     let img  = document.createElement('img');
     div.className = 'brick';
     img.src = domain + el.cover_image;
     img.setAttribute('data-image',domain+el.data);
     img.setAttribute('onclick',func+'(this)');
     // for text
     if(el.type.type == 'json' && func == 'add_text_detail'){
            func = 'load_item_json';
            img.setAttribute('data-json',el.data);
            img.setAttribute('onclick',func+'(this)');
     }
     /// for element
     if(func =='show_image_upsplash'){
      let type = el.data.split('.');
      if(type.pop() == 'svg'){
          func = 'add_element_detail';
          img.setAttribute('onclick',func+'(this)');
      }else{
          img.setAttribute('onclick',func+'(`'+domain+el.data+'`)');
      }
     }
     /// for background
     if(func == 'setBackgroundSolid'){
         let func_change = '';
         switch (el.type.type) {
             case 'solid':
             JSON.parse(el.data).forEach(ei=>{
                 func_change = 'setBackgroundSolid';
                 img = document.createElement('div');
                 img.setAttribute('onclick',func_change+'(this)');
                 img.setAttribute('data-color',ei);
                 img.setAttribute('style','float: left; width: 15%; padding-bottom: 15%; margin: 0.8%; background-color: '+ei+'; cursor: pointer; border-radius: 4px;');
                 div.appendChild(img);
             })
             break;
             case 'normal':
                 func_change = 'setBackgroundNormal';
                 img.setAttribute('onclick',func_change+'(this)');
                 img.setAttribute('data-color',domain+el.data);
             break;

             case 'repeat':
                 func_change = 'setBackgroundRepeat';
                 img.setAttribute('onclick',func_change+'(this)');
                 img.setAttribute('data-color',domain+el.data);
             break;

             case 'gradient':
                 func_change = 'setBackgroundGradient';
                 img.setAttribute('onclick',func_change+'(this)');
                 img.setAttribute('data-color',domain+el.data);
                 break;

             default:
             break;
         }
     }
     // for photo
        if(func =='show_image_upsplash_photo'){
            div.className = 'unsplashcontainerbackground';
            let func_change = 'show_image_upsplash';
            img.setAttribute('onclick',func_change+'(`'+domain+el.data+'`)');
        }
     div.appendChild(img);
     insert.appendChild(div);
    });
    /// for case custom color
    if(func == 'setBackgroundSolid' && data.result[0].type.type == 'solid'){
        let color = document.createElement('div');
        color.className = 'custom_color selector-color brick';
        insert.appendChild(color);
        create_selector_color('.custom_color.selector-color',setting.img_src);
    }
    if(func =='show_image_upsplash_photo'){
    let keyword = insert.getAttribute('data-keyword');
        var url = "https://api.unsplash.com/search/photos?query="+keyword+"&per_page=30&client_id=UXLXuYSobDmQYY6OCg8CYxV2YVFAReE2j5bRmDkR7LU";
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Accept": "application/json",
            },
        };
        jQuery.ajax(settings).done(function (response) {
            var imageList = response.results;
            console.log(imageList);
            jQuery.each(imageList, function(i, val) {
                var image = val;
                var imageURL = val.urls.thumb;
                var imageregularURL = val.urls.small;
                var imageID = val.id;
                var user = val.user.name;
                var username = val.user.username;
                var width = val.width;
                var height = val.height;
                var likes = val.likes;
                let url_img = 'https://unsplash.com/@'+ username +'?utm_source=keequotes&utm_medium=referral';
                let item  = document.createElement('div');
                item.className = 'unsplashcontainerbackground';
                item.innerHTML = '<img style="margin-bottom:5px;" src="'+ imageURL +'"><div class="middlebackground" onclick="show_image_upsplash(`'+imageregularURL+'`)"><div class="textbackground"><a href="'+ url_img +'" target="_blank">© '+ user +'</a></div></div>';
                insert.append(item);
            });
        });
    }


}


/// load data type symbol
function load_data_type(slug,type){
    jQuery('[data-product-group="'+type+'"] > div').hide();
    var slug_cat = jQuery('[data-product-group="'+type+'"] [data-loop="type"]').data('slug');
    var query_cat = jQuery('[data-product-group="'+type+'"] [data-loop="type"]').data('cat');
    var settings = {
        "url": setting.URL_API+slug+'?license_key='+setting.K_API,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };
    jQuery.ajax(settings).done(function (response) {
        if(response){
            setup_list_type_symbol(response,'[data-product-group="'+type+'"] [data-loop="type"] .content',type,slug_cat,query_cat);
            jQuery('[data-product-group="'+type+'"] [data-loop="type"]').show();
        };
    });
}

/// load data categories symbol
function load_data_cat(slug,type,query){
    jQuery('[data-product-group="'+type+'"] > div').hide();
    var slug_item = jQuery('[data-product-group="'+type+'"] [data-loop="categories"]').data('slug');
    var query_item = jQuery('[data-product-group="'+type+'"] [data-loop="categories"]').data('cat');
    var settings = {
        "url": setting.URL_API+slug+'?license_key='+setting.K_API+query,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };
    jQuery.ajax(settings).done(function (response) {
        if(response){
            console.log(response);
            setup_list_cat_symbol(response,'[data-product-group="'+type+'"] [data-loop="categories"] .content',type,slug_item,query_item);
            jQuery('[data-product-group="'+type+'"] [data-loop="categories"]').show();
        };
    });
}

/// get data symbol
function load_data_item(slug,type,query){
    jQuery('[data-product-group="'+type+'"] > div').hide();
    var func = jQuery('[data-product-group="'+type+'"] [data-loop="list_item"]').data('func');
    var keyword = getUrlParameter('keyword',query);
    jQuery('[data-product-group="'+type+'"] [data-loop="list_item"] .content').attr('data-keyword',keyword);
    var settings = {
        "url": setting.URL_API+slug+"?license_key="+setting.K_API+query,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };
    jQuery.ajax(settings).done(function (response) {
        setup_list_item_symbol(response,'[data-product-group="'+type+'"] [data-loop="list_item"] .content',func);
    });
    jQuery('[data-product-group="'+type+'"] [data-loop="list_item"]').show();
}

// setup list item product
function setup_list_item_product(data,dom,func){
    var domain = data.image_server_url+'/';
    var insert = document.querySelector(dom);
    insert.innerHTML= '';
    console.log(data);
    data.result.forEach(el=>{
        let a  = document.createElement('a');
        let img  = document.createElement('img');
        a.className = 'btn-load';
        a.innerHTML = el.name+'<br>';
        img.src = domain + el.cover_image;
        a.setAttribute('onclick',func+'(this)');
        a.setAttribute('data-id',el.id);
        a.setAttribute('data-product','demo');
        a.appendChild(img);
        insert.appendChild(a);
    });
}

//get list categories product
function get_categories_product(){
    var settings = {
        "url": setting.URL_API+"/product-categories?license_key="+setting.K_API,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };
    jQuery.ajax(settings).done(function (response) {
        let div  = document.querySelector('.filter_categories .list_categories');
        response.result.forEach(cat=>{
            let item = document.createElement('div');
            let link = document.createElement('a');
            item.className = 'item_cat';
            item.setAttribute('data-type',cat.id);
            link.className = 'item_link_cat';
            link.setAttribute('onclick','filters_templates_cat('+cat.id+')');
            link.textContent = cat.name;
            item.appendChild(link);
            div.appendChild(item);
        })
    });
}
/// start when open page
get_categories_product();


    function getElementPosition(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    function getEventLocation(element,event){
        var pos = getElementPosition(element);

        return {
            x: (event.pageX - pos.x),
            y: (event.pageY - pos.y)
        };
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    function create_selector_color(dom,img_src,type='background'){
        var div = document.querySelector(dom);
        var show = document.createElement('div');
        var canvas = document.createElement("canvas");
        div.innerHTML = '';
        show.className = 'show_color_selector';
        show.setAttribute('style','position: absolute;top: 11px;right: 1px;font-size: 0;width: 20px; height: 20px;border: 1px solid #f3efef;border-radius: 0px;');
        show.setAttribute('onclick','setBackgroundSolid(this)');
        canvas.width = 219;
        canvas.height = 150;
        if(type=='text_color'){
            canvas.width = 280;
        }
        var img = new Image();
        img.setAttribute("src", img_src);
        img.addEventListener("load", function () {
            // The image can be drawn from any source
            canvas.getContext("2d").drawImage(img, 0, 0, img.width,    img.height, 0, 0, canvas.width, canvas.height);
        });

        console.log(img.height);
        div.appendChild(canvas);
        div.appendChild(show);
        canvas.addEventListener("mousemove",function(e){
            var eventLocation = getEventLocation(this,e);
            var coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;


            // Get the data of the pixel according to the location generate by the getEventLocation function
            var context = this.getContext('2d');
            var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

            // If transparency on the image
            if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
                coord += " (Transparent color detected, cannot be converted to HEX)";
            }

            var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

            // Draw the color and coordinates.

            show.textContent =  show.style.backgroundColor = hex;
            show.setAttribute('data-color',hex);
        },false);

        canvas.addEventListener("click",function(e){
            if(type=='text_color'){
                var color = show.textContent;
                var activeObject = mainCanvas.getActiveObject(),
                    activeGroup = mainCanvas.getActiveGroup();
                if (activeObject) {
                    activeObject.setFill(color);
                    mainCanvas.renderAll();
                } else if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();

                    objectsInGroup.forEach(function (object) {
                        object.setFill(color);
                        mainCanvas.renderAll();
                    });
                }
            }else{
                mainCanvas.backgroundImage = 0;
                mainCanvas.setBackgroundColor(show.textContent, mainCanvas.renderAll.bind(mainCanvas));
            }

        })
    }


    function create_background_solid(dom,id){
        jQuery('[data-product-group="background"] > div').hide();
        var settings = {
            "url": setting.URL_API+"/background-categories?license_key="+setting.K_API+'&background_type_id='+id,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Accept": "application/json",
            },
        };
        jQuery.ajax(settings).done(function (response) {
            var div = document.querySelector(dom);
            div.innerHTML = '';
            console.log(response);
            var x = document.createElement("select");
            var data_color = document.createElement("div");
            x.setAttribute('onchange','onload_background_solid(this)');
            data_color.className ='list_item_color_solid';
            response.result.forEach(cat=>{
                var option = document.createElement("option");
                option.text = cat.name;
                option.value = cat.id;
                x.appendChild(option);
            })
            div.appendChild(x);
            div.appendChild(data_color);
            jQuery('[data-product-group="background"] [data-loop="categories"]').show();
            x.onchange();
        });
    }

function create_text_color_solid(dom){
    var settings = {
        "url": setting.URL_API+"/background-categories?license_key="+setting.K_API,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Accept": "application/json",
        },
    };
    jQuery.ajax(settings).done(function (response) {
        var div = document.querySelector(dom);
        div.innerHTML = '';
        console.log(response);
        var x = document.createElement("select");
        var data_color = document.createElement("div");
        x.setAttribute('onchange','onload_background_solid(this,`#changecolor .list_item_color_solid`,`setColorsolid(this)`)');
        data_color.className ='list_item_color_solid';
        response.result.forEach(cat=>{
            if(cat.background_type.type =='solid'){
                var option = document.createElement("option");
                option.text = cat.name;
                option.value = cat.id;
                x.appendChild(option);
            }

        })
        div.appendChild(x);
        div.appendChild(data_color);
        x.onchange();
    });
}

    function onload_background_solid(event,dom='[data-product-group="background"] [data-loop="categories"] .list_item_color_solid',func='setBackgroundSolid(this)'){
        var id = jQuery(event).val();
        console.log(id);
        var settings = {
            "url": setting.URL_API+"/backgrounds?license_key="+setting.K_API+`&background_category_id=`+id,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Accept": "application/json",
            },
        };
        jQuery.ajax(settings).done(function (response) {
            var domain = response.image_server_url+'/';
            var insert = document.querySelector(dom);
            insert.innerHTML= '';
            console.log(response);
            response.result.forEach(el=>{
                let div  = document.createElement('div');
                div.className = 'brick';
                JSON.parse(el.data).forEach(ei=>{
                    img = document.createElement('div');
                    img.setAttribute('onclick',func);
                    img.setAttribute('data-color',ei);
                    img.setAttribute('style','float: left; width: 15%; padding-bottom: 15%; margin: 0.8%; background-color: '+ei+'; cursor: pointer; border-radius: 4px;');
                    div.appendChild(img);
                })
                insert.appendChild(div);
            });

            let color = document.createElement('div');
            color.className = 'custom_color selector-color brick';
            insert.appendChild(color);
            if(func =='setColorsolid(this)'){
                create_selector_color('#changecolor .custom_color.selector-color',setting.img_src,'text_color');
            }else{
                create_selector_color('[data-product-group="background"] .custom_color.selector-color',setting.img_src);
            }


        });
    }
