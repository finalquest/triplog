import React from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Label from '../Label';
import strings from '../../utils/strings';
import RoughView from '../RoughView';

interface NoteProps {
  onClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'GochiHand-Regular',
    fontSize: 30,
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'left',
    paddingHorizontal: 10,
    marginVertical: 5,
    textAlignVertical: 'center',
  },
  label: {
    marginBottom: 0,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  body: {
    fontFamily: 'GochiHand-Regular',
    fontSize: 20,
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'left',
    paddingHorizontal: 10,
    marginVertical: 5,
    textAlignVertical: 'center',
    height: '100%',
  },
});

const Note: React.FC<NoteProps> = ({ onClose }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Label style={styles.closeButtonText}>X</Label>
          </TouchableOpacity>
        </View>

        <Label style={styles.label}>{strings.note_add_title}</Label>
        <RoughView containerViewStyle={{ padding: 5 }} style={{ alignSelf: 'stretch' }}>
          <TextInput style={styles.text} />
        </RoughView>
        <Label style={styles.label}>{strings.note_add_body}</Label>
        <RoughView containerViewStyle={{ padding: 5 }} style={{ alignSelf: 'stretch', flex: 1 }}>
          <TextInput multiline style={styles.body} />
        </RoughView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Note;
