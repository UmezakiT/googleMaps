import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Globals from '../../utils/globals';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import MUIDataTable from 'mui-datatables';

import './DashboardPage.css';

class DashboardView extends Component {

  constructor(props) {
    super(props);
    const plat = this.props.user.latitude;
    const plng = this.props.user.longitude;

    this.state = {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        markers: [ plat, plng ],
        email: this.props.user.username,
        latitude: plat,
        longitude: plng,
        hobby: this.props.user.hobby
      }
  }
  
  render() {
    const options = {
      selectableRows: false,
      responsive: 'scroll',
      filterType: 'dropdown',
      rowsPerPage: 5,
      rowsPerPageOptions: [2, 5, 10],
      print: false,
      download: false,
      filter: false,
      viewColumns: false,
      onRowClick: (rowData, rowMeta) => {
        window.location.href = '/location/'+rowData[3];
      }
    };
    const columns = [
      {
        name: 'Photo',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <img className="locationImage" src={Globals.instance().publicUrl + value}  style={{width:50, height: 40}} alt="location"/>
            );
          }
        }
      },
      { name: 'Location' },
      {
        name: 'Description',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              value.substring(0,50)+"..."
            )
          }
        }
      },
      {
        name: 'ID',
        options: {
          display: false
        }
      }
    ];
    return (
      <div className="DashboardPage">
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className="userInfo">
                <h2 className="title"> User Information </h2>
                <Grid className="dataInfo" container>
                  <Grid item xs={2}>
                  </Grid>
                  <Grid item xs={3}>
                    <span className="prefix"> User Name: </span>
                  </Grid>
                  <Grid item xs={4}>
                    <span> {this.state.firstName + ' ' + this.state.lastName} </span>
                  </Grid>
                </Grid>

                <Grid className="dataInfo" container>
                  <Grid item xs={2}>
                  </Grid>
                  <Grid item xs={3}>
                    <span className="prefix"> Email: </span>
                  </Grid>
                  <Grid item xs={4}>
                    <span> {this.state.email} </span>
                  </Grid>
                </Grid>

                <Grid className="dataInfo" container>
                  <Grid item xs={2}>
                  </Grid>
                  <Grid item xs={3}>
                    <span className="prefix"> Hobby: </span>
                  </Grid>
                  <Grid item xs={4}>
                    <span> {this.state.hobby} </span>
                  </Grid>
                </Grid>
                <div className="d_googleMap">
                  <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                      lat: this.state.latitude,
                      lng: this.state.longitude
                    }}
                  >
                      {this.state.markers.map((marker, index) => (
                          <Marker
                            key={index}
                            position={marker.position}
                          />
                        ))}
                  </Map>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
                <MUIDataTable
                  title="Location List"
                  data={this.props.locations.map(item => [
                        item.locationPicture,
                        item.locationName,
                        item.locationDescription,
                        item._id
                    ])}
                  options={options}
                  columns={columns}
                />
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBQVfqqSFo-SzqrFH2dGubbDrPUkSxAbgs'
})(DashboardView);
s