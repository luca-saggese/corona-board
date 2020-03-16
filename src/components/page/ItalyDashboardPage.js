// src/components/page/ItalyDashboardPage.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AirlineSeatIcon from '@material-ui/icons/AirlineSeatFlat';
import ReportIcon from '@material-ui/icons/Report';

import { Sticker } from '@stickyboard/core';
import {
    LineChart,
    MultiLineChart,
    BarChart,
    StackedBarChart,
    ComposedChart,
    PieChart,
    RadarChart,
    AreaChart,
    ScatterChart,
    Treemap,
} from '@stickyboard/recharts';
import { NumberWidget } from '@stickyboard/number';
import { HeatMap } from '@stickyboard/openlayers';

import ApiManager from 'network/ApiManager';
import StatusCode from 'network/StatusCode';

import LocalStorageManager from 'manager/LocalStorageManager';

import PageBaseContainer from 'redux/containers/PageBaseContainer';

import LocalStorageConst from 'constants/LocalStorageConst';

const styles = (theme) => ({
    root: {},
});

const initialLayout = {
    lg: [
        { i: 'TitleWorld', x: 0, y: 0, w: 12, h: 1 },
        { i: 'BriefConfirmed', x: 0, y: 1, w: 3, h: 2 },
        { i: 'BriefRecovered', x: 3, y: 1, w: 3, h: 2 },
        { i: 'BriefDeaths', x: 6, y: 1, w: 3, h: 2 },
        { i: 'BriefFatalityRate', x: 9, y: 1, w: 3, h: 2 },
        { i: 'SelectMenu', x: 0, y: 3, w: 12, h: 2 },
        { i: 'CountryConfirmed', x: 0, y: 5, w: 3, h: 2 },
        { i: 'CountryRecovered', x: 3, y: 5, w: 3, h: 2 },
        { i: 'CountryDeaths', x: 6, y: 5, w: 3, h: 2 },
        { i: 'CountryFatalityRate', x: 9, y: 5, w: 3, h: 2 },
        { i: 'LineChart', x: 6, y: 7, w: 6, h: 6 },
        { i: 'HeatMap', x: 0, y: 7, w: 6, h: 11 },
        { i: 'ComposedChart', x: 6, y: 13, w: 6, h: 5 },
    ],
    md: [
        { i: 'TitleWorld', x: 0, y: 0, w: 12, h: 1 },
        { i: 'BriefConfirmed', x: 0, y: 1, w: 3, h: 2 },
        { i: 'BriefRecovered', x: 3, y: 1, w: 3, h: 2 },
        { i: 'BriefDeaths', x: 6, y: 1, w: 3, h: 2 },
        { i: 'BriefFatalityRate', x: 9, y: 1, w: 3, h: 2 },
        { i: 'SelectMenu', x: 0, y: 3, w: 12, h: 2 },
        { i: 'CountryConfirmed', x: 0, y: 5, w: 3, h: 2 },
        { i: 'CountryRecovered', x: 3, y: 5, w: 3, h: 2 },
        { i: 'CountryDeaths', x: 6, y: 5, w: 3, h: 2 },
        { i: 'CountryFatalityRate', x: 9, y: 5, w: 3, h: 2 },
        { i: 'LineChart', x: 6, y: 7, w: 6, h: 5 },
        { i: 'HeatMap', x: 0, y: 7, w: 6, h: 11 },
        { i: 'ComposedChart', x: 6, y: 12, w: 6, h: 6 },
    ],
    sm: [
        { i: 'TitleWorld', x: 0, y: 0, w: 8, h: 1 },
        { i: 'BriefConfirmed', x: 0, y: 1, w: 4, h: 2 },
        { i: 'BriefRecovered', x: 4, y: 1, w: 4, h: 2 },
        { i: 'BriefDeaths', x: 0, y: 3, w: 4, h: 2 },
        { i: 'BriefFatalityRate', x: 4, y: 3, w: 4, h: 2 },
        { i: 'SelectMenu', x: 0, y: 5, w: 8, h: 2 },
        { i: 'CountryConfirmed', x: 0, y: 7, w: 4, h: 2 },
        { i: 'CountryRecovered', x: 4, y: 7, w: 4, h: 2 },
        { i: 'CountryDeaths', x: 0, y: 9, w: 4, h: 2 },
        { i: 'CountryFatalityRate', x: 4, y: 9, w: 4, h: 2 },
        { i: 'LineChart', x: 0, y: 11, w: 4, h: 6 },
        { i: 'HeatMap', x: 0, y: 17, w: 8, h: 6 },
        { i: 'ComposedChart', x: 4, y: 11, w: 4, h: 6 },
    ],
    xs: [
        { i: 'TitleWorld', x: 0, y: 0, w: 6, h: 1 },
        { i: 'BriefConfirmed', x: 0, y: 1, w: 3, h: 2 },
        { i: 'BriefRecovered', x: 3, y: 1, w: 3, h: 2 },
        { i: 'BriefDeaths', x: 0, y: 3, w: 3, h: 2 },
        { i: 'BriefFatalityRate', x: 3, y: 3, w: 3, h: 2 },
        { i: 'SelectMenu', x: 0, y: 5, w: 6, h: 2 },
        { i: 'CountryConfirmed', x: 0, y: 7, w: 3, h: 2 },
        { i: 'CountryRecovered', x: 3, y: 7, w: 3, h: 2 },
        { i: 'CountryDeaths', x: 0, y: 9, w: 3, h: 2 },
        { i: 'CountryFatalityRate', x: 3, y: 9, w: 3, h: 2 },
        { i: 'LineChart', x: 0, y: 11, w: 6, h: 6 },
        { i: 'HeatMap', x: 0, y: 23, w: 6, h: 6 },
        { i: 'ComposedChart', x: 0, y: 17, w: 6, h: 6 },
    ],
    xxs: [
        { i: 'TitleWorld', x: 0, y: 0, w: 4, h: 1 },
        { i: 'BriefConfirmed', x: 0, y: 1, w: 4, h: 3 },
        { i: 'BriefRecovered', x: 0, y: 4, w: 4, h: 3 },
        { i: 'BriefDeaths', x: 0, y: 7, w: 4, h: 3 },
        { i: 'BriefFatalityRate', x: 0, y: 10, w: 4, h: 3 },
        { i: 'SelectMenu', x: 0, y: 13, w: 4, h: 2 },
        { i: 'CountryConfirmed', x: 0, y: 15, w: 4, h: 3 },
        { i: 'CountryRecovered', x: 0, y: 18, w: 4, h: 3 },
        { i: 'CountryDeaths', x: 0, y: 21, w: 4, h: 3 },
        { i: 'CountryFatalityRate', x: 0, y: 24, w: 4, h: 3 },
        { i: 'LineChart', x: 0, y: 27, w: 4, h: 6 },
        { i: 'HeatMap', x: 0, y: 39, w: 4, h: 6 },
        { i: 'ComposedChart', x: 0, y: 33, w: 4, h: 6 },
    ],
};

const initialBlocks = [
    { i: 'TitleWorld' },
    { i: 'BriefConfirmed' },
    { i: 'BriefRecovered' },
    { i: 'BriefDeaths' },
    { i: 'BriefFatalityRate' },
    { i: 'SelectMenu' },
    { i: 'CountryConfirmed' },
    { i: 'CountryRecovered' },
    { i: 'CountryDeaths' },
    { i: 'CountryFatalityRate' },
    { i: 'LineChart' },
    { i: 'HeatMap' },
    { i: 'ComposedChart' },
];

class ItalyDashboardPage extends React.Component {
    constructor(props) {
        super(props);

        const initialCountryName = null;

        this.state = {
            // Set initially selected country
            selectedCountryName: initialCountryName,
            // Data
            brief: null,
            nazione: [],
            regioni: [],
            province: [],
            countryLatestDict: {},
            countryTimeseriesDict: {},
        };
    }

    componentDidMount() {
        ApiManager.Corona.readBrief(this.readBriefCallback);
        ApiManager.Corona.readLatest(this.readLatestCallback);
        ApiManager.Corona.readTimeseries(this.readTimeseriesCallback);
        ApiManager.Corona.readNazione(this.readNazioneCallback);
        ApiManager.Corona.readRegioni(this.readRegioniCallback);
        ApiManager.Corona.readProvince(this.readProvinceCallback);

    }

    onSelectCountry = (event) => {
        this.setState({
            selectedCountryName: event.target.value,
        }, () => {
            LocalStorageManager.setItem(
                LocalStorageConst.KEY.SELECTED_COUNTRY,
                this.state.selectedCountryName);
        });
    };

    addPlus = (num) =>{
      return num > 0 ? `+${num}` : num;
    }

    readNazioneCallback = (statusCode, response) => {
      switch (statusCode) {
          case StatusCode.OK:
              this.setState({
                  nazione: response,
              });
              break;
          default:
              alert(response.msg);
              break;
      }
    };

    readRegioniCallback = (statusCode, response) => {
      switch (statusCode) {
          case StatusCode.OK:
              this.setState({
                  regioni: response,
              });
              break;
          default:
              alert(response.msg);
              break;
      }
    };

    readProvinceCallback = (statusCode, response) => {
      switch (statusCode) {
          case StatusCode.OK:
              this.setState({
                  province: response,
              });
              break;
          default:
              alert(response.msg);
              break;
      }
    };

    readBriefCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                this.setState({
                    brief: response,
                });
                break;
            default:
                alert(response.msg);
                break;
        }
    };

    readLatestCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                let countryLatestDict = {};

                response.forEach((data) => {
                    const {
                        countryregion,
                        provincestate,
                        location,
                        confirmed,
                        deaths,
                        recovered,
                        lastupdate,
                    } = data;

                    // Extract country region list
                    let name = countryregion;
                    if (provincestate !== '') {
                        name += ` (${provincestate})`;
                    }

                    countryLatestDict[name] = {
                        name: name,
                        location: location,
                        confirmed: confirmed,
                        deaths: deaths,
                        recovered: recovered,
                        lastUpdate: lastupdate,
                    };
                });

                this.setState({
                    countryLatestDict: countryLatestDict,
                });
                break;
            default:
                alert(response.msg);
                break;
        }
    };

    readTimeseriesCallback = (statusCode, response) => {
        switch (statusCode) {
            case StatusCode.OK:
                let countryTimeseriesDict = {};

                // Sort country by name
                response.sort((a, b) => {
                    return `${a.countryregion}${a.provincestate}` <
                        `${b.countryregion}${b.provincestate}`
                        ? -1
                        : 1;
                });

                response.forEach((data) => {
                    const {
                        countryregion,
                        provincestate,
                        location,
                        timeseries,
                        lastupdate,
                    } = data;

                    // Extract country region list
                    let name = countryregion;
                    if (provincestate !== '') {
                        name += ` (${provincestate})`;
                    }

                    // Extract timeseries data for each country region
                    const timeseriesData = timeseries;
                    const convertedTimeseries = Object.keys(timeseriesData).map(
                        (key) => {
                            return {
                                ...timeseriesData[key],
                                date: key,
                            };
                        }
                    );

                    countryTimeseriesDict[name] = {
                        name: name,
                        location: location,
                        timeseries: convertedTimeseries,
                        lastUpdate: lastupdate,
                    };
                });

                this.setState({
                    countryTimeseriesDict: countryTimeseriesDict,
                });
                break;
            default:
                alert(response.msg);
                break;
        }
    };

    generateBlock = (block, data) => {
        const {
            selectedCountryName,
            brief,
            province,
            regioni,
            nazione,
            countryLatestDict,
            countryTimeseriesDict,
        } = data;
        const { theme } = this.props;

        const colors = theme.colors.colorArray;

        const selectedCountry = selectedCountryName ? regioni.filter(r=>(r.denominazione_regione == selectedCountryName)) : nazione;
        selectedCountry.forEach((c,id)=>{
          const date = new Date(c.data.split(' ')[0]);
          c.date = date.getTime();
          c.confirmed = c.totale_casi;
          c.infected = c.totale_attualmente_positivi;
          c.nuovi_tamponi = id == 0 ? c.tamponi : c.tamponi - selectedCountry[id-1].tamponi;
        })
        const targetTimeseriesData = selectedCountry
            ? selectedCountry.timeseries
            : [];

        let latest_date = 0;
        let max_casi_provincia = 0;
        province.forEach(p=>{
          latest_date=Math.max(latest_date, new Date(p.data.split(' ')[0]).getTime())
          max_casi_provincia=Math.max(max_casi_provincia, p.totale_casi)
        });
        
        const yesterday_date = new Date(latest_date) - 24 * 3600 * 1000;
        const cur_nazione = nazione.filter(p=>(new Date(p.data.split(' ')[0]).getTime() == latest_date))[0];
        const yesterday_nazione = nazione.filter(p=>(new Date(p.data.split(' ')[0]).getTime() == yesterday_date))[0];

        console.log('yesterday_nazione', yesterday_nazione)

        const cur_regioni = regioni.filter(p=>(new Date(p.data.split(' ')[0]).getTime() == latest_date));
        const selectedCountryLatest = selectedCountry.filter(p=>(new Date(p.data.split(' ')[0]).getTime() == latest_date))[0];
        const selectedCountryYesterday = selectedCountry.filter(p=>(new Date(p.data.split(' ')[0]).getTime() == (latest_date - 24 * 3600 * 1000)))[0];

        const pointList = province.filter(p=>(new Date(p.data.split(' ')[0]).getTime() == latest_date)).map(
          (prov) => {
            // console.log(prov.denominazione_provincia, prov.totale_casi , max_casi_provincia,prov.totale_casi / max_casi_provincia)
              return {
                  geometry: [
                      prov.long,
                      prov.lat,
                  ],
                  weight: Math.min(prov.totale_casi / max_casi_provincia * 10, 1.0),
              };
          }
      );

        switch (block.i) {
            case 'TitleWorld':
                return (
                    <Sticker key={block.i}>
                        <div style={{ fontSize: 32, fontWeight: 'bold' }}>
                            Italia
                        </div>
                    </Sticker>
                );
            case 'BriefConfirmed':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={<PersonIcon style={{ marginBottom: -4 }} />}
                            backgroundColor={theme.colors.colorArray[0]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Positivi'}
                            value={cur_nazione ? `${cur_nazione.totale_attualmente_positivi}  (${this.addPlus(cur_nazione.totale_attualmente_positivi - yesterday_nazione.totale_attualmente_positivi)})` : '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'BriefRecovered':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={
                                <LocalHospitalIcon
                                    style={{ marginBottom: -4 }}
                                />
                            }
                            backgroundColor={theme.colors.colorArray[2]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Guariti'}
                            value={cur_nazione ? `${cur_nazione.dimessi_guariti}  (${this.addPlus(cur_nazione.dimessi_guariti - yesterday_nazione.dimessi_guariti)})` : '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'BriefDeaths':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={
                                <AirlineSeatIcon style={{ marginBottom: -4 }} />
                            }
                            backgroundColor={theme.colors.colorArray[1]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Deceduti'}
                            value={cur_nazione ? `${cur_nazione.deceduti}  (${this.addPlus(cur_nazione.deceduti - yesterday_nazione.deceduti)})` : '-'}
                            unit={''}
                        />
                    </Sticker>
                );
            case 'BriefFatalityRate':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={<ReportIcon style={{ marginBottom: -4 }} />}
                            backgroundColor={theme.colors.colorArray[4]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Perc. Fatalità'}
                            value={
                              cur_nazione
                                    ? `${(
                                          (cur_nazione.deceduti / cur_nazione.totale_casi) *
                                          100
                                      ).toFixed(2)}`
                                    : '-'
                            }
                            unit={'%'}
                        />
                    </Sticker>
                );
            case 'SelectMenu':
                return (
                    <Sticker key={block.i}>
                        <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                            <div style={{ fontSize: 32, fontWeight: 'bold' }}>
                                Regionale
                            </div>

                            <FormControl
                                style={{ minWidth: 200, marginLeft: 32 }}>
                                <InputLabel>Regione</InputLabel>
                                <Select
                                    value={selectedCountryName}
                                    onChange={this.onSelectCountry}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {cur_regioni.map(
                                        (regione) => {
                                            return (
                                                <MenuItem
                                                    key={regione.denominazione_regione}
                                                    value={regione.denominazione_regione}>
                                                    {regione.denominazione_regione}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    </Sticker>
                );
            case 'CountryConfirmed':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={<PersonIcon style={{ marginBottom: -4 }} />}
                            backgroundColor={theme.colors.colorArray[3]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Positivi'}
                            value={
                                selectedCountryLatest
                                    ? `${selectedCountryLatest.totale_attualmente_positivi} (${this.addPlus(selectedCountryLatest.totale_attualmente_positivi - selectedCountryYesterday.totale_attualmente_positivi)})`
                                    : '-'
                            }
                            unit={''}
                        />
                    </Sticker>
                );
            case 'CountryRecovered':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={
                                <LocalHospitalIcon
                                    style={{ marginBottom: -4 }}
                                />
                            }
                            backgroundColor={theme.colors.colorArray[5]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Guariti'}
                            value={
                                selectedCountryLatest
                                    ? `${selectedCountryLatest.dimessi_guariti} (${this.addPlus(selectedCountryLatest.dimessi_guariti - selectedCountryYesterday.dimessi_guariti)})`
                                    : '-'
                            }
                            unit={''}
                        />
                    </Sticker>
                );
            case 'CountryDeaths':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={
                                <AirlineSeatIcon style={{ marginBottom: -4 }} />
                            }
                            backgroundColor={theme.colors.colorArray[4]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Deceduti'}
                            value={
                                selectedCountryLatest
                                    ? `${selectedCountryLatest.deceduti} (${this.addPlus(selectedCountryLatest.deceduti - selectedCountryYesterday.deceduti)})`
                                    : '-'
                            }
                            unit={''}
                        />
                    </Sticker>
                );
            case 'CountryFatalityRate':
                return (
                    <Sticker key={block.i}>
                        <NumberWidget
                            icon={<ReportIcon style={{ marginBottom: -4 }} />}
                            backgroundColor={theme.colors.colorArray[10]}
                            defaultColor={theme.colors.colorLight}
                            valueColor={theme.colors.colorLight}
                            title={'Perc Fatalità'}
                            value={
                                selectedCountryLatest
                                    ? `${(
                                          (selectedCountryLatest.deceduti /
                                              selectedCountryLatest.totale_casi) *
                                          100
                                      ).toFixed(2)}`
                                    : '-'
                            }
                            unit={'%'}
                        />
                    </Sticker>
                );
            case 'LineChart':
                return (
                    <Sticker key={block.i}>
                        <MultiLineChart
                            data={selectedCountry}
                            xAxisDataKey={'date'}
                            lineDataArray={[
                                {
                                    key: 'confirmed',
                                    name: 'Confermati',
                                    color: colors[0],
                                },
                                {
                                    key: 'dimessi_guariti',
                                    name: 'Guariti',
                                    color: colors[2],
                                },
                                {
                                    key: 'totale_attualmente_positivi',
                                    name: 'Attualmente Positivi',
                                    color: colors[1],
                                }
                                ,
                                {
                                    key: 'deceduti',
                                    name: 'Deceduti',
                                    color: colors[3],
                                }
                            ]}
                        />
                    </Sticker>
                );
            case 'HeatMap':
                return (
                    <Sticker key={block.i}>
                        <HeatMap
                            zoom={5}
                            minZoom={2}
                            maxZoom={17}
                            blur={40}
                            radius={30}
                            longitude={12.492373}
                            latitude={41.890251}
                            pointList={pointList}
                        />
                    </Sticker>
                );
            case 'ComposedChart':
                return (
                    <Sticker key={block.i}>
                        <ComposedChart
                            data={selectedCountry}
                            xAxisDataKey={'date'}
                            lineType={'linear'}
                            lineDataKey={'nuovi_attualmente_positivi'}
                            lineName={'Nuovi Positivi'}
                            lineColor={colors[0]}
                        />
                    </Sticker>
                );
        }
    };

    render() {
        return (
            <PageBaseContainer
                data={this.state}
                generateBlock={this.generateBlock}
                initialLayout={initialLayout}
                initialBlocks={initialBlocks}
            />
        );
    }
}

ItalyDashboardPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ItalyDashboardPage);
