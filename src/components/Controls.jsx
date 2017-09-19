import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select  from 'react-select';
//import { form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './styles/Controls.css';
import { fetchCountries, fetchCountryGdp } from '../actions'

class Controls extends Component {

    constructor(props){
        super(props);
        this.state = {
            disabled: false,
            searchable: this.props.searchable,
            clearable: true,
            selectValue: 'FR',
            isCountriesFetching : true,
            countriesOptions : [],
            intervalDate: {start:'1960', end:'2017'},
        };
    }
    componentDidMount(){
        if (this.props.countries === undefined ||
            this.props.countries !== null || this.props.countries.length === 0)
            {
                this.props.fetchCountries();
            }
        }
    componentWillReceiveProps(nextProps)
    {
        this.props = nextProps;
        var countriesOptions = this.props.countries.map((country) => {
            return { value : country.iso2Code,
            label : country.name };
        });
        this.setState({isCountriesFetching: this.props.isCountriesFetching,
        countriesOptions,
        selectValue: 'FR'});
        this.props.fetchCountryGdp(this.state.selectValue, this.state.intervalDate);
    }


    getValidationState = () => {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    logChange = (val) => {
        console.log("Selected: " + JSON.stringify(val));
    }

    updateValue = (newValue) => {
        if (newValue === null)
        {
            return;
        }
        console.log('State changed to ' + newValue);
        this.setState(
            {
                selectValue: newValue
            }, () => {
            this.props.fetchCountryGdp(this.state.selectValue, this.state.intervalDate);
            }
        );
	}


    render() {

        return (
            <div className="Controls">
                <Select ref="stateSelect"
                    addLabelText="Toto"
                    autofocus options={this.state.countriesOptions}
                    simpleValue clearable={this.state.clearable}
                    name="selected-state"
                    disabled={this.state.disabled}
                    value={this.state.selectValue}
                    onChange={(newValue) => { this.updateValue(newValue); }}
                    searchable={this.state.searchable}
                    isLoading={this.state.isCountriesFetching}/>
                <h4 className="help">Select your country</h4>
            </div>
        );
    }
}

function mapStateToProps(state)
{
    const { countries, isCountriesFetching } = state;
    return {
        countries,
        isCountriesFetching
    }
}
export default connect(mapStateToProps, { fetchCountryGdp, fetchCountries }) (Controls);
