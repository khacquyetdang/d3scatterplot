import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarChart from './BarChart.jsx';
import Controls from './Controls.jsx';
import CyclistScatterplot from './CyclistScatterplot.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/App.css';
import 'react-tabs/style/react-tabs.css';

class App extends Component {




    render() {

        return (
            <div className="App">
                { /*<SimpleBarChart />*/}
                <Tabs>
                    <TabList>
                        <Tab>Cyclist doping</Tab>
                        <Tab>Wolrd gdp</Tab>
                    </TabList>

                    <TabPanel>
                        <CyclistScatterplot></CyclistScatterplot>
                    </TabPanel>
                    <TabPanel>
                        <div className="AppContainer">
                            <Controls></Controls>
                            <div></div>
                            <BarChart />
                        </div>
                    </TabPanel>

                </Tabs>

            </div>
        );
    }
}

export default connect(null, null) (App);
