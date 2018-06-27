import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import moment from 'moment';

import { scene } from '../../styles';
import styles from './LoveNotes.styles';
import CoinArt from '../../components/CoinArt';

const keyExtractor = (item) => item.id;

const RenderItem = ({item}) => (
  <View style={styles.renderItemWrap}>
    <Text style={styles.titleText}>{moment(new Date(item.createdAt)).format('MMM D, YYYY hh:mm a')}</Text>
    {(item.numLuvups || item.numJalapenos) && (
      <View>
        {item.numLuvups && (
          <View>
            {item.numLuvups} Luvups
          </View>
        )}
        {item.numJalapenos && (
          <View>
            {item.numJalapenos} Jalapenos
          </View>
        )}
      </View>
    )}
    <Text style={[scene.copy, { marginTop: 8 }]}>{item.note}</Text>
  </View>
);

export default ({
  receivedLoveNotes,
}) => (
  <View>
    <Text>Love Notes</Text>
    <FlatList
      data={receivedLoveNotes}
      keyExtractor={keyExtractor}
      renderItem={RenderItem}
    />
  </View>
);
