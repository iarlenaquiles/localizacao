import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import axios from 'axios';

export default class localizacao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      listaEnderecos: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({error: error.message}),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      
    );
  }

  componentWillMount() {
    const instance = axios.create({baseURL: 'http://localhost:8000'})

    instance.get('api/clientes/-3.77201241/-38.61984394')
    .then(response => { console.log(response); })
    .catch((erro) => { console.log(erro); });
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Latitude: {this.state.latitude}
        </Text>
        <Text>
          Longitude: {this.state.longitude}
        </Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        { this.state.listaEnderecos.map(item => <Text>item</Text>) }
      </View>
    );
  }
}

AppRegistry.registerComponent('localizacao', () => localizacao);
