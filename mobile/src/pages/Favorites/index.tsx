import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const favoritedTeachers = JSON.parse(response);
          setFavorites(favoritedTeachers);
        };
      });
  };

  useFocusEffect(() => {
    React.useCallback(() => {
      loadFavorites();
    }, []);
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" />
      <ScrollView contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }} style={styles.teacherList}>
        {
          favorites.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} favorited teacher={teacher} />
          ))
        }
      </ScrollView>
    </View>
  );
}

export default Favorites;