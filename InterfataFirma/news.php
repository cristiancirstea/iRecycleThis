<?php
include_once './library/common.php';
include './include/header.php';
include './include/top.php';

?>
<div class="container hero-unit" id="container-news">
   <div class="container well" id="contaner-form-news">
        <form class="form-horizontal form-news" id="formNews">
            <div class="control-group header-form">
                    <span class="titlu-form" id="titlu-form-news">
                       Create News
                    </span>
                </div>
                <div class="control-group">
                  <label class="control-label" for="inputTitleNews">Title:</label>
                  <div class="controls">
                      <input class="" type="text" id="inputTitleNews" placeholder="I'm a nice Title"/>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label" for="inputDescriptionNews">Description:</label>
                  <div class="controls">
                      <textarea class="" id="inputDescriptionNews" placeholder="What happened?"></textarea>
                  </div>
                </div>     
                <div class="control-group control-buttons pull-right">
                     <button class='btn btn-primary span2 btn-fb' type='button'>Facebook!</button>
                   <button class='btn btn-warning span2 btn-save' type='button'>Save me!</button>
                </div>
              
        </form>
    </div>
</div>
<?php
include_once './include/footer.php';
?>
