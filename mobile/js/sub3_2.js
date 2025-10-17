$('#tab8').fadeIn('slow');
$('#user-level').on('change',function(){
    var val = $(this).val();

    $('.event_box').hide();
    $('#tab'+val).fadeIn('slow');
    
})