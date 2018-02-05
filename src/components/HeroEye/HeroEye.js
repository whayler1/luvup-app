import React from 'react';
import ReactArt, {
    Group,
    Shape,
    Surface,
    Transform,
} from 'ReactNativeART';
import {
  ART,
} from 'react-native';

class Circle extends React.Component {
  render() {
    const {radius, ...rest} = this.props

    const circle = ART.Path()
      .move(radius, 0)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)

    return <ART.Shape {...rest} d={circle} />
  }
}

export default () => (
  <Surface
    width={143}
    height={61}
  >
    <Group>
      <Shape
        stroke="white"
        strokeWidth={4}
        d={"M23.5,45.5 C39.0677083,27.8020833 57.5677083,18.953125 79,18.953125 C100.432292,18.953125 118.932292,27.8020833 134.5,45.5"}
      />
      <Shape
        stroke="white"
        strokeWidth={4}
        d={"M18.5,38.5 L0.5,26.5"}
      />
      <Shape
        stroke="white"
        strokeWidth={4}
        d={"M32.5,25.5 L13,4"}
      />
      <Shape
        stroke="white"
        strokeWidth={4}
        d={"M46.5,17.5 L37,0"}
      />
    </Group>
    <Group x={70} y={30}>
      <Circle radius={10} fill={'white'} />
    </Group>
  </Surface>
);
