'use strict';

angular
	.module('myApp')

	.factory('apiservice', 
		[ 

		function(){
			
			/* Provided funcionality */

			var service = {
				getZoneOfInfluence: getZoneOfInfluence
			}

			var BATHING_WATERS_API_CALL = 
				"http://environment.data.gov.uk/doc/bathing-water";

			return service;

			/* Functions implementation */

			function getZoneOfInfluence(){
				return BATHING_WATERS_API_CALL + "?_pageSize=10&_properties=zoneOfInfluence.extent.asGML";
			}
		
	}])
	
	.factory('dataservice', 
		['$http',
		 'apiservice', 

		function($http, apiservice){
			
			/* Provided functionality */

			var service = {
				getZoiGeoJson: getZoiGeoJson
			}

			return service;

			
			/* Functions implementation */

			function getZoiGeoJson(){
				var API_CALL = apiservice.getZoneOfInfluence();
				
				proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
				//proj4.defs("EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");

				return $http.get(API_CALL).then(function onSuccess(response){
					var gml = response.data.result.items[0].zoneOfInfluence.extent.asGML;
	
					gml = gml.replace('srsName="os:BNG"', '');
				   	
				   	//Start wrapping
				   	var newGml = wrap(gml);
				   	//End wrapping

				   	
				   	//create the gml object
				 	//var gmlOptions = {
					//     featureType: "feature",
					//     featureNS:   "http://example.com/feature"
					// };
					
					var osbgProjection = new ol.proj.Projection({code: "EPSG:27700"});
					var wsgProjection  = new ol.proj.Projection({code: "EPSG:4326"});

					
					//get gml format and read in features from gml string
					var gmlFormat 	 = new ol.format.GML();
				   	var gmlFeatures = gmlFormat.readFeatures(newGml)//, projection);

				   	//get geojson format and write feature in geojson string
				   	var formatOptions = {
				   		defaultDataProjection: osbgProjection,
				   		geometryName: "Polygon"
				   	}

				   	var featuresOptions = {
				   		featureProjection: osbgProjection,
				   		dataProjection: wsgProjection
				   	}

				   	var geojsonFormat = new ol.format.GeoJSON(formatOptions);
				   	var geojsonFeatures = geojsonFormat.writeFeaturesObject(gmlFeatures, featuresOptions);//osbgProjection, wsgProjection);
				   	//
				   	
				   	//console.log(geojsonFeaturesOsgb);
				   	//console.log(ol.proj.transform(geojsonFeatures.features[0].geometry, osbgProjection, wsgProjection));
				   	//gmlFeatures.setGeometry("Polygon");
				   	//console.log(gmlFeatures.getGeometry());
				   	 console.log(geojsonFeatures);

					
					return geojsonFeatures;
				})
			}

			// Function to wrap the gml string into a 
			// feature collection
			function wrap(gml){
				var openFeatureCollection  = '<gml:FeatureCollection xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:27700">',
					closeFeatureCollection = "</gml:FeatureCollection>";

				var openFeatureMember  = "<gml:featureMember>",
					closeFeatureMember = "</gml:featureMember>";

				var openFeature  = '<feature:feature xmlns:feature="http://example.com/feature">',
				 	closeFeature = "</feature:feature>";
				
				var openGeometryFeature  = '<gml:geometry>',
					closeGeometryFeature = "</gml:geometry>";

				var foo = "<feature:foo/>"

				var result = openFeatureCollection             	   +  
									openFeatureMember          	   + 
										openFeature            	   +
											openGeometryFeature    + 
												gml                +
										//		foo 			   +
											closeGeometryFeature   +
							 			closeFeature               + 
							 		closeFeatureMember             +
							 closeFeatureCollection;
				
				return result;
			}
	}]);