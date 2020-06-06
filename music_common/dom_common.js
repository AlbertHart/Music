console.log("IN DOM_COMMON.JS");

// the routine which uses this needs something like:
// var MDOM = new MusicDOM(); 

function MusicDOM() {

    this.show_all = false;

    this.get_caller = function() {
        error_stack2 = (new Error).stack;
        caller_stack_array = error_stack2.split("\n")
        //console.log("GET_CALLER: %s", error_stack2);
        scaller = error_stack2;
        if (caller_stack_array.length > 2)
        {
            caller_line2 = caller_stack_array[3]
            ipos1 = caller_line2.indexOf("at");     
            sname = caller_line2.substr(ipos1 + 3);
            ipos2 = sname.indexOf(" ");
            sname = sname.substr(0, ipos2);
            //console.log("SNAME: %s", sname);
            ipos3 = caller_line2.lastIndexOf(":");
            ipos4 = caller_line2.substr(0, ipos3).lastIndexOf(":");
            sline = caller_line2.substr(ipos4+1, ipos3-ipos4 - 1)
            scaller = "***Called by: " + sname + " " + sline;
        }

        return (scaller);

    }
    

    this.show_dom_element = function(parent_element, what)
    {
        if (!what)
            what = "";
        parent = parent_element.parentElement;
        if (parent)
            sparent = parent.tagName;
        else    
            sparent = "None";
        console.log("**********\nshow_dom_element: %s - %s PARENT: %s %s", parent_element.tagName, what, sparent, this.get_caller());
        console.log("type: %s is_array: %s", typeof(parent_element), Array.isArray(parent_element));
        // display first level sub-elements

        children = parent_element.children;
        //console.log("CHILDREN: %s", children.length);
        for (ii = 0; ii < children.length; ii++)
        {
            let child = children[ii];
            // console.log("CHILD %s: %s", ii, child.tagName);
            let sname = child.tagName;
            let satt = "";
            if (child.attributes)
            {
                for (let ia = 0; ia < child.attributes.length && ia < 3; ia++)
                {
                    satt += child.attributes[ia].nodeName + "=\"" + child.attributes[ia].value + "\" ";
                }
            }
            console.log("- %s %s", sname, satt);
        }
        return;
        let sub_elements = parent_element.querySelectorAll("*");
        //console.log("%s sub-elements: %s", parent_element.tagName,  sub_elements.length);
        for (ii = 0; ii < sub_elements.length; ii++)
        {
            sub_element = sub_elements[ii];
            //console.log("%s sub_element: %s ",ii, sub_element.tagName);
            this.show_dom_element_value(parent_element, sub_element.tagName, "" );
        }
    }

    this.show_dom_element_value = function(parent_element, name, sindent)
    {
        //console.log("show_dom_element_value parent_element: %s name: %s", parent_element.tagName, name);
        let sub_element = parent_element.querySelector(name);
        if (!sub_element)
        {
            console.error("Element to show not found: %s parent: %s name: %s %s", parent_element.tagName, name);
            return;
        }

        let value = sub_element.innerHTML;
        console.log("%s- %s: %s", sindent, name, value);
 
    }

    // const duration = +durationElem.innerHTML;
    this.get_dom_element_value = function(parent_element, name)
    {
        let sub_element = parent_element.querySelector(name);
        if (!sub_element)
        {
            console.error("get_dom_element_value sub_element not found: %s %s", parent_element.tagName, name);
            return("");
        }
        let value = sub_element.innerHTML;
        return(value);
    }
    this.get_dom_element_value_numeric = function(parent_element, name)
    {
        let value = this.get_dom_element_value(parent_element, name);
        let number = Number(value);
        if (number == "NaN")
            console.error("Bad Numeric Value: %s name: %s: %s", parent_element.tagName, name, value, number);
        console.log("get_dom_element_value_numeric: %s %s: value: '%s' number: %s", parent_element.tagName, name, value, number);
        return(number);
    }

     // let duration = +duration_elem.innerHTML;
     this.get_element_value = function(element)
     {
         let value = element.innerHTML;
         return(value);
     }
     this.get_element_value_numeric = function(element)
     {
         let value = this.get_element_value(element);
         let number = Number(value);
         if (number == "NaN")
         {
             console.error("Bad Numeric Value for %s: %s %s", element.tagName, value, number, getcaller());
         }
         //console.log("get_element_value_numeric: value: '%s' number: %s", value, number);
         return(number);
     }
 
     // let duration = +duration_elem.innerHTML;
     this.get_dom_element_value = function(parent_element, name, skip_error)
     {
         let sub_element = parent_element.querySelector(name);
         if (!sub_element)
         {
             if (!skip_error)
                 console.error("get_dom_element_value sub_element not found: %s %s", parent_element.tagName, name);
             return("");
         }
         let value = sub_element.innerHTML;
         return(value);
     }
     this.get_dom_element_value_numeric = function(parent_element, name, skip_error)
     {
         let value = this.get_dom_element_value(parent_element, name, skip_error);
         let number = Number(value);
         if (number == "NaN")
         {
             // always report this error
             console.error("Bad Numeric Value: %s name: %s: %s", parent_element.tagName, name, value, number);
         }
         if (this.show_output)
             console.log("get_dom_element_value_numeric: %s %s: value: '%s' number: %s", parent_element.tagName, name, value, number);
         return(number);
     }

     //step_elem.innerHTML = transposedRest.step;
    this.change_dom_element_value = function(parent_element, name, value)
    {
        if (this.show_output)
            console.log("*** change_dom_element_value: %s %s --> %s", parent_element.tagName, name, value);
        let sub_element = parent_element.querySelector(name);
        if (!sub_element)
        {
            console.error("Element to change not found: %s", name);
            //this.show_dom_element(parent_element, "PARENT_ELEMENT");
            return;
        }
        sub_element.innerHTML = value;
    }

    var element;
    // this.insert_dom_element_after(pitch_elem, "step", "alter", note.transposed.new_alter);
    this.insert_dom_element_after = function(parent_element, existing, new_mame, value)
    {
        if (this.show_output)
            console.log("*** insert_dom_element_after: parent_element: %s new_mame:  %s existing: %s --> %s", 
            parent_element.tagName, new_mame, existing, value);
        let existing_element = parent_element.querySelector(existing);
        if (!existing_element)
        {
            console.error("Element to insert after not found: %s", existing);
            //this.show_dom_element(parent_element, "PARENT_ELEMENT");
            return;
        }
    
        let new_element = document.createElementNS('', new_mame);
        new_element.innerHTML = value;
        //this.show_dom_element(new_element, "NEW ELEMENT");
        existing_element.insertAdjacentElement("afterend", new_element);
        //this.show_dom_element(parent_element, "PARENT AFTER INSERT");
        //console.log("*** innerHTML: '%s'", new_element.innerHTML);
    }

    this.remove_dom_element = function(parent_element, name)
    {
        let sub_element = parent_element.querySelector(name);
        if (!sub_element)
        {
            console.error("Element to remove not found: %s", name);
            //this.show_dom_element(parent_element, "PARENT_ELEMENT");
            return;
        }

        sub_element.remove();
        
    }

    this.show_object = function(object, what)
    {
        if (!what)
            what = "Object";
        let sout;
        if (object)
            sout = JSON.stringify(object).replace(/,"/g, "\n\"");
        else
            sout = "undefined";
        console.log("%s: %s %s", what, sout, this.get_caller());
    }

    
 

  }

  

