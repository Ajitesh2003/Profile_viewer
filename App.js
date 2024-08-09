import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get('https://random-data-api.com/api/users/random_user?size=80')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const nextUser = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
    }
  };

  const previousUser = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  if (users.length === 0) {
    return <Text>Loading...</Text>;
  }

  const user = users[index];

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text>ID: {user.id}</Text>
      <Text>UID: {user.uid}</Text>
      <Text>Password: {user.password}</Text>
      <Text>First Name: {user.first_name}</Text>
      <Text>Last Name: {user.last_name}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={previousUser} disabled={index === 0} />
        <Button title="Next" onPress={nextUser} disabled={index === users.length - 1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  }
});

export default function App() {
  return (
    <UserScreen />
  );
}
