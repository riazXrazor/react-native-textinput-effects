import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

export default class Autorain extends BaseInput {
  static propTypes = {
    /*
     * this is applied as active border and label color
     */
    borderColor: PropTypes.string,
    labelHeight: PropTypes.number,
    inputPadding: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: '#7A7593',
    labelHeight: 24,
    inputPadding: 16,
    height: 48,
    animationDuration: 200,
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      labelHeight,
      inputPadding,
      inputStyle,
      labelStyle,
      placeholderColor,
      placeholderInactiveColor,
      outlineColor,
      outlineInactiveColor,
      inputColor,
      roundness
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;
    return (
      <View class={[containerStyle]}>
          <TouchableWithoutFeedback 
          onPress={this.focus}    
          >
          <Animated.View
            style={{
              padding:0,
              paddingLeft:16,
              width:'90%',
              height: labelHeight,
              transform: [
                {
                  translateY: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [labelHeight + inputPadding - 5, 12],
                  }),
                },
              ],
            }}
          >
            <View style={{
              backgroundColor: '#fff',
              flexDirection: 'row', 
              alignSelf: 'flex-start',
              paddingLeft:3,
              paddingRight:3
            }}>
              <Animated.Text style={[styles.label, labelStyle, placeholderColor ? {color : focusedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [placeholderInactiveColor, placeholderColor],
          })}: {}]}>
                {label}
              </Animated.Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View style={{
          borderWidth: 1,
          borderColor:outlineColor ? focusedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [outlineInactiveColor, outlineColor],
          }) : '#000',
          borderRadius: roundness ? roundness : 5,
          paddingLeft: 10,
          height:50,
          position: 'absolute',
          left:0,
          bottom:0,
          width:'100%',
          zIndex:-1
        }}></Animated.View>
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
              paddingHorizontal: inputPadding,
            },
            inputColor ? {color:inputColor} : {}
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
        /> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    backgroundColor: 'transparent',
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#000',
    textAlign: 'left'
  },
  textInput: {
    padding: 0,
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
  },
});
