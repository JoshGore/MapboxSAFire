import React, {useState, useEffect} from 'react';
import ReactMapboxGl, {Source,Layer} from 'react-mapbox-gl';
import 'antd/dist/antd.css';
import { Slider, Checkbox, Select } from 'antd';
import Map from './Map';
const { Option } = Select;

const App: React.FC = () => {
  const [showFromYear, setShowFromYear] = useState(1900);
  const [showToYear, setShowToYear] = useState(2020);
  const [showPrescribedBurns, setShowPresecribedBurns] = useState(true);
  const [showBushfires, setShowBushfires] = useState(true);
  const [showMonths, setShowMonths] = useState([1,2,3,4,5,6,7,8,9,10,11,12])
  const SOUTH_AUSTRALIAN_BOUNDS: [[number, number], [number, number]] = [[128.408203, -25.125393],[141.152344, -38.444985]];
  const handleSliderChange = (sliderValue: any) => {
    setShowFromYear(sliderValue[0])
    setShowToYear(sliderValue[1])
  };
  const handleBushfiresToggle = (checkboxValue: any) => setShowBushfires(checkboxValue.target.checked);
  const handlePrescribedBurnsToggle = (checkboxValue: any) => setShowPresecribedBurns(checkboxValue.target.checked);
  const handleMonthSelection = (months: any) => setShowMonths(months);
  return (
    <div>
      <Slider range defaultValue={[1900, 2020]} step={1} min={1900} max={2020} disabled={false} onChange={handleSliderChange}/>
      <Checkbox checked={showBushfires} onChange={handleBushfiresToggle}>Bushfires</Checkbox>
      <Checkbox checked={showPrescribedBurns} onChange={handlePrescribedBurnsToggle}>Controlled Burns</Checkbox>
      <Select mode="multiple" allowClear={true} style={{ width: "50ch" }} onChange={handleMonthSelection} value={showMonths}>
        <Option value={1}>
          January
        </Option>
        <Option value={2}>
          Feburary
        </Option>
        <Option value={3}>
          March
        </Option>
        <Option value={4}>
          April
        </Option>
        <Option value={5}>
          May
        </Option>
        <Option value={6}>
          June
        </Option>
        <Option value={7}>
          July
        </Option>
        <Option value={8}>
          August
        </Option>
        <Option value={9}>
          September
        </Option>
        <Option value={10}>
          October
        </Option>
        <Option value={11}>
          November
        </Option>
        <Option value={12}>
          December
        </Option>
      </Select>
      <Map showFromYear={showFromYear} showToYear={showToYear} showMonths={showMonths} showPrescribedBurns={showPrescribedBurns} showBushfires={showBushfires} />
  </div>
  );
}

export default App;
