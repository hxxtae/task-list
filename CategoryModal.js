import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { Modal } from 'react-native';

export default function CategoryModal({ show, onClose }) {

  const windowHeight = Dimensions.get('window').height;

  return (
    <View>
      <Modal visible={show} animationType='slide' transparent={true} onRequestClose={() => {
        onClose();
      }}>
      <Pressable onPress={() => onClose()} style={styles.overlay}>
        <View style={styles.modalView(windowHeight)}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Pressable>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  modalView: (windowHeight) => ({
    flex: 1,
    marginTop: windowHeight / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})