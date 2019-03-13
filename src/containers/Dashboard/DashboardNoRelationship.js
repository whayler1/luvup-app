import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { buttons, scene, vars } from '../../styles';
import styles from './DashboardNoRelationship.styles';
import HeartArt from '../../components/Art/HeartArt';

const handleLoverRequestPress = () => {
  Actions.createloverrequest();
};

const DashboardNoRelationship = () => (
  <View style={[scene.content, styles.wrapper]}>
    <View style={styles.topContent}>
      <HeartArt fill={vars.blueGrey50} scale={0.1} />
      <Text style={[scene.titleCopy, scene.textCenter, styles.titleCopy]}>
        You{"'"}re not currently in a relationship on Luvup.
      </Text>
      <Text style={[scene.bodyCopy, scene.textCenter, styles.promptCopy]}>
        Choose an option below to get things started.
      </Text>
    </View>
    <View style={styles.bottomContent}>
      <Button
        onPress={handleLoverRequestPress}
        containerViewStyle={[buttons.infoContainer, styles.button]}
        buttonStyle={buttons.infoButton}
        textStyle={buttons.infoText}
        title="Search for Your Lover"
      />
    </View>
  </View>
);

DashboardNoRelationship.propTypes = {};

export default DashboardNoRelationship;
