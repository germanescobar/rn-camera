import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Button title="Take photo!" onPress={this.onButtonPressed.bind(this)} />
        </View>
      </View>
    );
  }

  onButtonPressed() {
    this.props.navigation.navigate("Camera");
  }

}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
