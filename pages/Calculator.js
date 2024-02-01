import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const renderButtons = () => {
    const buttons = [
      ['7', '8', '9', '/'],
      ['4', '5', '6', '*'],
      ['1', '2', '3', '-'],
      ['0', '.', '=', '+'],
      ['C'],
    ];

    return buttons.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((button) => (
          <TouchableOpacity
            key={button}
            style={styles.button}
            onPress={() => handlePress(button)}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.calculatorContainer}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{input}</Text>
      </View>
      <View style={styles.buttonsContainer}>{renderButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calculatorContainer: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#61dafb',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 30,
    color: '#fff',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#61dafb',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 40,
    color: '#fff',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#61dafb',
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
});

export default Calculator;