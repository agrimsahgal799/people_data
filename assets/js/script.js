
$(document).ready(function(){

	/* get the first record on the page load */	
	var record_count = 1;
	getData(record_count);

	function getData(record_count,next = false){
		$.ajax({
			type: 'POST',
			url  : 'get_data.php',
			data : {'record_count' : record_count },
			dataType: 'json',
			success : function(res){
				var person_data = res.data;
				if(person_data.length > 0){
					$('#next-person').attr('data-record',record_count);
					$('.total-showing').removeClass('p-hide');
					$('.total-showing .total-count').html(record_count);

					var item = person_data[0];
					var person_name = $.trim(item.name);
					var person_location = $.trim(item.location);

					var person_html = 
						'<div class="peoples">'+
							'<div class="columns people-count">'+record_count+'</div>'+
							'<div class="columns people-description">'+
								'<div class="description">'+
									'<div class="name des-data">'+
										'<span class="title">Name: </span>'+
										'<span class="value">'+person_name+'</span>'+
									'</div>'+
									'<div class="location des-data">'+
										'<span class="title">Location: </span>'+
										'<span class="value">'+person_location+'</span>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';

					if(next){
						$('.people-data').append(person_html);
					}
					else{
						$('.people-data').html(person_html);	
						$('#next-person').attr('data-next','true');
					}
				}
				else{
					$('#next-person').attr('data-next','false');
					$('.total-showing').addClass('p-hide');
					alert('No records were found.');
					return false;
				}
			}
		});
	}

	$('#next-person').on('click', function(){
		var is_next = $('#next-person').attr('data-next');
		if(is_next == 'false'){
			alert('No more people!');
			return false;
		}
		else{
			var current_record_count = $('#next-person').attr('data-record');
			var set_record_count = parseInt(current_record_count) + 1;
			getData(set_record_count,true);
		}
	});
});

$('.arrow').on('click',function(){
	$("html, body").animate({ scrollTop: 0 }, "fast");
});