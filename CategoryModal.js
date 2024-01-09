import { StyleSheet, View, Text, Pressable, Dimensions, ScrollView, FlatList, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Modal } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function CategoryModal({ show, category, onClose, handleCategory }) {
  const windowHeight = Dimensions.get('window').height;

  const onBtnClick = (e) => {
    onClose();
  }

  const onOverlayTouch = (e) => {
    onClose();
  }

  const onChooseCategory = (id) => {
    handleCategory(id);
    onClose();
  }

  const Item = ({ id, title }) => (
      <TouchableOpacity onPress={() => onChooseCategory(id)}>
        <Text style={styles.modalText}>{title}</Text>
      </TouchableOpacity>
  );

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
            <View style={styles.closeBtn}><Ionicons name="close-circle-sharp" size={45} color="#000" /></View>
          </Pressable>
          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false} >
            <View style={styles.modalItemList}>
              {Object.keys(category).length ? Object.keys(category).map((id) => (
                <Item key={id} id={+id} title={category[id].title} />
              )) : <View style={styles.loading}><Feather name="loader" size={24} color="black" /></View>}
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
    padding: 10,
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

  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  closeBtn: {
    
  },
  modalScroll: {
    flex: .8,
		width: '100%',
  },
  modalItemList: {
    
  },
  modalText: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})