<?php
include_once './library/common.php';
include './include/header.php';
include './include/top.php';

?>
<div class="container hero-unit" id="container-events">
   <div class="container well" id="contaner-form-events">
        <form class="form-horizontal form-events" id="formEvents">
            <div class="control-group header-form">
                    <span class="titlu-form" id="titlu-form-events">
                       Create Event
                    </span>
                </div>
                <div class="control-group">
                  <label class="control-label" for="inputTitleEvent">Title:</label>
                  <div class="controls">
                      <input class="" type="text" id="inputTitleEvent" placeholder="I'm a nice Title"/>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label" for="inputDescriptionEvent">Description:</label>
                  <div class="controls">
                      <textarea class="" id="inputDescriptionEvent" placeholder="What it's going to happen."></textarea>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label" for="inputLocationEvent">Location:</label>
                  <div class="controls">
                      <input class="" type="text" id="inputLocationEvent" placeholder="Where? Tell me please..."/>
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
