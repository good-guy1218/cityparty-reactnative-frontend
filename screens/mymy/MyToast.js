import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

class Toast extends Component {
   constructor() {
    super();

    this.animateTranslate = new Animated.Value(-10);

    this.animateOpacity = new Animated.Value(0);

    this.state = { renderToast: false }

    this.isShownToast = false;

    this.message = '';
    
    this.title = '';
   }

   componentWillUnmount() {
    this.timerID && clearTimeout(this.timerID);
   }

   showToast( message = "Custom Toast...", title = "Success!" , duration = 3000) {
    if(this.isShownToast === false) {
        this.message = message;
        this.title = title;

      this.isShownToast = true;

      this.setState({ renderToast: true }, () => {
        Animated.parallel([
          Animated.timing(
            this.animateTranslate,
            { 
              toValue: 0,
              duration: 350
            }
          ),

          Animated.timing(
            this.animateOpacity,
            { 
              toValue: 1,
              duration: 350
            }
          )
        ]).start(this.hideToast(duration))
      });
    }
   }

   hideToast = (duration) => {
    this.timerID = setTimeout(() => {
      Animated.parallel([
      Animated.timing(
        this.animateTranslate,
        { 
          toValue: 10,
          duration: 350
        }
      ),

      Animated.timing(
        this.animateOpacity,
        { 
          toValue: 0,
          duration: 350
        }
      )
      ]).start(() => {
        this.setState({ renderToast: false });
        this.animateTranslate.setValue(-10);
        this.isShownToast = false;
        clearTimeout(this.timerID);
      })
    }, duration);      
   }

   render() {
    const { position, backgroundColor, textColor, orientation } = this.props;

    if(this.state.renderToast) {
      return(
        <Animated.View style = {[
          styles.animatedToastViewContainer,
          {
            bottom: (position === 'top') ? '80%' : '0%',
            transform: [orientation === "yAxis" ? {
              translateY: this.animateTranslate 
            } : {
              translateX: this.animateTranslate
            }],
            opacity: this.animateOpacity
          }]}
          pointerEvents='none'
        >
          <View
            style = {[
              styles.animatedToastView,
              { backgroundColor }
            ]}
          >
            <Text
              numberOfLines = { 1 }
              style = {[ styles.toastTitle, { color: textColor }]}>
                  {this.title}
            </Text>
            <Text
              numberOfLines = { 1 }
              style = {[ styles.toastText, { color: textColor }]}>
                { this.message }
            </Text>
          </View>
        </Animated.View>
      );
    }
    else {
      return null;
    }
  }
}

Toast.propTypes = {
  backgroundColor: PropTypes.string,
  position: PropTypes.oneOf([
    'top',
    'bottom'
  ]),
  textColor: PropTypes.string,
  orientation: PropTypes.string
};

Toast.defaultProps = {
  backgroundColor: '#666666',
  textColor: 'white',
  orientation: 'xAxis'
}

const styles = StyleSheet.create({
  animatedToastViewContainer: {
    width: '100%',
    zIndex: 9999,
    position: 'absolute'
  },

  animatedToastView: {
    paddingHorizontal: 18,
    paddingVertical: 17,
    // borderRadius: 5,
    justifyContent: 'center',
    width:'100%'
  },

  toastText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    fontFamily:'Montserrat_600SemiBold',
    lineHeight:14,
    marginTop:13,
    color:'white'
  },

  toastTitle: {
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily:'Montserrat_700Bold',
    lineHeight:20,
    color:'white'
  }
});

// module.exports = Toast;
export default Toast;