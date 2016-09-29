$(document).ready(function(){
    $('#text').keydown(function(event){
        if(event.which === 13) {
            $('#button').click();
        }
    });
    $('#button').click(function(){
        $toAdd = $.trim($('#text').val());
        if(!$toAdd){
            $('#text:text').val('');
            return false;
        } else {
            $('.list').append(
                '<div class="list_item">'+
                '<p class="list_item-name">'+$toAdd+'</p>'+
                '</div>'
            );
            $('#text:text').val('');
        }
    });
    $(document).on('click',function(){
        $(this).parent().remove();
    });
    $('.list').sortable();
});