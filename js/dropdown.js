/*
 * Dropdown Plugin for Class-UI
 * 
 * =============================
 *           NOTES
 * =============================
 * Dropdown plugin makes use of internal status of element
 * to make decision on actions whether to dropdown menu or
 * close the menu. The status definition is
 * 
 * status :
 *		active   - dropdown is active.
 *		inactive - dropdown is inactive.
 */

(function($){

	var dropdown = {
		active : "ACTIVE",
		inactive : "INACTIVE"
	};
	$.fn.dropdown = function(options){

		return this.each(function(){

			// Button that triggers dropdown
			$this = $(this);
			$this.data("status", dropdown.inactive);
			// Target menu that is affected due to trigger.
			$menu = $("ul",$this.parent());
			$menu.hide();

			// This function is to overcome last value problem of closure
			(function($this,$menu){
				$this.click(function(){
					var status = $this.data("status");
					if (status === dropdown.inactive){
						$menu.fadeIn("slow");
						$this.data("status", dropdown.active);
						$this.addClass("active");
					}
					else{
						$menu.fadeOut("slow");
						$this.data("status", dropdown.inactive);
						$this.removeClass("active");
					}
					$this.blur();
				});
			})($this,$menu);
		});
	};
})(jQuery);