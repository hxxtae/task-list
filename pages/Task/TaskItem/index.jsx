import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';

TaskItem.propTypes = {
  tasks: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  isSetting: PropTypes.bool.isRequired,
  onSetting: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
}

export default function TaskItem({
  tasks,
  categoryId,
  taskId,
  isSetting,
  onSetting,
  onUpdate,
  onDelete,
  isChecked = false
}) {
  const theme = useTheme();

  const onTaskSetting = (taskId) => {
    return (
      <View style={styles.itemSetting(theme)}>
        <TouchableOpacity style={styles.itemSettingButton} onPress={() => onUpdate(taskId)}>
          <Text style={[styles.text(theme), styles.itemSettingText]}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemSettingButton} onPress={() => onDelete(categoryId, taskId)}>
          <Text style={[styles.text(theme), styles.itemSettingText, styles.danger(theme)]}>DELETE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.item(theme)}>
      <Text style={[styles.itemText, styles.text(theme, isChecked)]}>{tasks[taskId].name}</Text>
      <Pressable onPress={() => onSetting(taskId)}>
        <Feather name="more-vertical" size={24} color="black" />
      </Pressable>
      {isSetting && onTaskSetting(taskId)}
    </View>
  )
}

const styles = StyleSheet.create({
  item: (theme) => ({
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 30,
    borderRadius: 7,
    backgroundColor: `${theme.colors.card}`,
  }),
  text: (theme, isChecked) => ({
    color: `${isChecked ? theme.colors.secondary : theme.colors.text}`,
    textDecorationLine: `${isChecked ? 'line-through' : 'none'}`,
  }),
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemSetting: (theme) => ({
    position: 'absolute',
    flex: 1,
    gap: 15,
    right: 45,
    borderRadius: 7,
    backgroundColor: `${theme.colors.background}`,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }),
  itemSettingButton: {
    flex: 1,
  },
  itemSettingText: {
    fontWeight: '500',
  },
  danger: (theme) => ({
    color: `${theme.colors.danger}`
  })
});