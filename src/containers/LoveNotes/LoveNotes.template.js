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
import Well from '../../components/Well';
import Preloader from '../../components/Preloader';

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

const TokenUi = ({ n, Art }) => (
  <View style={styles.tokenUi}>
    <Art />
    <Text style={styles.tokenText}> +{n}</Text>
  </View>
);

const ListEmptyComponent = ({
  isGetReceivedLoveNotesInFlight,
  getReceivedLoveNotesError,
}) => (
  <View style={{
    paddingHorizontal: 16,
    paddingVertical: 32
  }}>
    {getReceivedLoveNotesError && (
      <Well text="There was an error loading your love notes. Make sure you are connected to wifi or data." />
    )}
    {isGetReceivedLoveNotesInFlight && (
      <Preloader />
    )}
  </View>
);

const RenderItem = ({ item }) => (
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
    <Text style={[scene.copy, { marginTop: 16 }]}>{decodeURI(item.note)}</Text>
  </View>
);

export default ({
  isGetReceivedLoveNotesInFlight,
  getReceivedLoveNotesError,
  receivedLoveNotes,
  onEndReached,
}) => {
  return (
    <View>
      <FlatList
        data={receivedLoveNotes}
        keyExtractor={keyExtractor}
        renderItem={RenderItem}
        onEndReached={onEndReached}
        ListEmptyComponent={<ListEmptyComponent
          isGetReceivedLoveNotesInFlight={isGetReceivedLoveNotesInFlight}
          getReceivedLoveNotesError={getReceivedLoveNotesError}
        />}
      />
    </View>
  );
};
