/*
homework 6, dynamic multiplication table
Robert Wentzell, UMass Lowell Computer Science, rwentzel@cs.uml.edu
Copyright (c) 2020 by Robert Wentzell. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by Robert Wentzell 11/12/2020
*/

function validate() {
  $("#mult_form").validate({
    rules: {
      horiz_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      horiz_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vert_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vert_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      }
    },

    // error messages
    messages: {
      horiz_start: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      },
      horiz_end: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      },
      vert_start: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      },
      vert_end: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      }
    },

    // valid form
    submitHandler: function() {
      table_calc();
      return false;
    },

    invalidHandler: function() {
      // clear
      $("#warning_msg").empty();
      $("#multiplication_table").empty();
    },

    // URL: https://stackoverflow.com/questions/3691743/jquery-validate-how-to-keep-error-messages-from-altering-the-form-disposition
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    }
  });
}

// calculates the table
function table_calc() {
  /*
      User input
      http://www.w3schools.com/js/js_comparisons.asp
  */
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  // Checks the number
  console.log("Horizontal start: ", hor_start, "Horizontal end: ", hor_end),
  console.log("Vertical start: ", vert_start, "Vertical end: ", vert_end);

  //clear
  $("#warning_msg").empty();

  // Swap beginning / ending numbers if the start is larger than the beginning.
  if (hor_start > hor_end) {
    var tmp_num = hor_start;
    hor_start = hor_end;
    hor_end = tmp_num;
  }

  // Also swap vertical beginning / ending
  if (vert_start > vert_end) {
    var tmp_num = vert_start;
    vert_start = vert_end;
    vert_end = tmp_num;
  }

  var matrix = {};

  // calculate rows and columns
  var rows = Math.abs(hor_end - hor_start);
  var columns = Math.abs(vert_end - vert_start);

  // Indexes for the 2D array.
  var horz = hor_start;
  var vert = vert_start;

  //  Calculate the multiplication table

    for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];
    for (var y = 0; y <= rows; y++) {
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    // Save
    matrix["row" + x] = tmp_arr;
    horz = hor_start;        // Reset each pass
    vert++;
  }


  // w3schools is helpful: http://www.w3schools.com/html/html_tables.asp
  // fill in the table
  var content = "";
  content += "<table>";
  content += "<tr><td></td>";

  for (var a = hor_start; a <= hor_end; a++) {
    content += "<td>" + a + "</td>";
  }
  content += "</tr>";
  var vert = vert_start;
  for (var x = 0; x <= columns; x++) {
    content += "<tr><td>" + vert + "</td>";
    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;
    content += "</tr>";
  }
  content += "</table>";

  // load
  $("#multiplication_table").html(content);
  return false;
}
