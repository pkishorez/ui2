/*
 * Author	: kishore
 *
 * **ABOUT**
 * 
 * =============================
 *           NOTES
 * =============================
 *
 */

(function($){
	// Validation logic goes here for each type of criteria.
	// Returns true on success and false on violation of criteria.
	var validation = {
		required : function(th){
			var json = {
				rule : "Value cannot be blank.",
				error : true
			};
			var val = $(th).val().trim();
			if (val.length === 0){
				return json;
			}
			json.error = false;
			return json;
		},
		len : function(th, args){
			var len = parseInt(args[1]);
			var json = {
				rule : "Value should be of length "+len+".",
				error : true
			};
			var val = $(th).val();
			if (val.length !== len){
				return json;
			}
			json.error = false;
			return json;
		},
		minlen : function(th, args){
			var len = parseInt(args[1]);
			var json = {
				rule : "Min len should be "+len+".",
				error : true
			};
			var val = $(th).val().trim();
			if (val.length < len){
				return json;
			}
			json.error = false;
			return json;
		},
		maxlen : function(th, args){
			var len = parseInt(args[1]);
			var json = {
				rule : "Maximum length should be "+len+".",
				error : true
			};
			var val = $(th).val().trim();
			if (val.length > len){
				return json;
			}
			json.error = false;
			return json;
		},
		num : function(th){
			var json = {
				rule : "Input should be a valid number.",
				error : true
			};
			var val = $(th).val();
			for (var j=0;j<val.length;j++){
				if (val[j]==='0' || val[j]==='1' || val[j]==='2' || val[j]==='3' || val[j]==='4' || val[j]==='5' || val[j]==='6' || val[j]==='7' || val[j]==='8' || val[j]==='9' || (val[j]=='-' && j==0));
				else {
					return json;
				}
			}
			json.error = false;
			return json;
		},
		minnum : function(th, args){
			var minnum = args[1];
			var json = {
				rule : "Number should be min "+minnum+".",
				error : true
			};
			var val = parseInt($(th).val());
			if (val<minnum){
				return json;
			}
			json.error = false;
			return true;
		},
		maxnum : function(th, args){
			var maxnum = args[1];
			var json = {
				rule : "Number should be greater than "+maxnum+".",
				error : true
			};
			var val = parseInt($(th).val());
			if (val<maxnum){
				return json;
			}
			json.error = false;
			return json;
		},
		email : function(th){
			var val = $(th).val();
		},
		url : function(th){
			var val = $(th).val();
		},
		regex : function(th){
			var json = {
				rule : "Number should be greater than "+maxnum+".",
				error : true
			};
			var regex = $(th).attr("regex").split("::");
			var expr = new RegExp(regex[0].trim(),regex[1].trim());
			var string = $(th).val().trim();
			if (expr.test(string));
			else {
				return json;
			}
			json.error = false;
			return json;
		}
	};

	// Validation for each form element. Returns success or failure, or
	// renders the error if passed the parameter.
	$.fn.validate = function(){
		validationError="";
		$this = $(this);
		var criteria = $this.attr("data-v_c").split(",");
		var success = true;
		var status = {};
		for (var j in criteria){
			var task = criteria[j].trim().split(" ");
			var constraint = task[0];
			var validate_function = validation[constraint];
			if (validate_function !== undefined){
				status = validate_function($("input,select",this)[0], task);
				if (status.error){
					success = false;
					break;
				}
			}
		}

		if (!success){
			// Render error.
			$("input,select",$this).removeClass("success").addClass("error");
			$(".status",$this).html("<i class='fa fa-times'></i> "+status.rule);
			$this.removeClass("success").addClass("error");
			return true;
		}
		else{
			$("input,select",$this).removeClass("error").addClass("success");
			$(".status",$this).html("<i class='fa fa-check'></i> "+"Value is valid.");
			$this.removeClass("error").addClass("success");
			return false;
		}
	};
	
	// Register validation.
	$.fn.registerValidation = function(){
		return this.each(function(){
			$this = $(this);
			$this.submit(function(ev){
				var error = false;
				var error_element = null;
				$("[data-v_c]",this).each(function(){
					if ($(this).validate()){
						if (!error){
							error_element = this;
						}
						error = true;
					}
				});
				if (error){
					ev.preventDefault();
					$(error_element).focus();
				}
			});
			$("[data-v_c]",$this).each(function(){
				return (function(th){
					$("input,select",th).on("change keypress keyup focus blur click",function(){
						$(th).validate();
					});
				})(this);
			});
		});
	};
})(jQuery);