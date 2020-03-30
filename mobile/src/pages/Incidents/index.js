import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    const response = await api.get('incidents')

    setIncidents(response.data)
    setTotal(response.headers['x-total-count'])
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}> Bem-vindo! </Text>
      <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia. </Text>

      <FlatList data={incidents} style={styles.incidentList} keyExtractor={incident => String(incident.id)} showsVerticalScrollIndicator={false} renderItem={({ item: incident }) => (
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}> ONG: </Text>
          <Text style={styles.incidentValue}> {incident.name} </Text>

          <Text style={styles.incidentProperty}> CASO: </Text>
          <Text style={styles.incidentValue}> {incident.title} </Text>

          <Text style={styles.incidentProperty}> VALOR: </Text>
          <Text style={styles.incidentValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </Text>

          <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
            <Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
            <Feather name="arrow-right" size={16} color='#e02041' />
          </TouchableOpacity>
        </View>
      )} />
    </View>
  )
}
