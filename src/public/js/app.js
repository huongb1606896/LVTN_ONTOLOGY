$(document).ready(function() {
  
    
    
  //bắt sự kiện select multi checkbox
  $('#dauhieubentrong').multiselect({
    onChange: function() {
      let vitri_trong = $('#dauhieubentrong').val()
      vitri_trong.length === 0 
      ?  $('#addTrieuchungtrong').empty()
      : 
      $.ajax({
        type: 'GET',
        dataType: "json",
        url: '/gettrieuchung/trieuchungtrong',
        data:{dauhieu_trong: vitri_trong},
        success: function(data) {
          //console.log(data)
         
            // console.log(mapData )
          $('#addTrieuchungtrong').empty();
          data.map((item,key)=>{
            
            let tentt = item.ten_trieuchungtrong.value;         
            item.hinhtrieuchung 
            ?
            $("#addTrieuchungtrong")
            .append(`<img  style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1609169770/trieuchung/${item.hinhtrieuchung.value}.jpg"  >`)
            .append(`<input class='ads_Checkbox ml-3 mr-2' type="checkbox" id="${key}" name="interest" value="${tentt}">`)
            .append(`<label for="${key}" style="white-space: normal">${tentt}</label></div>`)
            .append(`<br>`)
            :
            $("#addTrieuchungtrong")
            .append(`<img  style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1609254603/trieuchung/none.png"  >`)
            .append(`<input class='ads_Checkbox ml-3 mr-2' type="checkbox"  id="${key}" name="interest" value="${tentt}">`)
            .append(`<label for="${key}" style="white-space: normal">${tentt}</label></div>`)
            .append(`<br>`)
          })
      }
      });
    }
  });

  //bắt sự kiện multiple checkbox2
  $('#dauhieubenngoai').multiselect({
    onChange: function() {
      let vitri_ngoai = $('#dauhieubenngoai').val();
      vitri_ngoai.length === 0 
      ?  $('#addTrieuchungngoai').empty()
      : 
      
      $.ajax({
        type: 'GET',
        url: '/gettrieuchung/trieuchungngoai',
        data:{dauhieu_ngoai: vitri_ngoai},
        success: function(data) {
          // var mapData = $.map(data, function(n,i){
          //   return [n.ten_trieuchungngoai.value]
          // })  
            // console.log(mapData )
          $('#addTrieuchungngoai').empty();
          data.map((item,key)=>{

            // $("#addTrieuchungngoai")
            // .append(`<input class='ads_Checkbox ml-3 mr-2' type="checkbox" id="${key}" name="interest" value="${item2}">`)
            // .append(`<label for="${item2}">${item2}</label></div>`)
            // .append(`<br>`);
            let tenttn = item.ten_trieuchungngoai.value;         
            item.hinhtrieuchung 
            ?
            $("#addTrieuchungngoai")
            .append(`<img  style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1609169770/trieuchung/${item.hinhtrieuchung.value}.jpg"  >`)
            .append(`<input class='ads_Checkbox ml-3 mr-2' type="checkbox" id="${key}" name="interest" value="${tenttn}">`)
            .append(`<label for="${key}" style="white-space: normal">${tenttn}</label></div>`)
            .append(`<br>`)
            :
            $("#addTrieuchungngoai")
            .append(`<img  style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1609254603/trieuchung/none.png"  >`)
            .append(`<input class='ads_Checkbox ml-3 mr-2' type="checkbox"  id="${key}" name="interest" value="${tenttn}">`)
            .append(`<label for="${key}" style="white-space: normal">${tenttn}</label></div>`)
            .append(`<br>`)
          })
      }
      });
    }
  });
  // choose check box get value benh
 

  // choose check box get value benh
  
$('#addTrieuchungngoai').on('click','.ads_Checkbox',()=>{
  var val =[]
  $('.ads_Checkbox:checked').each(function() {
     val.push($(this).val())
   
})
val.length === 0 
      ?  $('#addBenh').empty()
      : 
$.ajax({
  type: 'GET',
  url: '/gettrieuchung/ttngoai',
  data:{trieuchungngoai: val},
  success: function(data) {
    // console.log(data)
    //  console.log(JSON.stringify(data));
    $('#addBenh').empty();
    data.map((item,key)=>{
      let tenbenh = item.ten_trieuchung; 
      let public_id = item.hinh_anh; 
      let tyle = item.value;
    
      $("#addBenh")

     
        .append(`<img  style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1607843860/fish/${public_id}.png"  >`)
        .append(`<input class='ads_Checkboxbenh' type="radio" name="benh" value="${tenbenh}">`)
      
        .append(`<a href="./infott/${tenbenh}" target="_blank" style="white-space: normal" class="tenbenh ">${tenbenh}</a>`)
        .append(`<div class="progress md-progress" style="height: 20px">
        <div class="progress-bar" role="progressbar" style="width: ${tyle}%; height: 20px" aria-valuenow="${tyle}%" aria-valuemin="0" aria-valuemax="100">${tyle}%</div></div>`)

       
        .append(`<br>`);

    });
}
});
})
// end check box benh

// choose check box get value benh trong

$('#addTrieuchungtrong').on('click','.ads_Checkbox',()=>{
  var val =[]
  $('.ads_Checkbox:checked').each(function() {
     val.push($(this).val())
    //  console.log(val)
})

val.length === 0 
      ?  $('#addBenh').empty()
      : 
$.ajax({
  type: 'GET',
  url: '/gettrieuchung/tttrong',
  data:{trieuchungtrong: val},
  success: function(data) {
    // console.log(data)
    //  console.log(JSON.stringify(data));
    $('#addBenh').empty();
    data.map((item,key)=>{
      let tenbenh = item.ten_trieuchung; 
      let public_id = item.hinh_anh; 
      let tyle = item.value;
      
      $("#addBenh")
      // .append(`<span class="pl-2 pr-2" >${tyle}%</span>`)
      .append(`<img style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1607843860/fish/${public_id}.png" >`)
      .append(`<input class='ads_Checkboxbenh' type="radio" id="${key}" name="benh" value="${tenbenh}">`)
      // .append(`<label for="${key}">${tenbenh}</a></label></div>`)
      .append(`<a href="./infott/${tenbenh}" target="_blank" style="white-space: normal" class="tenbenh">${tenbenh}</a>`)
      .append(`<div class="progress md-progress" style="height: 20px">
      <div class="progress-bar" role="progressbar" style="width: ${tyle}%; height: 20px" aria-valuenow="${tyle}%" aria-valuemin="0" aria-valuemax="100">${tyle}%</div></div>`)

     
      .append(`<br>`);

    });
}
});
})
// end check box benh
//
//
//
//
//
//
//
//
//

//check box trang thai
$('#checkboxes').on('click','.ads_Checkbox',()=>{
  var val =[]
  $('.ads_Checkbox:checked').each(function() {
     val.push($(this).val())
     console.log(val)
})

val.length === 0 
      ?  $('#addBenh').empty()
      : 
$.ajax({
  type: 'GET',
  url: '/gettrieuchung/trangthai',
  data:{trangthai: val},
  success: function(data) {
    // console.log('success')
    console.log(data)
    //  console.log(JSON.stringify(data));
    $('#addBenh').empty();
    data.map((item,key)=>{
      let tenbenh = item.ten_trieuchung; 
      let public_id = item.hinh_anh; 
      let tyle = item.value;
      
      $("#addBenh")
      // .append(`<span class="pl-2 pr-2" >${tyle}%</span>`)
      .append(`<img style = "width:80px; height:50px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1607843860/fish/${public_id}.png" >`)
      .append(`<input class='ads_Checkboxbenh' type="radio"  name="benh" value="${tenbenh}">`)
      // .append(`<label for="${key}">${tenbenh}</a></label></div>`)
      .append(`<a href="./infott/${tenbenh}" target="_blank" style="white-space: normal" class="tenbenh">${tenbenh}</a>`)
      .append(`<div class="progress md-progress" style="height: 20px">
      <div class="progress-bar" role="progressbar" style="width: ${tyle}%; height: 20px" aria-valuenow="${tyle}%" aria-valuemin="0" aria-valuemax="100">${tyle}%</div></div>`)

     
      .append(`<br>`);

    });
}
});
})
//end check box trangg thai
// start checkbox benh => info benh
$('#addBenh').on('click','.ads_Checkboxbenh',()=>{
  var val =[]
  
  $('.ads_Checkboxbenh:checked').each(function() {
     val.push($(this).val())
    //  console.log(val)
})

val.length === 0 
      ?  $('#thongtinBenh').empty()
      : 
$.ajax({
  type: 'GET',
  url: '/gettrieuchung/thongtinbenh',
  data:{tenbenh: val},
  success: function(data) {
    // console.log('success')
    // console.log(data)
   
    let chuan_doan = data.chuan_Doan;
    let dieu_tri = data.dieutri;
    let hinh_anh = data.imgfish;
    let nguyen_nhan = data.nguyen_Nhan;
    let phan_bo = data.phan_Bo;
    let phong_chong = data.phongchong;
    let ten_thuoc = data.tenthuoc;
    let trieu_chung = data.ten_trieu_chung;
  
    //  console.log(JSON.stringify(data));
    $('#thongtinBenh').empty();
    hinh_anh.map((item,key)=>{
      let ten_benh = item.ten_benh.value;
      let public_id = item.hinhanh.value;
      
      $("#thongtinBenh")
      .append(`<div class="thongtinBenh__tieude">THÔNG TIN BỆNH</div>`)
      .append(`<div class="thongtinBenh__ten">${ten_benh}</div>`)
      .append(`<img class= "imgclass "style = "width:280px; height:200px; padding:2px" src="https://res.cloudinary.com/dh-can-tho/image/upload/v1607843860/fish/${public_id}.png" >`)
 
    });
    nguyen_nhan.map((item,key)=>{
     
      let nguyenNhan = item.nguyen_nhan.value;
      $("#thongtinBenh")
      .append(`<div class="thongtinBenh__tacnhan">Tác nhân gây bệnh</div>`)
      .append(`<div class="ml-3">${nguyenNhan}</div>`)
    });
    $("#thongtinBenh")
    .append(`<div class="thongtinBenh__trieuchung">Triệu chứng</div>`)
    trieu_chung.map((item,key)=>{
      let trieuchung = item.ten_trieu_chung.value;
      $("#thongtinBenh")
      // .append(`<div class="thongtinBenh__trieuchung">Triệu chứng</div>`)
      .append(`<div class="ml-3">${trieuchung}</div>`)
    
    });
    chuan_doan.map((item,key)=>{
      let chuandoan = item.chuan_doan.value;
      $("#thongtinBenh")
      .append(`<div class="thongtinBenh__chuandoan">Cách chuẩn đoán bệnh</div>`)
      .append(`<div class="ml-3">${chuandoan}</div>`)
    });
    phan_bo.map((item,key)=>{
      let phanbo = item.phan_bo.value;
      $("#thongtinBenh")
      .append(`<div class="thongtinBenh__phanbo">Bệnh phân bố ở?</div>`)
      .append(`<div class="ml-3">${phanbo}</div>`)
    });
    $("#thongtinBenh")
    .append(`<div class="thongtinBenh__phongchong">Biện pháp phòng chống</div>`)
    phong_chong.map((item,key)=>{
      let phongchong = item.duoc_phong_chong.value;
      $("#thongtinBenh")
      // .append(`<div class="thongtinBenh__phongchong">Biện pháp phòng chống</div>`)
      .append(`<div class="ml-3">${phongchong}</div>`)
    });
    $("#thongtinBenh")
      .append(`<div class="thongtinBenh__dieutri">Cách điều trị</div>`)
    dieu_tri.map((item,key)=>{
      let dieutri = item.duoc_dieu_tri.value;
      $("#thongtinBenh")
      // .append(`<div class="thongtinBenh__dieutri">Cách điều trị</div>`)
      .append(`<div class="ml-3">${dieutri}</div>`)
    });
    ten_thuoc.map((item,key)=>{
      let tenthuoc = item.ten_thuoc.value;
      $("#thongtinBenh")
      .append(`<div class="thongtinBenh__thuoc">Thuốc điều trị</div>`)
      .append(`<div class="ml-3">${tenthuoc}</div>`)
    });
    
    
}
});
})
//end info benh

// // seleccheckbox
//   var expanded = false;

// function showCheckboxes() {
//   var checkboxes = document.getElementById("checkboxes");
//   if (!expanded) {
//     checkboxes.style.display = "block";
//     expanded = true;
//   } else {
//     checkboxes.style.display = "none";
//     expanded = false;
//   }
// }

// // end seleccheckbox
// seleccheckbox
var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

// end seleccheckbox

//su kien check trieu chung show benh

// end su kien show benh
  // let vitri_ngoai = $('#example-getting-started2').multiselect();
  // vitri_ngoai.on('change', function(){
  //   console.log(vitri_ngoai.val());
  // });
  // end multiple checkbox
  // $('.mdb-select').materialSelect();
  // $("#addTrieuchung").click(function(){
  //  let trieuchung = $("#idTrieuchung").val();
  //  $.ajax({
  //       type: 'GET',
  //       url: '/capnhat/trieuchung',
  //       data:{ten_trieuchung: trieuchung}
  //   });
  //   });
    // $('select').on('change', function() {
    //   let vitri = this.value;
    //   $.ajax({
    //     type: 'GET',
    //     url: '/capnhat/trieuchung',
    //     data:{vi_tri: vitri}
    // });
    // });

    //edittable
    $('#btnSubmit').change(function(){
      if(this.checked){
        let trieuchung = $('#trieuchung').val();
        // Object.entries(trieuchung);
        // console.log(trieuchung)
      }
    
    });
    //

    //
  // tra cuu thuoc
   
      $('#dt-filter-select').dataTable({
    
        initComplete: function () {
          this.api().columns().every( function () {
              var column = this;
              var select = $('<select  class="browser-default custom-select form-control-sm"><option value="" selected>Xem tất cả</option></select>')
                  .appendTo( $(column.header()) )
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );
    
                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                  } );
    
              column.data().unique().sort().each( function ( d, j ) {
                  select.append( '<option value="'+d+'">'+d+'</option>' )
              } );
          } );
      }
      });
  
    //end datâtble tra cuu thuoc

 
  // init Masonry
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
  
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });

  
 


});
$('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i=0;i<4;i++) {
    next=next.next();
    if (!next.length) {
      next=$(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});


// seleccheckbox
var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
// end seleccheckbox

function someFunction() {
  setTimeout(function () {
  $('#id-your-stepper').nextStep();
  }, 2000);
  }
