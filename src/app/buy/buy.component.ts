import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HouseService } from '../house.service';
import * as mapboxgl from 'mapbox-gl';
import { DataService } from "./../data.service";
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

	beds:number=1; 
	baths:number=1; 
	plots:number = 10000;	
	math:any = Math;

	hcover:string = "";
	house_price = "";
	house_address:string = "";
	house_year:string = "";
	plot_size:string = "";
	no_of_bathroom:string = "";
	no_of_bed:string = '';
	overview:string = '';
	total_view:string = "";
	days_on_web:string = "";
	g_feture:string[] = [];
	ac:boolean = false;
	garage:boolean = false;
	swimming:boolean = false;
	pet:boolean = false;
	gym:boolean = false;
	elevator:boolean = false;
	indoor_game:boolean = false;
	json_houselist:string;
	obj_houselist:any;
	  shouse:any;
	houseservice:HouseService = null;
	  constructor(houseservice:HouseService) { 
		this.houseservice = houseservice;
		this.json_houselist = houseservice.getHouses();
		this.obj_houselist = JSON.parse(this.json_houselist);  
		this.shouse = this.obj_houselist.find(function(){return 1;}); 
	}

	map:any;
	
   house_click(house):void {						
	   
    var hid = house.id;
    var house_list = this.obj_houselist;
    
    this.shouse = house_list.find(function(house){			
      return house["hid"].toString()==hid.toString();
    });
    console.log(this.shouse);
   // $("#main-house-thumbnail").attr("src",this.shouse\["photos"][0]);
	this.hcover = this.shouse["photos"][0];
    var inner_carosal_active = '<div class="carousel-item active">'
              +'<a href="../../assets/'+this.shouse["photos"][0]+'" target="_blank"><img src="../../assets/'+this.shouse["photos"][0]+'"'
              +'class="img-fluid "></a>'
              +'</div>';
    var inner_carosal = " " +inner_carosal_active;
    for(let i=1;i<this.shouse["photos"].length;i++)
    {
      inner_carosal += '<div class="carousel-item">'
              +'<a href="../../assets/'+this.shouse["photos"][i]+'" target="_blank"><img src="../../assets/'+this.shouse["photos"][i]+'"'
              +'class="img-fluid "></a>'
              +'</div>';
	}
	this.g_feture = [];
    for (let index = 0; index < this.shouse["g_amenities_list"].length; index++) {
      const element = this.shouse["g_amenities_list"][index];
    this.g_feture.push(element);
	}
	this.ac = false;
	this.garage = false;
	this.swimming = false;
	this.pet = false;
	this.gym = false;
	this.elevator = false;
	this.indoor_game = false;
    for (let i = 0; i < this.shouse["b_amenities_list"].length; i++) {
      const amenities_list = this.shouse["b_amenities_list"][i];				
      switch (amenities_list) {
        case "cooling":
		  //b_feture += ac;
		  this.ac = true;
          break;			
        case "garage":
		  //b_feture += garage;
		  this.garage = true;
          break;
        case "swimming":
		  //b_feture += swimming;
		  this.swimming = true;
          break;	
        case "pet":
		  //b_feture += pet;
		  this.pet = true;
          break;
        case "gym":
		  this.gym = true;
          //b_feture += gym;
          break;
        case "indoor_game":
		  //b_feture += indoor_game;
		  this.indoor_game = true;
          break;				
        case "elevator":
		  //b_feture += elevator;
		  this.elevator = true;
          break
        default:
          break;
      }
      
	}
	this.house_price = this.shouse["user_price"];  
    $("#demo").html(inner_carosal);
	this.house_address = this.shouse["address"];
  	this.house_year = this.shouse["year_bulit"];
	this.no_of_bed = this.shouse["bedroom"];
	this.no_of_bathroom = this.shouse["bathroom"];  
	this.plot_size = this.shouse["plot"];	
	this.overview = this.shouse["overview"];
	this.total_view = this.shouse["view"];
	this.days_on_web = this.shouse["day_web"];
	this.map.flyTo({
		center: [
			this.shouse["lat"],
			this.shouse["long"]
	]
	});
    $("#house_detail").css("animation", "anim 2s forwards");
    $("#house_detail").css({ "display": "" });

    $("#field").css({ "display": "none" });


  }

  heart_clicked() {
	if ($("#heart").hasClass("far")) {
		$("#heart").addClass('fas').removeClass('far');
	}
	else {
		$("#heart").addClass('far').removeClass('fas');
	}
}
 close_details() {
	$("#house_detail").css({ "display": "none" });
	$("#field").css({ "display": "" });
}
 close_appointment() {
	$("#appointment_detail").css({ "display": "none" });
	$("#house_detail").css({ "display": "" });
}
 appointment_click(element) {
	console.log("clicked");
	console.log(element.id);
	
	$("#appointment_detail").css("animation", "anim 2s forwards");
	$("#appointment_detail").css({ "display": "" });

	$("#house_detail").css({ "display": "none" });


}

 underline(element) {
	if (document.getElementById("display_houses").className == "nav-link under-line-active") {
		document.getElementById("display_houses").className = "nav-link under-line";
		//col-xs-12 col-lg-6 d-none d-lg-flex overflow-hidden


	}
	if (document.getElementById("display_map").className == "nav-link under-line-active") {
		document.getElementById("display_map").className = "nav-link under-line";
		//col-xs-12 col-lg-6
	}
	if (element.id == "display_houses") {
		console.log("houses");
		document.getElementById("field").className = "col-xs-12 col-lg-6";
		document.getElementById("map").className = "d-none";
	}
	else {
		console.log("fields");
		document.getElementById("field").className = "d-none";
		document.getElementById("map").className = "col-xs-12 d-lg-flex overflow-hidden";

	}
	if (element.id == "display_map") {
		console.log($(document).height());
		var h = $(document).height();

		$(document).height(h - 1);
		console.log($(document).height());
		//$("#map > div.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-touch-drag-pan.mapboxgl-touch-zoom-rotate > canvas").height = "";
		//map.resize();
		this.close_appointment();
		this.close_details();

	}
	element.className = "nav-link under-line-active";


}
underline_price(element) {
	let sortby = "";
	let order = 1;//1 ASC	
	$("#price_high_low").attr('class',"col-4 my-roboto under-line");	
	$("#price_low_high").attr('class',"col-4 my-roboto under-line");
	$("#newest_first").attr('class',"col-4 my-roboto under-line");
	
	element.className = "col-4 my-roboto under-line-active";

	switch (element.id) {
		case "price_high_low":
			sortby = "user_price";
			order = -1;
			break;
		case "price_low_high":
			sortby = "user_price";
			order = 1;
			break;
		case "newest_first":
			sortby = "day_web";
			order = 1;
			break;
		default:
			break;
	}
	//console.log(this.obj_houselist);
	this.json_houselist = this.houseservice.getHouses();
	this.obj_houselist = JSON.parse(this.json_houselist);  
	this.shouse = this.obj_houselist.find(function(){return 1;}); 
	this.obj_houselist.sort(this.sortbyandorder(sortby, order));
	//console.log(this.obj_houselist);
}

 sortbyandorder(sortby, order) {
	return function (a, b) {
		if (a[sortby] > b[sortby]) {
			return 1 * order;
		} else if (a[sortby] < b[sortby]) {
			return -1 * order;
		}
		return;
	}
}
  ngOnInit() {

	this.houseservice.getAllhouses().subscribe(
		res=>{
			console.log(res);
		},
		err=>{
			console.log(err);
		}
	)
	  
	var lat, long;
	mapboxgl.accessToken = 'pk.eyJ1Ijoic3dhcjIzIiwiYSI6ImNqejlhbmt1YzAxdXAzbm1yZzMzbHFmNHMifQ.xPyQpPklaSXYm5pFCO85Hg';
	
	this.map = new mapboxgl.Map({
		container: 'map',
		center: [72.8662016, 22.690201599999998], // starting position
		zoom: 5, // starting zoom
		style: 'mapbox://styles/mapbox/satellite-streets-v11',

	});
	// if (navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(function (position) {

	// 		lat = position.coords.latitude;
	// 		long = position.coords.longitude;

	// 		(<HTMLInputElement>document.getElementById("latitude")).value = lat;
	// 		(<HTMLInputElement>document.getElementById("longitude")).value = long;
	// 		// map = new mapboxgl.Map({
	// 		//     container: 'map',
	// 		//     center: [long, lat], // starting position
	// 		//     zoom: 13, // starting zoom
	// 		//     style: 'mapbox://styles/mapbox/satellite-streets-v11',

	// 		// });
	// 		this.map.flyTo({
	// 			center: [long, lat],
	// 			zoom: 13,
	// 		});
	// 	}, function () {

	// 		(<HTMLInputElement>document.getElementById("latitude")).placeholder = "select your place location in map";
	// 		(<HTMLInputElement>document.getElementById("longitude")).placeholder = "select your place location in map";

	// 	});
	// }
		
		$(window).resize(function () {
			if ($(window).width() >= 992) {
				document.getElementById("field").className = "col-xs-12 col-lg-6";
				document.getElementById("map").className = "col-xs-12 col-lg-6 d-none d-lg-flex overflow-hidden";
			//	document.getElementById("display_houses").className = "nav-link under-line-active";
				//document.getElementById("display_map").className = "nav-link under-line";
			}
		});
 
  }
  
  call_me()
  {
    console.log(this.obj_houselist);
    //document.getElementById("list_of_house");
  }
  formatLabel(value:number){
	return value.toString();
  }
  formatLabelPlot(value:number){
	if (value >= 1000) {	
		return Math.round(value / 1000) + 'k';
	}	
	return value;
  }
  updateHouseList(event):void
  {
	let sortby = "";
	let order = 1;//1 ASC	
	let id = 'price_high_low';
	if($("#price_high_low").hasClass("under-line-active"))
	{
		id = "price_high_low";
	}	
	else if ($("#price_low_high").hasClass("under-line-active"))
	{
		id = "price_low_high";
	}
	else{
		id = "newest_first";
	}
	//$("#price_low_high").attr('class',"col-4 my-roboto under-line");
//	$("#newest_first").attr('class',"col-4 my-roboto under-line");
	
	
	
	switch (id) {
		case "price_high_low":
			sortby = "user_price";
			order = -1;
			break;
		case "price_low_high":
			sortby = "user_price";
			order = 1;
			break;
		case "newest_first":
			sortby = "day_web";
			order = 1;
			break;
		default:
			break;
	}
	console.log(id);
	console.log('beds :',this.beds );
	console.log('baths :',this.baths );
	console.log('plots :',this.plots );
	this.json_houselist = this.houseservice.getHousesWith(this.baths,this.beds,this.plots);
	this.obj_houselist = JSON.parse(this.json_houselist);  
	this.shouse = this.obj_houselist.find(function(){return 1;}); 
	this.obj_houselist.sort(this.sortbyandorder(sortby, order));
  }
}
