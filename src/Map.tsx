import React, {useState, useEffect} from 'react';
import ReactMapboxGl, {Source,Layer} from 'react-mapbox-gl';

const MapComponent = ReactMapboxGl({
  accessToken:
  'pk.eyJ1Ijoiam9zaGciLCJhIjoiY2syNzdxaWZpMDh3bDNubjVzNmJndW9qMSJ9.R74OP9wKDdb8rkcptyA7JQ'
});
const FIRE_SOURCE_OPTIONS: any = {"type":"vector", "tiles": ["https://api.mapbox.com/v4/joshg.0jqtph5h/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1Ijoiam9zaGciLCJhIjoiY2syNzdxaWZpMDh3bDNubjVzNmJndW9qMSJ9.R74OP9wKDdb8rkcptyA7JQ"]};
  const SOUTH_AUSTRALIAN_BOUNDS: [[number, number], [number, number]] = [[128.408203, -25.125393],[141.152344, -38.444985]];

const Map: React.FC<any> = ({showFromYear, showToYear, showMonths, showPrescribedBurns, showBushfires}: any) => {
  return (
    <MapComponent 
        style="mapbox://styles/mapbox/dark-v9"
        fitBounds={SOUTH_AUSTRALIAN_BOUNDS}
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
    >
    <Source id="fire_source" tileJsonSource={FIRE_SOURCE_OPTIONS}/>
    <Layer 
      id="fire-layer" 
      type="fill" 
      sourceId="fire_source" 
      sourceLayer="FIREMGT_FireHistory_GDA2020" 
      paint={{'fill-color': [
  "match",
  ["get", "INCIDENTTYPE"],
  ["Bushfire"],
  "hsla(3, 72%, 50%, 0.55)",
  ["Prescribed Burn"],
  "hsla(134, 90%, 24%, 0.5)",
  "hsla(0, 0%, 0%, 0)"
      ]}} 
      filter={[
        "all",
        [
          ">=",
          ['to-number', ["get", "FIREDATE"]],
          ["*", showFromYear, 10000 ]
        ],
        [
          "<=",
          ['to-number', ["get", "FIREDATE"]],
          ["*", showToYear, 10000 ]
        ],
        [
          "any",
          [ "match",
            ["get", "INCIDENTTYPE"],
            ["Bushfire"], showBushfires, false 
          ],
          [ "match",
            ["get", "INCIDENTTYPE"],
            ["Prescribed Burn"], showPrescribedBurns, false 
          ]
        ],
        [
          "match",
          ["floor",["/",["%",["to-number", ["get", "FIREDATE"]],10000],100]],
          showMonths, true, false
        ]
      ]
    }
    />
    </MapComponent>
  );
}

export default Map;
