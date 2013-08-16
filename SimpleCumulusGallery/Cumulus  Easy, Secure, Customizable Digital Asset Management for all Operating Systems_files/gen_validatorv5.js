/*
-------------------------------------------------------------------------
	                    JavaScript Form Validator 
                                Version 2.0.2
	Copyright 2003 JavaScript-coder.com. All rights reserved.
	You use this script in your Web pages, provided these opening credit
    lines are kept intact.
	The Form validation script is distributed free from JavaScript-Coder.com

	You may please add a link to JavaScript-Coder.com, 
	making it easy for others to find this script.
	Checkout the Give a link and Get a link page:
	http://www.javascript-coder.com/links/how-to-link.php

    You may not reprint or redistribute this code without permission from 
    JavaScript-Coder.com.
	
	JavaScript Coder
	It precisely codes what you imagine!
	Grab your copy here:
		http://www.javascript-coder.com/
    -------------------------------------------------------------------------  
Version 3.0 - New method addValidationDependent(itemname,dependentitemname,dependentitemvalues,descriptor,errstr)
dependentitemname is the name of the item on which the validation is dependent
dependentitemvalues is a comma separated list of values. This validation will only take place if the dependent item has one of those values
Version 3.1 - Handles radio button dependent verification on addValidationDependent. Does not handle checkboxes
Version 3.2 - Added new condition "mustselect". Item must be a multiselect list. Validates ok if at least one is selected
version 3.3 - addvalidationdependent now handles single select list and 'not' as first option to validate only if not equal to any of the values specified

Note, this version does not have special handling for manticore
Release date 4/30/07

Note, this version has special handling for Salesforce adwords tracking hooks
Release date 7/13/08

*/
function Validator(frmname)
{
   
  this.formobj=document.forms[frmname];
	if(!this.formobj)
	{
	  alert("BUG: couldnot get Form object "+frmname);
		return;
	}
	if(this.formobj.onsubmit)
	{
	 this.formobj.old_onsubmit = this.formobj.onsubmit;
	 this.formobj.onsubmit=null;
	}
	else
	{
	 this.formobj.old_onsubmit = null;
	}
	this.formobj.onsubmit=form_submit_handler;
	this.formobj.validationscriptobject = this;
	this.addValidation = add_validation;
	this.addValidationDependent = add_validationdependent;
	this.setAddnlValidationFunction=set_addnl_vfunction;
	this.clearAllValidations = clear_all_validations;
	this.AppendError = append_error;
	this.errors = "";
}

function append_error(errormessage)
{
	this.errors = this.errors + errormessage + "\n";
}


function set_addnl_vfunction(functionname)
{
  this.formobj.addnlvalidation = functionname;
}
function clear_all_validations()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		this.formobj.elements[itr].validationset = null;
	}
}

function eventTrigger (e) {
    if (! e) e = event;
    return e.target || e.srcElement || e;
}

function form_submit_handler(ev)
{
    var theform = eventTrigger(ev);

	var retval = true;
	for(var itr=0;itr < theform.elements.length;itr++)
	{
		if(theform.elements[itr].validationset &&
	   !theform.elements[itr].validationset.validate())
		{
		  retval =false;
		}
	}
	if(theform.addnlvalidation)
	{
	  str =" var ret = "+theform.addnlvalidation+"()";
	  eval(str);
      if(!ret) retval = false;
	}
	if(!retval) alert(theform.validationscriptobject.errors);
	theform.validationscriptobject.errors = "";
	return retval;
}
function add_validation(itemname,descriptor,errstr)
{
  if(!this.formobj)
	{
	  alert("BUG: the form object is not set properly");
		return;
	}//if
	var itemobj = this.formobj[itemname];
  if(!itemobj)
	{
	  alert("BUG: Couldnot get the input object named: "+itemname);
		return;
	}
	if(!itemobj.validationset)
	{
	  itemobj.validationset = new ValidationSet(itemobj, this);
	}
  itemobj.validationset.add(descriptor,errstr);
}

function add_validationdependent(itemname,dependentitemname,dependentitemvalues,descriptor,errstr)
{
  if(!this.formobj)
	{
	  alert("BUG: the form object is not set properly");
		return;
	}//if
	var itemobj = this.formobj[itemname];
  if(!itemobj)
	{
	  alert("BUG: Couldnot get the input object named: "+itemname);
		return;
	}
	if(!itemobj.validationset)
	{
	  itemobj.validationset = new ValidationSet(itemobj, this);
	}
  newobjindex = itemobj.validationset.vSet.length;
  itemobj.validationset.add(descriptor,errstr);
  // Add the dependent info if present
  itemobj.validationset.vSet[newobjindex].dependentitem = this.formobj[dependentitemname];
  itemobj.validationset.vSet[newobjindex].dependentvalues = dependentitemvalues.split(",");
}


function ValidationDesc(inputitem,desc,error,sourceform)
{
  this.desc=desc;
	this.error=error;
	this.itemobj = inputitem;
	this.validate=vdesc_validate;
	this.itemsource = sourceform;
}
function vdesc_validate()
{
 	if(typeof(this.dependentitem)=="undefined") {
		if(!V2validateData(this.desc,this.itemobj,this.error,this.itemsource))
		{
			this.itemobj.focus();
			return false;
		}
	} else {
		var dependentvaluetouse;
		if(typeof(this.dependentitem)=="object"  && typeof(this.dependentitem.length)!="undefined")
		{
			if(this.dependentitem.selectedIndex || typeof(this.dependentitem.selectedIndex)!="undefined")
			{
				dependentvaluetouse = this.dependentitem.value;
			}
			else
			{
				for(o in this.dependentitem)
				{	
					if(typeof(this.dependentitem[o].checked)=="boolean" && (this.dependentitem[o].checked))
					{
						dependentvaluetouse = this.dependentitem[o].value;
						break;
					}
				}
			}
		}
		else 
		{
			dependentvaluetouse = this.dependentitem.value;
		}
		if(this.dependentvalues[0]=='not')
		{
			var dovalidate = true;
			var v;
			for (v =1; v< this.dependentvalues.length; v+=1) 
			{
				if(dependentvaluetouse == this.dependentvalues[v]) {
					dovalidate = false;
					}
			}
			if(dovalidate && !V2validateData(this.desc,this.itemobj,this.error,this.itemsource))
				{
					this.itemobj.focus();
					return false;
				}
			return true;
		}
		else
		{
			
			for (v in this.dependentvalues) {
				if(dependentvaluetouse == this.dependentvalues[v]) {
					if(!V2validateData(this.desc,this.itemobj,this.error,this.itemsource))
					{
						this.itemobj.focus();
						return false;
					}
					return true;
				}
			}
		}
	}
	
 return true;
}
function ValidationSet(inputitem, sourceform)
{
    this.vSet=new Array();
	this.add= add_validationdesc;
	this.validate= vset_validate;
	this.itemobj = inputitem;
	this.itemsource = sourceform;
}
function add_validationdesc(desc,error)
{
  this.vSet[this.vSet.length]= 
	  new ValidationDesc(this.itemobj,desc,error,this.itemsource);
}
function vset_validate()
{
   for(var itr=0;itr<this.vSet.length;itr++)
	 {
	   if(!this.vSet[itr].validate())
		 {
		   return false;
		 }
	 }
	 return true;
}
function validateEmailv2(email)
{
// a very simple email validation checking. 
// you can add more complex email checking if it helps 
    if(email.length <= 0)
	{
	  return true;
	}
    var splitted = email.match("^(.+)@(.+)$");
    if(splitted == null) return false;
    if(splitted[1] != null )
    {
		//var regexp_user=/^\"?[\w-_\.]*\"?$/; original
      var regexp_user=/^[\w-_\.]+(\+[\w-_\.]+)?$/;  // modified to allow + email format
      if(splitted[1].match(regexp_user) == null) return false;
    }
    if(splitted[2] != null)
    {

      var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
      if(splitted[2].match(regexp_domain) == null) 
      {
	    var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
	    if(splitted[2].match(regexp_ip) == null) return false;
      }// if
      return true;
    }
return false;
}
function V2validateData(strValidateStr,objValue,strError,thisform) 
{ 
    var epos = strValidateStr.search("="); 
    var  command  = ""; 
    var  cmdvalue = ""; 
    if(epos >= 0) 
    { 
     command  = strValidateStr.substring(0,epos); 
     cmdvalue = strValidateStr.substr(epos+1); 
    } 
    else 
    { 
     command = strValidateStr; 
    } 

    switch(command) 
    { 
        case "req": 
        case "required": 
         { 
           if(eval(objValue.value.length) == 0) 
           { 
              if(!strError || strError.length ==0) 
              { 
                strError = objValue.name + " : Required Field"; 
              }//if 
              thisform.AppendError(strError); 
              return false; 
           }//if 
           break;             
         }//case required 
        case "maxlength": 
        case "maxlen": 
          { 
             if(eval(objValue.value.length) >  eval(cmdvalue)) 
             { 
               if(!strError || strError.length ==0) 
               { 
                 strError = objValue.name + " : "+cmdvalue+" characters maximum "; 
               }//if 
               thisform.AppendError(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               return false; 
             }//if 
             break; 
          }//case maxlen 
        case "minlength": 
        case "minlen": 
           { 
             if(eval(objValue.value.length) <  eval(cmdvalue)) 
             { 
               if(!strError || strError.length ==0) 
               { 
                 strError = objValue.name + " : " + cmdvalue + " characters minimum  "; 
               }//if               
               thisform.AppendError(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               return false;                 
             }//if 
             break; 
            }//case minlen 
        case "alnum": 
        case "alphanumeric": 
           { 
              var charpos = objValue.value.search("[^A-Za-z0-9]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
               if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": Only alpha-numeric characters allowed "; 
                }//if 
                thisform.AppendError(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 
              break; 
           }//case alphanumeric 
        case "num": 
        case "numeric": 
           { 
              var charpos = objValue.value.search("[^0-9]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
                if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": Only digits allowed "; 
                }//if               
                thisform.AppendError(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 
              break;               
           }//numeric 
        case "alphabetic": 
        case "alpha": 
           { 
              var charpos = objValue.value.search("[^A-Za-z]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
                  if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": Only alphabetic characters allowed "; 
                }//if                             
                thisform.AppendError(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 
              break; 
           }//alpha 
		case "alnumhyphen":
			{
              var charpos = objValue.value.search("[^A-Za-z0-9\-_]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
                  if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": characters allowed are A-Z,a-z,0-9,- and _"; 
                }//if                             
                thisform.AppendError(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 			
			break;
			}
        case "email": 
          { 
               if(!validateEmailv2(objValue.value)) 
               { 
                 if(!strError || strError.length ==0) 
                 { 
                    strError = objValue.name+": Enter a valid Email address "; 
                 }//if                                               
                 thisform.AppendError(strError); 
                 return false; 
               }//if 
           break; 
          }//case email 
        case "lt": 
        case "lessthan": 
         { 
            if(isNaN(objValue.value)) 
            { 
              thisform.AppendError(objValue.name+": Should be a number "); 
              return false; 
            }//if 
            if(eval(objValue.value) >=  eval(cmdvalue)) 
            { 
              if(!strError || strError.length ==0) 
              { 
                strError = objValue.name + " : value should be less than "+ cmdvalue; 
              }//if               
              thisform.AppendError(strError); 
              return false;                 
             }//if             
            break; 
         }//case lessthan 
        case "gt": 
        case "greaterthan": 
         { 
            if(isNaN(objValue.value)) 
            { 
              thisform.AppendError(objValue.name+": Should be a number "); 
              return false; 
            }//if 
             if(eval(objValue.value) <=  eval(cmdvalue)) 
             { 
               if(!strError || strError.length ==0) 
               { 
                 strError = objValue.name + " : value should be greater than "+ cmdvalue; 
               }//if               
               thisform.AppendError(strError); 
               return false;                 
             }//if             
            break; 
         }//case greaterthan 
        case "regexp": 
         { 
		 	if(objValue.value.length > 0)
			{
	            if(!objValue.value.match(cmdvalue)) 
	            { 
	              if(!strError || strError.length ==0) 
	              { 
	                strError = objValue.name+": Invalid characters found "; 
	              }//if                                                               
	              thisform.AppendError(strError); 
	              return false;                   
	            }//if 
			}
           break; 
         }//case regexp 
        case "dontselect": 
         { 
            if(objValue.selectedIndex == null) 
            { 
              alert("BUG: dontselect command for non-select Item"); 
              return false; 
            } 
            if(objValue.selectedIndex == eval(cmdvalue)) 
            { 
             if(!strError || strError.length ==0) 
              { 
              strError = objValue.name+": Please Select one option "; 
              }//if                                                               
              thisform.AppendError(strError); 
              return false;                                   
             } 
             break; 
         }//case dontselect 
        case "mustselect": 
         { 
            if(objValue.length == 0 || typeof(objValue[0])!="object") 
            { 
              alert("BUG: dontselect command for non-select Item"); 
              return false; 
            } 
            var i;
            for(i=0; i<objValue.length; i++) {
                if(objValue[i].checked || objValue[i].selected) {
                    return true;
                }
             }
             if(!strError || strError.length ==0) 
              { 
              strError = objValue.name+": Please Select one option "; 
              }//if                                                               
            thisform.AppendError(strError); 
            return false;                                   

         }//case mustselect 
    }//switch 
    return true; 
}
/*
	Copyright 2003 JavaScript-coder.com. All rights reserved.
*/