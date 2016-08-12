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
				// Get api call to bw zone of influence
				var API_CALL = apiservice.getZoneOfInfluence();

				// Make the api request
				return $http.get(API_CALL).then(function onSuccess(response){
					// Get the zone of influence as gml
					var gml = response.data.result.items[0].zoneOfInfluence.extent.asGML;
		
					// Remove crs from the string
					gml = gml.replace('srsName="os:BNG"', '');
				   	
				   	// Wrap gml in a feature collection
				   	var newGml = wrap(gml);

					// Define zone of influence crs and
					// crs used by leaflet with the ol
					// constructor
					var osgbProjection = new ol.proj.Projection({code: "EPSG:27700"});
					var wsgProjection  = new ol.proj.Projection({code: "EPSG:4326"});

					
					// Get ol gml format and use it to read in a gml string
					// as a gml object
					var gmlFormat 	 = new ol.format.GML();
				   	var gmlFeatures = gmlFormat.readFeatures(newGml);

				   	// Parameters object for ol GeoJSON format
				   	var geojsonFormatOptions = {
				   		defaultDataProjection: osgbProjection,
				   		geometryName: "Polygon"
				   	}

				   	// Parameters object for ol writeFeaturesObject
				   	var featuresOptions = {
				   		featureProjection: osgbProjection,
				   		dataProjection: wsgProjection
				   	}

				   	// Get GeoJSON format and convert the gml object
				   	// to GeoJSON object
				   	var geojsonFormat = new ol.format.GeoJSON(geojsonFormatOptions);
				   	var geojsonFeatures = geojsonFormat.writeFeaturesObject(gmlFeatures, featuresOptions);

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
											closeGeometryFeature   +
							 			closeFeature               + 
							 		closeFeatureMember             +
							 closeFeatureCollection;
				
				return result;
			}
	}]);