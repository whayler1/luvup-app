import React from 'react';
import { View, Text } from 'react-native';

import { scene, vars } from '../../styles';
import Well from '../../components/Well';
import Preloader from '../../components/Preloader';

const ListEmptyComponent = ({
  isInFlight,
  error,
}) => (
  <View style={{
    paddingHorizontal: 16,
    paddingVertical: 32
  }}>
    {getReceivedLoveNotesError && (
      <Well text="There was an error loading your timeline. Make sure you are connected to wifi or data." />
    )}
    {isGetReceivedLoveNotesInFlight && (
      <Preloader />
    )}
    {(!getReceivedLoveNotesError && !isGetReceivedLoveNotesInFlight) && (
      <Text style={[scene.copy, { fontSize: 25, textAlign: 'center' }]}>You do not have any history yet. Send a Luvup to get things started!</Text>
    )}
  </View>
);

export default ListEmptyComponent;
