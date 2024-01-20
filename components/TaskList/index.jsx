import { useTheme } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

TaskList.propTypes = {
  tasks: PropTypes.object,
}

export default function TaskList({ tasks }) {
  const theme = useTheme();

  const emptyList = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText(theme)}>Empty</Text>
      </View>
    )
  }

  return (
    <>
      {(tasks !== undefined) ? 
        <ScrollView style={styles.wrapper}>
          {Object.keys(tasks).map(taskKey => (
            <Pressable key={taskKey} style={styles.item(theme)}>
              <Text style={styles.itemText(theme)}>{ tasks[taskKey].name }</Text>
            </Pressable>
          ))}
        </ScrollView> :
        emptyList()
      }
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  item: (theme) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: `${theme.card}`,
  }),
  itemText: (theme) => ({
    fontSize: 16,
    fontWeight: '500',
    color: `${theme.text}`,
  }),
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: (theme) => ({
    fontSize: 16,
    fontWeight: '600',
    color: `${theme.secondary}`,
  })
});