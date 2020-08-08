import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const favoritedTeachers = JSON.parse(response);
          const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id);
          setFavorites(favoritedTeachersIds);
        };
      });
  };

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  };

  async function handleFilterSubmit() {
    loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day: 3,
        time,
      },
    });
    setTeachers(response.data);
    setIsFiltersVisible(false);
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={(
        <BorderlessButton onPress={handleToggleFiltersVisible}>
          <Feather name="filter" size={20} color="#fff" />
        </BorderlessButton>
      )}>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?" />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?" />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                />
              </View>
            </View>
            <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }} style={styles.teacherList}>
        {
          teachers.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
          ))
        }
      </ScrollView>
    </View>
  );
}

export default TeacherList;