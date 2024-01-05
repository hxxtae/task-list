import { StyleSheet, View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryModal({ show, onClose }) {

  const windowHeight = Dimensions.get('window').height;

  const onBtnClick = (e) => {
    onClose();
  }

  const onOverlayTouch = (e) => {
    onClose();
  }

  return (
    <View>
      <Modal style={{position: 'relative'}} visible={show} animationType='slide' transparent={true} onRequestClose={() => {
        onClose();
      }}>
        <View style={styles.overlay} onTouchEnd={onOverlayTouch}></View>
        <View style={styles.modalView(windowHeight)}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onBtnClick}>
            <Ionicons name="close-circle-sharp" size={45} color="#000" />
            </Pressable>
            <ScrollView style={styles.modalScroll} >
              <View style={styles.modalItem}>
                <Text style={styles.modalText}>Work</Text>
                <Text style={styles.modalText}>Work</Text>
                <Text style={styles.modalText}>Work</Text>
              </View>
            </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    marginBottom: -20,
    backgroundColor: '#000',
    opacity: .5,
  },
  modalView: (windowHeight) => ({
    flex: .7,
    // marginTop: windowHeight / 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
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
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalScroll: {
    
  },
  modalItem: {
    
    
  },
  modalText: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 600,
  },
})