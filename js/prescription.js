$(document).ready(function() {
	
	$( ".help" ).accordion({collapsible: true, active: -1});
	
	
	$("#medication\\.medication_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
	$("#medication\\.intervention_date" ).datepicker({ dateFormat: 'dd/mm/yy' });
	$("#medication\\.birthdate" ).datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
	$('#medication\\.intervention_date').change(function(){
		var diff = $("#medication\\.intervention_date" ).datepicker('getDate') -  $("#medication\\.medication_date" ).datepicker('getDate')
		$('#medication\\.intervention_datejplus').val(-1*diff/(1000*60*60*24));
	})
		
	$('#medication\\.birth_weight, #medication\\.today_weight').change(function(){
		var diff = ($('#medication\\.today_weight').val() - $('#medication\\.birth_weight').val()).toFixed(2);
		$('#medication\\.weight_difference').val(diff);
	})
	
	
	var now = dateFormat(new Date(), 'dd/mm/yyyy');
	$("#medication\\.medication_date").val(now);
	

	$("#medication\\.birthdate, #medication\\.medication_date" ).change(function(){
		var n = new Date()
		var diff = $("#medication\\.medication_date" ).datepicker('getDate') - $("#medication\\.birthdate" ).datepicker('getDate');
		var years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
		var total_months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
		var months = total_months - years*12;
		if(months == 0 && years == 0){
			$('#medication\\.age').val(Math.floor(diff / (1000 * 60 * 60 * 24))+' jours');
		}else {
			if(years == 0){
				$('#medication\\.age').val(months+' mois');
			}
			if(years == 1){
				if(months == 0){
					$('#medication\\.age').val(years+' an ');
				}else {
					$('#medication\\.age').val(years+' an '+months+' mois');
				}
			}
			if(years > 1){
				if(months == 0){
					$('#medication\\.age').val(years+' ans ');
				}else {
					$('#medication\\.age').val(years+' ans '+months+' mois');
				}
			}
		}
	})
	
	
	$("#medication_date").hide()
	$('#posologie').find('.default').hide()
	$('#posologie').find('.precise').hide()
	$('#posologie').find('.default').each(function(){
		$(this).prepend('<div class="delete button">suppr.</div>')
	})
	$('.delete').live('click', function(evt){
		$(this).parent().remove()
	})
	$('#posologie').find('.poso').each(function(){
		$(this).html($(this).html()+'&nbsp;<span class="add button">ajouter</span>')
	})
	$('#posologie').find('.poso').click(function(evt){
		var cloned_form = $(this).next('.default').clone().show().appendTo($(this).parent())
		self.index = cloned_form.index()-1
		cloned_form.find('*[name]').each(function(){
			var left_val = $(this).attr('name').split('[')[0]
			var right_val = $(this).attr('name').split(']')[1]
			var new_val = left_val+'['+self.index+']'+right_val
			$(this).attr('name', new_val)
		})
		cloned_form.find('*[id]').each(function(){
			var left_val = $(this).attr('id').split('[')[0]
			var right_val = $(this).attr('id').split(']')[1]
			var new_val = left_val+'['+self.index+']'+right_val
			$(this).attr('id', new_val)
		})
		cloned_form.find('*[for]').each(function(){
			var left_val = $(this).attr('for').split('[')[0]
			var right_val = $(this).attr('for').split(']')[1]
			var new_val = left_val+'['+self.index+']'+right_val
			$(this).attr('for', new_val)
		})
	})
	$('select').live('change', function(evt){
		if($(this).val() == 'other'){
			$(this).next('.precise').show()
		}
		else{
			$(this).next('.precise').hide()
			$(this).next('.precise').find('input').val('')
		}
		$(this).find('option:selected').data('length')
		
		/*$(this).parent().find('.help').html($(this).find('option:selected').data('comment'))*/
	})
	
	function writeLocal() {
	  var data = $('#medication_form').serialize();
	  var d = new Date();
	  var t = d.getDate() + '/' + (d.getMonth()+1) +'/'+ d.getFullYear();
	  var itemName = document.getElementById('medication.lastname').value+' '+document.getElementById('medication.firstname').value +' ('+t+')';
	  localStorage.setItem(itemName, data);
	  updateItemsList();
	}
	
	readLocal = function(itemName) {
		resetForm()
		var test_string = localStorage.getItem(itemName);
		console.log(test_string);
		$('#posologie').find('.poso').trigger('click').trigger('click').trigger('click').trigger('click')
	
		$('#medication_form').deserialize(test_string)
	
		$('#posologie').find('.default').find('select').each(function(){
			if($(this).val() == 0 && $(this).parents('.default').index() > 1){
				$(this).parents('.default').remove()
			}
		})
		// open when select = others
		$('select').trigger('change');
	}
	
	deleteLocal = function(itemName){
		localStorage.removeItem(itemName)
		updateItemsList();
	}
	
	resetForm = function(){
		$('#posologie').find('.default').find('select').each(function(){
			if($(this).parents('.default').index() > 1){
				$(this).parents('.default').remove();	
			}
		})
		$(':input','#medication_form').not(':button, :submit, :reset, :hidden, #medication_date').val('').removeAttr('checked').removeAttr('selected');

	}

	function updateItemsList() {
		var items = localStorage.length
		$('#patients').html('')
		for (var i=0;i<items;i++) {
			$('#patients').append('<li>'+localStorage.key(i)+' <a href="javascript:readLocal(\''+localStorage.key(i)+'\')">Lire</a> <a href="javascript:deleteLocal(\''+localStorage.key(i)+'\')">Supprimer</a</li>')
		}
	}
	
	$('#save').click(function(evt){
		writeLocal()
		return false
	})
	
	$('#init').click(function(evt){
		resetForm()
		return false
	})
	
	$('#print').click(function(evt){
		
		$('#ordonance').html('')
		
		var formData = form2object('medication_form', '.', true,
			function(node){
					
					if (node.id && node.id.match(/callbackTest/)){
						return { name: node.id, value: node.innerHTML };
				}
			});
		/*console.log(formData);*/
		/*document.getElementById('ordonance').innerHTML = JSON.stringify(formData, null, '\t'); */
		for(var key in formData.medication){
			if(formData.medication[key].length && typeof(formData.medication[key]) == 'object' ){
				formData.medication[key].shift();
				//console.log(key, formData.medication[key], formData.medication[key].length)
				/*if(formData.medication[key].length == 1){
					delete formData.medication[key]
				}*/
			}
		}
		var d = new Date();
		formData.medication.now = d.getHours()+':'+d.getMinutes();
		$('#ordonance_general').tmpl(formData.medication).appendTo('#ordonance'); 
		//console.log(formData.medication)
		
		$('#ordonance').find('ul').each(function(index){
			if($(this).find('li').length == 0){
				$(this).prev('h3').remove()
				$(this).remove()
			}
			
		})
		
		
		var w = window.open('page.html', '_blank', 'width=800,height=600,resizeable,scrollbars,menubar=yes');
		w.document.write($('#ordonance').html());
		w.document.close(); // needed for chrome and safari

		
		
		return false
	})
	
	updateItemsList()
	
});