

function ValidateDataLogin() {
      var input = document.getElementById("inputEmail");
	  var pass = document.getElementById("inputPassword");
	  var groupInput = document.getElementById("userPlace");
	  var groupPass = document.getElementById("passPlace");
	  var buton = document.getElementById("buton");
//	  var check = document.getElementById("chk");
	
      if (input.value === "" && pass.value === "")
      {
		groupInput.setAttribute("class", "control-group error");
		groupPass.setAttribute("class", "control-group error");
		buton.setAttribute("class", "btn btn-danger");
		container.setAttribute("id", "containerError");
		return false;
		}
	  else if (input.value === ""){
			groupInput.setAttribute("class", "control-group error");
			buton.setAttribute("class", "btn btn-danger");
			container.setAttribute("id", "containerError");
			return false;
			}
	       else if (pass.value === ""){
					groupPass.setAttribute("class", "control-group error");
					buton.setAttribute("class", "btn btn-danger");
					container.setAttribute("id", "containerError");
					return false;
				}
//	  if(check.value === "on")
//			setCookie(input.value, 100);
	  document.getElementById("formular").submit();
	  return true;			
	}


