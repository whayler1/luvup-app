import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import moment from 'moment';

import { scene } from '../../styles';
import styles from './LoveNotes.styles';

const keyExtractor = (item) => item.id;

const LuvupArt = () => (
  <Image
    source={require('../../images/coin.png')}
    style={{
      width: 20,
      height: 20,
    }}
  />
);
const JalapenoArt = () => (
  <Image
    source={require('../../images/jalapeno.png')}
    style={{
      width: 15.3,
      height: 20,
    }}
  />
);

const TokenUi = ({n, Art}) => (
  <View style={styles.tokenUi}>
    <Art />
    <Text style={styles.tokenText}> +{n}</Text>
  </View>
);

const RenderItem = ({item}) => (
  <View style={styles.renderItemWrap}>
    <Text>
      <Text style={styles.titleText}>{moment(new Date(item.createdAt)).format('MMM D, YYYY')}</Text>
      <Text style={styles.titleTextSecondary}> at {moment(new Date(item.createdAt)).format('hh:mm a')}</Text>
    </Text>
    {(item.numLuvups || item.numJalapenos) && (
      <View style={styles.tokenWrap}>
        {item.numLuvups && (
          <TokenUi
            n={item.numLuvups}
            Art={LuvupArt}
          />
        )}
        {item.numJalapenos && (
          <TokenUi
            n={item.numJalapenos}
            Art={JalapenoArt}
          />
        )}
      </View>
    )}
    <Text style={[scene.copy, { marginTop: 16 }]}>{item.note}</Text>
  </View>
);

export default ({
  receivedLoveNotes,
}) => {
  console.log({ receivedLoveNotes });
  return (
    <View>
      <Text>Love Notes</Text>
      <FlatList
        data={receivedLoveNotes}
        keyExtractor={keyExtractor}
        renderItem={RenderItem}
      />
    </View>
  );
};
