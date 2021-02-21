<div class="tool-icon-left">
    <div class="scrollmenu-left">
<a title="Set of Product" class="tablink" onclick="openPage('template')" id="defaultOpen"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/template.svg" width="18px"></a>
<a title="Backgrounds" class="tablink" onclick="openPage('background')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/background.svg" width="19px"></a>
<a title="Photos" class="tablink" onclick="openPage('photo')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/photo.svg" width="19px"></a>
<a title="Elements" class="tablink" onclick="openPage('element')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/element.svg" width="19px"></a>
<a title="Texts" class="tablink" onclick="openPage('text')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/text.svg" width="19px"></a>
<a title="Symbols" class="tablink" onclick="openPage('brand')"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/brand.svg" width="19px"></a>
    </div>
<div class="ajax-loader" style="display: none; width:60px;">
    <img src="<?php echo KGDO_CD_URL; ?>/images/loading-gif.svg" />
</div>
<!--List product admin-->
<div id="template" class="tabcontent">
  <p>Set of Product</p>
    <input type="text" id="templatemessage" value="" placeholder="" data-id="" onkeyup="search_template(this)" autocomplete="off">
    <div class="sidebarpost"></div>
</div>
<!---Backgrounds-->
<div id="background" class="tabcontent" data-product-group="background" data-slug="/background-types">
  <p>Backgrounds</p>
    <div data-loop="type" data-slug="/background-categories" data-cat="background_type_id">
        <div class="content"></div>
    </div>
    <div data-loop="categories" data-slug="/backgrounds" data-cat="background_category_id">
        <a href='javascript:back_step(`[data-product-group="background"] > div`,`[data-product-group="background"] [data-loop="type"]`);' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
    <div data-loop="list_item" data-func="setBackgroundSolid">
        <a href='javascript:back_step(`[data-product-group="background"] > div`,`[data-product-group="background"] [data-loop="categories"]`)' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
</div>

<div id="photo" class="tabcontent" data-product-group="photo" data-slug="/photo-types">
  <p>Photos</p>
    <div data-loop="type" data-slug="/photo-categories" data-cat="photo_type_id">
        <div class="content"></div>
    </div>
    <div data-loop="categories" data-slug="/photos" data-cat="photo_category_id">
        <a href='javascript:back_step(`[data-product-group="photo"] > div`,`[data-product-group="photo"] [data-loop="type"]`);' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
    <div data-loop="list_item" data-func="show_image_upsplash_photo">
        <a href='javascript:back_step(`[data-product-group="photo"] > div`,`[data-product-group="photo"] [data-loop="categories"]`)' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
</div>

<div id="element" class="tabcontent" data-product-group="element" data-slug="/element-types">
  <label>Elements</label>
    <div data-loop="type" data-slug="/element-categories" data-cat="element_type_id">
        <div class="content"></div>
    </div>
    <div data-loop="categories" data-slug="/elements" data-cat="element_category_id">
        <a href='javascript:back_step(`[data-product-group="element"] > div`,`[data-product-group="element"] [data-loop="type"]`);' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
    <div data-loop="list_item" data-func="show_image_upsplash">
        <a href='javascript:back_step(`[data-product-group="element"] > div`,`[data-product-group="element"] [data-loop="categories"]`)' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
</div>

<div id="text" class="tabcontent" data-product-group="text" data-slug="/text-types">
  <label>Texts</label>
    <br>Basic Text<br>
    <a href="javascript:{}" data-text="text" id="addtext"><h3>Add a short text</h3></a>
    <a href="javascript:{}" data-text="textbox" id="addtextbox"><h4>Add a paragraph</h4></a>
    <div data-loop="type" data-slug="/text-categories" data-cat="text_type_id">
        <div class="content"></div>
    </div>
    <div data-loop="categories" data-slug="/texts" data-cat="text_category_id">
        <a href='javascript:back_step(`[data-product-group="text"] > div`,`[data-product-group="text"] [data-loop="type"]`);' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
    <div data-loop="list_item" data-func="add_text_detail">
        <a href='javascript:back_step(`[data-product-group="text"] > div`,`[data-product-group="text"] [data-loop="categories"]`)' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
</div>

<div id="brand" class="tabcontent" data-product-group="symbol" data-slug="/symbol-types">
  <label>Symbols</label>
  <div data-loop="type" data-slug="/symbol-categories" data-cat="symbol_type_id">
        <div class="content"></div>
    </div>
    <div data-loop="categories" data-slug="/symbols" data-cat="symbol_category_id">
        <a href='javascript:back_step(`[data-product-group="symbol"] > div`,`[data-product-group="symbol"] [data-loop="type"]`);' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
    <div data-loop="list_item" data-func="add_element_detail">
        <a href='javascript:back_step(`[data-product-group="symbol"] > div`,`[data-product-group="symbol"] [data-loop="categories"]`)' class="back_step"><img src="<?php echo KGDO_CD_URL; ?>/images/tools/back.svg"></a>
        <div class="content"></div>
    </div>
    </div>
</div>

<script>
function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
 let tab =  document.getElementById(pageName);
    tab.style.display = "block";
  let slug = tab.getAttribute('data-slug');
  let type = tab.getAttribute('data-product-group');
    if(slug)load_data_type(slug,type);
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
</script>
